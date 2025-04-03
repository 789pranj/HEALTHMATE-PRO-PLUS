import express from "express";
import {
  login,
  signup,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  verifyDoctor,
  registerDoctor,
  checkDoctorStatus,
  getAllDoctors,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.get("/doctor-status/:email", checkDoctorStatus);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);


router.post("/register-doctor", registerDoctor);
router.post("/verify-doctor", verifyDoctor);
router.get('/get-all-doctors', getAllDoctors);



export default router;
