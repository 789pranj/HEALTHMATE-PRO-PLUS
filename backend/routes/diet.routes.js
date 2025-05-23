import express, { Router } from "express";
import { AllDiet } from "../controllers/diet.controller.js";

const router = express.Router();

router.get("/", AllDiet);

export default router;
