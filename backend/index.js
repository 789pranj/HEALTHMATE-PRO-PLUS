import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import dietStore from "./routes/diet.routes.js";
import firstAid from "./routes/firstAid.route.js";
import patient from "./routes/patient.route.js";
import doctor from './routes/doctor.route.js';
import chatAi from "./routes/chatBot.routes.js";
import generalHealthTips from './routes/generalHealthTips.route.js';

dotenv.config({path: './backend/.env'});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/diet", dietStore);
app.use("/api/first-aid", firstAid);
app.use("/api/patient", patient);
app.use("/api/doctor", doctor);
app.use("/api/general-health-tips", generalHealthTips);
app.use("/api/chatbot", chatAi);

app.listen(PORT, () => {
  connectDB();
  console.log(`Running on port ${PORT}`);
});
