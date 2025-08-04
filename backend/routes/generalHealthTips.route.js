import express from 'express';
import { AllTips } from '../controllers/allHealthTips.controller.js';
const router = express.Router();

router.get('/', AllTips)

export default router;