import { useState } from "react";
import { Ruler, Weight, Calculator, AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";
import HealthTips from "../components/HealthTips";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calculateBMI = () => {
    if (!weight || !height) {
      setError("Both fields are required to calculate BMI.");
      setBMI(null);
      setCategory("");
      return;
    }

    setError("");
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 24.9) setCategory("Normal");
    else if (bmiValue >= 25 && bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.4 }}
        className="p-6 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 max-w-md mx-auto mt-10"
      >
        <h3 className="text-3xl font-bold text-green-400 text-center flex items-center gap-2">
          <Calculator className="w-7 h-7 text-green-400" /> BMI Calculator
        </h3>

        <div className="flex flex-col gap-5 mt-5">
          <div className="relative">
            <Weight className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
            <input
              type="number"
              placeholder="Enter weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 pl-12 bg-gray-800 rounded-lg text-white outline-none border border-gray-700 focus:border-green-400"
            />
          </div>

          <div className="relative">
            <Ruler className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
            <input
              type="number"
              placeholder="Enter height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 pl-12 bg-gray-800 rounded-lg text-white outline-none border border-gray-700 focus:border-green-400"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-red-500 text-white p-2 rounded-lg text-sm font-semibold"
            >
              <AlertTriangle className="w-5 h-5" /> {error}
            </motion.div>
          )}

          <button
            onClick={calculateBMI}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold cursor-pointer"
          >
            Calculate BMI
          </button>

          <button
            onClick={() => navigate("/general-health-tips")}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            View Health Tips
          </button>

          {bmi && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.3 }}
              className="text-center text-white mt-3 p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <p className="text-xl font-semibold">
                Your BMI: <span className="font-bold text-green-400">{bmi}</span>
              </p>
              <p className="text-lg text-gray-300">
                Category: 
                <span
                  className={`font-bold ml-1 ${
                    category === "Underweight"
                      ? "text-blue-400"
                      : category === "Normal"
                      ? "text-green-400"
                      : category === "Overweight"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {category}
                </span>
              </p>
            </motion.div>
          )}

          {bmi && <HealthTips category={category} />}
        </div>
      </motion.div>
    </>
  );
};

export default BMICalculator;
