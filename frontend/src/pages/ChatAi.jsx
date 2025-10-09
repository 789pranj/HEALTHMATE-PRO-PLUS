import React, { useState, useEffect, useRef } from 'react';
import { Send, UserCircle, Bot, Smile } from 'lucide-react';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const ChatAi = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiMsg = { text: data.response, sender: 'ai' };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: 'Something went wrong.', sender: 'ai' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />

      {messages.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500 px-4">
          <Smile className="w-12 h-12 text-yellow-500 mb-4 animate-bounce" />
          <p className="text-lg md:text-xl">
            Start chatting with <span className="font-semibold text-gray-700">HealthBuddy</span>...
          </p>
        </div>

      )}

      {/* Message container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 mt-16 w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            {msg.sender === 'ai' && <Bot className="w-5 h-5 text-green-600 mt-1" />}
            <div
              className={`px-4 py-2 rounded-lg max-w-xl whitespace-pre-wrap ${msg.sender === 'user'
                ? 'bg-green-500 text-white blur-s'
                : 'bg-gray-600 text-white blur-s'
                }`}
            >
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {msg.text}
              </ReactMarkdown>
            </div>
            {msg.sender === 'user' && <UserCircle className="w-5 h-5 text-blue-600 mt-1" />}
          </div>
        ))}

        {/* Show "Thinking..." while AI is responding */}
        {loading && (
          <div className="flex items-start gap-2">
            <Bot className="w-5 h-5 text-green-600 mt-1" />
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-black animate-pulse">
              Thinking...
            </div>
          </div>
        )}

        <div ref={scrollRef}></div>
      </div>

      {/* Input box */}
      <div className="w-full px-4 py-3 bg-white shadow-md flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none w-full text-gray-800 placeholder-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 transition duration-200"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center w-12 h-12 md:w-14 md:h-12 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          onClick={handleSend}
        >
          <Send className="w-5 h-5 md:w-6 md:h-6" />
        </button>

      </div>
    </div>
  );
};

export default ChatAi;
