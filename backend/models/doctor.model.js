import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
      unique: true, // Ensure one user can register only once as a doctor
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    isDoctorVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    verificationCodeExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
