import express from "express";
const router = express.Router();
import {
  profile,
  appointment,
  healthRecord,
  medicineRemainder,
} from "../controllers/patient.controller.js";

router.get("/profile", profile);
router.get("/appointments", appointment);
router.get("/health-records", healthRecord);
router.get("/medicine-reminders", medicineRemainder);

export default router;
