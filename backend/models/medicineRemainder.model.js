import mongoose from "mongoose";

const medicineReminderSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicineName: { type: String, required: true },
    dosage: { type: String, required: true },
    time: { type: String, required: true },
    repeat: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "daily",
    },
  },
  { timestamps: true }
);

export const MedicineReminder = mongoose.model(
  "MedicineReminder",
  medicineReminderSchema
);
