import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    files: [{ type: String }], // URLs to uploaded files
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);
