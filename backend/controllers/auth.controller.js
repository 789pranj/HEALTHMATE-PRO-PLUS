import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import bcryptjs from "bcryptjs";
import crypto from "node:crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExists);

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// doctor
export const registerDoctor = async (req, res) => {
  try {
    const { email, licenseNumber, specialization } = req.body;

    // Validate input
    if (!email || !licenseNumber || !specialization) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with this email not found. Please sign up first.",
      });
    }

    // Check if the doctor already exists using userId
    const existingDoctor = await Doctor.findOne({ userId: user._id });
    if (existingDoctor) {
      console.log(`Doctor already exists for userId: ${user._id}`);
      return res.status(400).json({
        success: false,
        message: "Doctor profile already exists for this user.",
      });
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // Expires in 15 minutes

    // Create a new doctor profile
    const newDoctor = new Doctor({
      userId: user._id,  // Assign the userId
      email,
      licenseNumber,
      specialization,
      isDoctorVerified: false,
      verificationCode,
      verificationCodeExpiresAt,
    });

    await newDoctor.save();

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      message: "Doctor registered successfully. Verification code sent.",
      isDoctorVerified: false,
    });
  } catch (error) {
    console.error("Error in registerDoctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyDoctor = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    // Validate input
    if (!verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Verification code is required",
      });
    }

    // Find doctor by verification code
    const doctor = await Doctor.findOne({
      verificationCode: verificationCode,
      verificationCodeExpiresAt: { $gt: Date.now() }, // Ensure it's not expired
    });

    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // Update doctor verification status
    doctor.isDoctorVerified = true;
    doctor.verificationCode = undefined;
    doctor.verificationCodeExpiresAt = undefined;
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor email verified successfully",
      isDoctorVerified: true,
      doctor: {
        ...doctor._doc,
        verificationCode: undefined, // Hide verificationCode from response
      },
      
    });
  } catch (error) {
    console.error("Error in verifyDoctor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const checkDoctorStatus = async (req, res) => {
  try {
    const { email } = req.params;
    const doctor = await Doctor.findOne({ email });

    if (doctor) {
      return res.json({ isDoctorVerified: doctor.isDoctorVerified });
    }

    res.json({ isDoctorVerified: false });
  } catch (error) {
    console.error("Error checking doctor status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isDoctorVerified: true })
      .populate("userId", "name email") 
      .select("specialization"); 

    const formattedDoctors = doctors.map((doc) => ({
      name: doc.userId.name, 
      email: doc.userId.email, 
      specialization: doc.specialization,
    }));

    res.json(formattedDoctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



