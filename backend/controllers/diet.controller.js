import { GoogleGenerativeAI } from "@google/generative-ai";
import Diet from "../models/diet.model.js";
import dietModel from "../models/diet.model.js";

export const AllDiet = async (req, res) => {
  try {
    const diets = await dietModel
      .find(
        { userId: req.userId }, 
        { plan: 1, goal: 1, createdAt: 1, activity: 1, age: 1, gender: 1, _id: 0 } // projection
      )
      .sort({ createdAt: -1 }); 

    res.status(200).json(diets);
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    res.status(500).json({ message: "Server error fetching diet plans." });
  }
};

export const generateDietPlan = async (req, res) => {
  const { age, weight, height, gender, activity, goal } = req.body;

  const userId = req.userId;

  if (!age || !weight || !height || !gender || !activity || !goal) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!userId) {
    return res.status(401).json({ error: "User ID missing from token." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are HealthBuddy, a certified AI dietician and fitness coach.

A new user is requesting a personalized diet and fitness plan. Their details are:

- Age: ${age}
- Weight: ${weight}
- Height: ${height}
- Gender: ${gender}
- Activity Level: ${activity}
- Goal: ${goal}

Based on these details, generate a **realistic, medically-informed daily plan** that includes:

🟢 **1. Meal Plan (with timings)**  
Break down the meals into:
- Breakfast
- Mid-Morning Snack
- Lunch
- Evening Snack
- Dinner

Each meal should include **specific food items** (like oats, eggs, pulses, brown rice, curd, vegetables, fruits, etc.), **portion sizes**, and timing (e.g., "8:00 AM - 2 boiled eggs + 1 bowl oatmeal with banana").

🟢 **2. Hydration Advice**  
Mention how much water to drink per day, and when (e.g., before meals, during exercise).

🟢 **3. Exercise Recommendations**  
Give a suitable daily workout routine (including type and duration), based on the user’s activity level and goal. Recommend a mix of cardio, strength, and rest days if appropriate.

🟢 **4. Notes & Tips**  
Include any extra advice or notes (e.g., reduce sugar intake, avoid processed food, recommended supplements if necessary).

📌 Make sure the plan is culturally flexible and practical, with affordable food items.

Format the response **clearly and in markdown or bullet points**, so it's easy to read in a UI.

Respond only with the plan. Do not ask questions or include disclaimers.

make sure the content should be less and crisp 
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const dietEntry = await Diet.create({
      userId,
      age,
      weight,
      height,
      gender,
      activity,
      goal,
      plan: text,
    });

    res.status(200).json({ plan: text, savedPlan: dietEntry });
  } catch (error) {
    console.error("Diet Plan Error:", error);
    res.status(500).json({ error: "Gemini API Error", details: error.message });
  }
};
