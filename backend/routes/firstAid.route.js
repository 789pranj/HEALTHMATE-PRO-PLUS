import express from 'express';
import { allFirstAid } from '../controllers/firstAid.controller.js';
// import { verifyToken } from '../middleware/verifyToken.js';
// import { checkAuth } from '../controllers/auth.controller';
const router = express.Router();


router.get('/all-first-aid', allFirstAid)


export default router;