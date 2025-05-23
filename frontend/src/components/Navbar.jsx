import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  Home,
  LogOut,
  Stethoscope,
  MessagesSquare,
  Brain,
  BriefcaseMedical,
  Calculator,
  HeartPulse ,
} from "lucide-react";
import axios from "axios"; // Import Axios
const API_URL = "http://localhost:5000/api/auth";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isDoctorVerified, setIsDoctorVerified] = useState(false);

  useEffect(() => {
    const fetchDoctorStatus = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(
            `${API_URL}/doctor-status/${user.email}`
          );
          setIsDoctorVerified(response.data.isDoctorVerified);
        } catch (error) {
          console.error("Error checking doctor status:", error);
        }
      }
    };

    fetchDoctorStatus();
  }, [user?.email]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-lg text-white py-3 shadow-lg z-50">
      <div className="flex justify-between ml-5 mr-5">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
          Health Mate
        </h1>

        {/* Navigation Links */}
        {isAuthenticated && (
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>

            <Link
              to="/all-first-aid"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-pink-800 hover:bg-pink-700 transition-all"
            >
              <HeartPulse  size={20} />
              <span>First Aid</span>
            </Link>

            <Link
              to="/chat"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow-800 hover:bg-yellow-700 transition-all"
            >
              <MessagesSquare size={20} />
              <span>Chat</span>
            </Link>

            <Link
              to="/chat-ai"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-teal-800 hover:bg-teal-700 transition-all"
            >
              <Brain size={20} />
              <span>Chat AI</span>
            </Link>

            <Link
              to="/bmi-calculator"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-teal-800 hover:bg-teal-700 transition-all"
            >
              <Calculator size={20} />
              <span>BMI</span>
            </Link>

            {/* Show Register button only if the doctor is not verified */}
            {!isDoctorVerified && (
              <Link
                to="/register-doctor"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-all"
              >
                <Stethoscope size={20} />
                <span>Register</span>
              </Link>
            )}

            {!isDoctorVerified && (
              <Link
                to="/all-doctors"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-all"
              >
                <BriefcaseMedical size={20} />
                <span>Doctors</span>
              </Link>
            )}

            <button
              onClick={logout}
              className="flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
