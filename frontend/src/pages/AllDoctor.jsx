import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import { BriefcaseMedical, Mail, User } from "lucide-react";

const AllDoctors = () => {
  const { doctors, getAllDoctors, isLoading, error } = useAuthStore();

  useEffect(() => {
    getAllDoctors();
  }, [getAllDoctors]);

  console.log("Doctors Data:", doctors); // ✅ Debugging: Check if data is coming

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Our Doctors
        </h2>

        {isLoading && (
          <p className="text-gray-300 text-center">Loading doctors...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex flex-wrap gap-5">
          {doctors?.length > 0 ? (
            doctors.map((doctor) => (
              <motion.div
                key={doctor._id || doctor.id} // ✅ Ensure unique key
                className="p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2 capitalize">
                  <BriefcaseMedical className="w-5 h-5 text-white" />
                  {doctor.specialization || "No Specialization"}
                </h3>

                <h3 className="text-xl font-semibold text-green-400 mb-2 flex items-center gap-2 capitalize">
                  <User className="w-5 h-5 text-green-500" />{" "}
                  {doctor.name || "N/A"}
                </h3>

                <p className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />{" "}
                  {doctor.email || "N/A"}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-300 text-center col-span-3">
              No doctors available.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AllDoctors;
