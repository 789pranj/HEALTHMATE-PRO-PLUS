import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
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
    isVerified: {
      type: Boolean,
      default: false, 
    },
    verificationCode: {
      type: String,
    },
    verificationCodeExpiresAt: {
      type: Date,
    }
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
