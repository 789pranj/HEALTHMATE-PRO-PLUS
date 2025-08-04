import express from 'express';
const router = express.Router();
import { chatBot } from '../controllers/chatBot.controller.js';

router.post('/', chatBot);

export default router;