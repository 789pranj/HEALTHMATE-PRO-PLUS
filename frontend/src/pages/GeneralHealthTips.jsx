import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";
import axios from "axios";
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

// Map string icon names from backend to React components
const iconMap = {
  Apple: <Apple size={32} className="text-green-600" />,
  Droplet: <Droplet size={32} className="text-blue-500" />,
  Dumbbell: <Dumbbell size={32} className="text-red-500" />,
  BedDouble: <BedDouble size={32} className="text-purple-500" />,
  Brain: <Brain size={32} className="text-yellow-500" />,
  Sun: <Sun size={32} className="text-orange-500" />,
  Stethoscope: <Stethoscope size={32} className="text-blue-700" />,
  MoveHorizontal: <MoveHorizontal size={32} className="text-gray-500" />,
  Smile: <Smile size={32} className="text-pink-500" />,
  Eye: <Eye size={32} className="text-indigo-500" />,
};

const GeneralHealthTips = () => {
  const [healthTips, setHealthTips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/general-health-tips");
        setHealthTips(res.data);
      } catch (error) {
        console.error("Error fetching health tips:", error);
      }
    };
    fetchHealthTips();
  }, []);

  // Filter tips based on search
  const filteredHealthTips = healthTips.filter((item) =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tips.some((tip) => tip.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto p-6 mt-20 mb-10">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <h2 className="text-4xl font-bold text-green-700 text-center mb-10 mt-8 select-none">
          🌿 General Health Tips
        </h2>

        {filteredHealthTips.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No tips found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 sm:px-6">
            {filteredHealthTips.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md border border-gray-200
                          flex flex-col items-center text-center space-y-4 min-h-[320px]
                          transition duration-300 hover:bg-gradient-to-r hover:from-green-200 hover:to-green-100 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-3 bg-gray-100 rounded-full">
                  {iconMap[item.icon] || <Smile size={32} />}
                </div>
                <h3 className="text-2xl font-semibold text-green-700">
                  {item.category}
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-left max-h-40 overflow-auto pr-2">
                  {item.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default GeneralHealthTips;
