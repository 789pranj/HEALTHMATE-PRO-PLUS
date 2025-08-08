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
  HeartPulse,
  Menu,
  X,
  DiamondPercent,
} from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isDoctorVerified, setIsDoctorVerified] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchDoctorStatus = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(`${API_URL}/doctor-status/${user.email}`);
          setIsDoctorVerified(response.data.isDoctorVerified);
        } catch (error) {
          console.error("Error checking doctor status:", error);
        }
      }
    };

    fetchDoctorStatus();
  }, [user?.email]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
            Health Mate
          </h1>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <NavLinks isDoctorVerified={isDoctorVerified} logout={logout} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && isAuthenticated && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-gray-900 border-t border-gray-700 shadow-lg transition-all duration-300">
          <NavLinks
            isDoctorVerified={isDoctorVerified}
            logout={logout}
            isMobile
          />
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ isDoctorVerified, logout, isMobile }) => {
  const baseClass = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all";
  const blockOrInline = isMobile ? "block w-full mb-2" : "";

  return (
    <>
      <Link to="/" className={`${baseClass} ${blockOrInline} bg-gray-800 hover:bg-gray-700`}>
        <Home size={20} />
        <span>Home</span>
      </Link>

      <Link to="/Diet" className={`${baseClass} ${blockOrInline} bg-blue-800 hover:bg-blue-700`}>
        <DiamondPercent size={20} />
        <span>Diets</span>
      </Link>

      <Link to="/all-first-aid" className={`${baseClass} ${blockOrInline} bg-pink-800 hover:bg-pink-700`}>
        <HeartPulse size={20} />
        <span>First Aid</span>
      </Link>

      <Link to="/chat" className={`${baseClass} ${blockOrInline} bg-yellow-800 hover:bg-yellow-700`}>
        <MessagesSquare size={20} />
        <span>Chat</span>
      </Link>

      <Link to="/chat-ai" className={`${baseClass} ${blockOrInline} bg-teal-800 hover:bg-teal-700`}>
        <Brain size={20} />
        <span>Chat AI</span>
      </Link>

      <Link to="/bmi-calculator" className={`${baseClass} ${blockOrInline} bg-teal-800 hover:bg-teal-700`}>
        <Calculator size={20} />
        <span>BMI</span>
      </Link>

      {!isDoctorVerified && (
        <Link to="/register-doctor" className={`${baseClass} ${blockOrInline} bg-green-600 hover:bg-green-700`}>
          <Stethoscope size={20} />
          <span>Register</span>
        </Link>
      )}

      {!isDoctorVerified && (
        <Link to="/all-doctors" className={`${baseClass} ${blockOrInline} bg-emerald-600 hover:bg-emerald-700`}>
          <BriefcaseMedical size={20} />
          <span>Doctors</span>
        </Link>
      )}

      <button
        onClick={logout}
        className={`${baseClass} ${blockOrInline} bg-red-600 hover:bg-red-700 cursor-pointer`}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </>
  );
};

export default Navbar;
