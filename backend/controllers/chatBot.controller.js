// File: controllers/chatBot.controller.js

import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatBot = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const fullPrompt = `
You are HealthBuddy, an AI assistant trained to give first aid advice. Be crisp and clear using short bullet points and **bold** keywords.

${prompt}
HealthBuddy:
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = await response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Gemini API Error", details: error.message });
  }
};
