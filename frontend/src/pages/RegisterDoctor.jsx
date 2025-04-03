import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { Mail, ClipboardList, Stethoscope, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";

const RegisterDoctor = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [empty, setEmpty] = useState("");
  const { registerDoctor, error, isLoading } = useAuthStore();

  const handleDoctorRegister = async (e) => {
    e.preventDefault();
    if (!email || !licenseNumber || !specialization) {
      setEmpty("All Fields are required");
      return;
    }

    try {
      await registerDoctor(email, licenseNumber, specialization);
      navigate("/verify-doctor");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Container with Padding to Avoid Navbar Overlap */}
      <div className="flex justify-center items-center min-h-screen pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
              overflow-hidden p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
            Register as a Doctor
          </h2>

          <form onSubmit={handleDoctorRegister}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={ClipboardList}
              type="text"
              placeholder="License Number"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
            <Input
              icon={Stethoscope}
              type="text"
              placeholder="Specialization (e.g. Cardiologist)"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />

            {(empty || error) && <p className="text-red-500 font-semibold mt-2">{empty || error}</p>}

            <motion.button
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white 
                          font-bold rounded-lg shadow-lg hover:from-green-600
                          hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                           focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Register"
              )}
            </motion.button>
          </form>

          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center mt-4 rounded-b-2xl">
            <p className="text-sm text-gray-400">
              Already registered?{" "}
              <Link to={"/login"} className="text-green-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterDoctor;
