import React, { useState } from "react"; // Make sure useState is imported
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  Apple,
  Droplet,
  Dumbbell,
  BedDouble,
  Brain,
  Sun,
  Stethoscope,
  MoveHorizontal,
  Smile,
  Eye,
} from "lucide-react";
import SearchBar from "../components/SearchBar";

const healthTips = [
  {
    category: "Nutrition",
    tips: [
      "Eat 5 servings of fruits & vegetables daily.",
      "Choose lean proteins like chicken, fish, tofu.",
      "Limit processed foods, sugary drinks, and excess salt.",
      "Incorporate whole grains such as oats, quinoa, and brown rice.",
      "Avoid overeating by listening to your body’s hunger cues.",
      "Consume healthy fats like avocado, nuts, and olive oil.",
    ],
    icon: <Apple size={32} className="text-green-600" />,
  },
  {
    category: "Hydration",
    tips: [
      "Drink 2–3 liters of water daily.",
      "Limit sugary drinks and alcohol.",
      "Include water-rich foods like cucumbers & oranges.",
      "Start your day with a glass of water to boost metabolism.",
      "Carry a water bottle to remind yourself to hydrate throughout the day.",
      "Drink herbal teas for additional hydration and antioxidants.",
    ],
    icon: <Droplet size={32} className="text-blue-500" />,
  },
  {
    category: "Exercise",
    tips: [
      "30 min of physical activity most days.",
      "Mix cardio, strength, and flexibility exercises.",
      "Take stairs, walk, or cycle when possible.",
      "Try yoga or pilates to improve flexibility and balance.",
      "Engage in strength training exercises at least twice a week.",
      "Stretch before and after your workout to avoid injury.",
    ],
    icon: <Dumbbell size={32} className="text-red-500" />,
  },
  {
    category: "Sleep",
    tips: [
      "Aim for 7–9 hours of sleep.",
      "Keep a regular sleep schedule.",
      "Avoid screens 1 hour before bed.",
      "Create a relaxing bedtime routine to help your body wind down.",
      "Make your sleep environment cool, dark, and quiet.",
      "Avoid caffeine and heavy meals close to bedtime.",
    ],
    icon: <BedDouble size={32} className="text-purple-500" />,
  },
  {
    category: "Mental Health",
    tips: [
      "Practice mindfulness or meditation.",
      "Stay connected with friends/family.",
      "Take breaks and enjoy hobbies.",
      "Journal your thoughts and feelings for better mental clarity.",
      "Seek professional help when necessary; therapy can be incredibly beneficial.",
      "Stay active in your community or volunteer for mental well-being.",
    ],
    icon: <Brain size={32} className="text-yellow-500" />,
  },
  {
    category: "Sunlight & Vitamin D",
    tips: [
      "Get 15–20 min of sunlight daily.",
      "Use sunscreen if outdoors long.",
      "Consider supplements if needed.",
      "Expose your arms and legs to sunlight for better absorption of Vitamin D.",
      "Aim for sunlight in the morning to regulate your circadian rhythm.",
      "Wear protective clothing and hats when in direct sun for extended periods.",
    ],
    icon: <Sun size={32} className="text-orange-500" />,
  },
  {
    category: "Posture & Ergonomics",
    tips: [
      "Keep back straight, shoulders relaxed.",
      "Take breaks to stretch every hour.",
      "Set up an ergonomic workstation.",
      "Ensure your chair supports the natural curve of your spine.",
      "Keep your computer screen at eye level to avoid neck strain.",
      "Avoid slouching or hunching over your desk.",
    ],
    icon: <MoveHorizontal size={32} className="text-gray-500" />,
  },
  {
    category: "Regular Checkups",
    tips: [
      "Visit your doctor annually.",
      "Monitor blood pressure, cholesterol, sugar.",
      "Get vaccinations as recommended.",
      "Ask for regular blood tests to monitor vital health indicators.",
      "Schedule regular dental and eye exams.",
      "Keep track of your family’s medical history for proactive care.",
    ],
    icon: <Stethoscope size={32} className="text-blue-700" />,
  },
  {
    category: "Eye Care",
    tips: [
      "Follow 20 - 20 - 20 rule(every 20 min, look 20 ft away, 20 sec).",
      "Adjust screen brightness.",
      "Use lubricating drops if needed.",
      "Wear sunglasses with UV protection when outside.",
      "Schedule an eye exam every 1-2 years.",
      "Take care of your eyes by blinking often and keeping them hydrated.",
    ],
    icon: <Eye size={32} className="text-indigo-500" />,
  },
  {
    category: "Stress Management",
    tips: [
      "Take deep breaths when stressed.",
      "Prioritize & delegate tasks.",
      "Practice gratitude daily.",
      "Engage in regular physical activity to reduce stress.",
      "Avoid overloading your schedule and learn to say 'no'.",
      "Try relaxation techniques such as progressive muscle relaxation.",
    ],
    icon: <Smile size={32} className="text-pink-500" />,
  },
];

const GeneralHealthTips = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter healthTips based on the searchQuery
  const filteredHealthTips = healthTips.filter((item) =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tips.some((tip) =>
      tip.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-green-50 rounded-lg shadow-lg mt-20 mb-10">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <h2 className="text-4xl font-bold text-green-700 text-center mb-8">
          🌿 General Health Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {filteredHealthTips.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center space-y-4 min-h-[300px]
                         transition duration-300 hover:bg-gradient-to-r hover:from-green-200 hover:to-green-100 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-green-700">
                {item.category}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-left">
                {item.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GeneralHealthTips;
