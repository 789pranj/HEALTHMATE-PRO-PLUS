import { GoogleGenerativeAI } from "@google/generative-ai";

// Controller Function
export const chatBot = async (req, res) => {
  const { prompt } = req.body;

  // Validate prompt
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Check API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not set in the environment." });
  }

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Build Prompt
  const fullPrompt = `
You are HealthBuddy, an AI assistant trained to give first aid advice. Be crisp and clear using short bullet points and **bold** keywords.

${prompt}
HealthBuddy:
`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = await response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Gemini API Error", details: error.message });
  }
};
