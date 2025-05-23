import { AlertCircle, CheckCircle, Flame, Smile } from "lucide-react";

const HealthTips = ({ category }) => {
  const tips = {
    Underweight: {
      text: "Increase your calorie intake with healthy foods. Focus on protein and strength training.",
      icon: <Flame className="w-6 h-6 text-blue-400" />,
    },
    Normal: {
      text: "Maintain a balanced diet and regular exercise to stay healthy.",
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    },
    Overweight: {
      text: "Incorporate more physical activity and a balanced diet to manage weight effectively.",
      icon: <Smile className="w-6 h-6 text-yellow-400" />,
    },
    Obese: {
      text: "Consult a healthcare provider for a structured weight management plan, including exercise and dietary changes.",
      icon: <AlertCircle className="w-6 h-6 text-red-400" />,
    },
  };

  return (
    <div className="p-5 bg-gray-800 rounded-lg border border-gray-700 mt-5 text-white shadow-lg">
      <div className="flex items-center gap-3">
        {tips[category].icon}
        <h4 className="text-xl font-bold text-green-400">Health Tips</h4>
      </div>
      <p className="text-gray-300 mt-2">{tips[category].text}</p>
    </div>
  );
};

export default HealthTips;
