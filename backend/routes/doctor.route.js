import express from "express";
const router = express.Router();
import {
  profile,
  appointment,
  patientRecord,
  prescription,
} from "../controllers/doctor.controller.js";

router.get("/profile", profile);
router.get("/appointments", appointment);
router.get("/patient-records", patientRecord);
router.get("/prescriptions", prescription);

export default router;
