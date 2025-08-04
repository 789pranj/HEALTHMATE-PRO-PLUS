import React, { useState, useEffect, useRef } from 'react';
import { useFirstAidStore } from '../store/firstAidStore.js';
import Navbar from '../components/Navbar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import {
  Bandage, AlertTriangle, Airplay, User, Thermometer, Droplet, Zap, FolderSearch,
  MessageCircle, Phone
} from 'lucide-react';
import ChatBot from '../components/ChatBot.jsx';

const FirstAid = () => {
  const { firstAidData, isLoading, error, fetchFirstAid } = useFirstAidStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const chatbotRef = useRef(null);

  useEffect(() => {
    fetchFirstAid();
  }, [fetchFirstAid]);

  // Handle click outside chatbot to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target) &&
        !event.target.closest('#chatbot-toggle-button')
      ) {
        setIsChatbotOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <AlertTriangle size={48} className="mr-2" />
        <span>Error: {error}</span>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Injury': return <Bandage size={20} className="text-red-500 mr-1" />;
      case 'Medical Emergency': return <MessageCircle size={20} className="text-yellow-500 mr-1" />;
      case 'Environment-Related': return <Thermometer size={20} className="text-blue-500 mr-1" />;
      case 'Animal Bites': return <User size={20} className="text-green-500 mr-1" />;
      case 'Neurological Emergency': return <Zap size={20} className="text-purple-500 mr-1" />;
      case 'Water Emergency': return <Droplet size={20} className="text-teal-500 mr-1" />;
      default: return <Airplay size={20} className="text-gray-500 mr-1" />;
    }
  };

  const filteredData = firstAidData?.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FolderSearch className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">First Aid Guide</h1>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search for first aid topics..." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg hover:shadow-xl transition transform rounded-xl overflow-hidden p-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-44 object-cover rounded-md"
                />
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                    <div className="flex items-center px-2 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition">
                      {getCategoryIcon(item.category)}
                      <span className="text-gray-700">{item.category}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-gray-700 font-medium">Symptoms</p>
                    <ul className="list-disc pl-6 text-sm text-gray-600">
                      {item.symptoms.slice(0, 3).map((symptom, i) => (
                        <li key={i}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3">
                    <p className="text-gray-700 font-medium">Steps</p>
                    <ol className="list-decimal pl-6 text-sm text-gray-600">
                      {item.steps.slice(0, 3).map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-3 flex justify-center">
                    <button className="bg-red-500 hover:bg-red-600 text-white w-full py-1.5 px-3 rounded-full flex items-center justify-center text-sm shadow-sm transition duration-200">
                      <Phone size={16} className="mr-1" />
                      Call 911
                    </button>
                  </div>


                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              No matching topics found.
            </div>
          )}
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <div
        id="chatbot-toggle-button"
        className={`fixed bottom-4 right-4 p-4 bg-blue-500 rounded-full cursor-pointer transition-all duration-300 ${isChatbotOpen ? 'scale-125' : 'scale-100'}`}
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
      >
        <MessageCircle size={30} className="text-white" />
      </div>

      {/* Chatbot Popup */}
      {isChatbotOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-20 right-4 w-full max-w-sm bg-white shadow-lg rounded-lg z-50 animate-slide-up"
        >
          <div className="flex justify-between items-center border-b px-4 py-2">
            <h3 className="font-semibold text-green-700 text-xl">HealthBuddy</h3>
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
          </div>
          <ChatBot />
        </div>
      )}

    </div>
  );
};

export default FirstAid;
