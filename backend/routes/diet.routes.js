import express, { Router } from "express";
import { AllDiet, generateDietPlan } from "../controllers/diet.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/all", verifyToken, AllDiet);
router.post("/generate-diet", verifyToken, generateDietPlan)

export default router;
