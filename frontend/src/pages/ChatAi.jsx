import React, { useState, useEffect, useRef } from 'react';
import { Send, UserCircle, Bot } from 'lucide-react';
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
          className="flex-1 px-4 py-2 border rounded-lg outline-none w-full"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatAi;
