import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { User, Bot } from 'lucide-react';

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);  
  const API_KEY = import.meta.env.VITE_CHATBOT_API_KEY;

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    const newMessage = { sender: 'user', text: userInput.trim() };
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    setUserInput('');

    const loadingMsg = { sender: 'bot', text: '💬 HealthBuddy is typing...' };
    setChatHistory((prev) => [...prev, loadingMsg]);

    // Format the chat history as role-based conversation
    const conversationText = updatedHistory
      .map((msg) => `${msg.sender === 'user' ? 'User' : 'HealthBuddy'}: ${msg.text}`)
      .join('\n');

    const prompt = `
You are HealthBuddy, an AI assistant trained to give first aid advice. Provide clear, practical first aid instructions for common health situations like cuts, burns, choking, sprains, or fever. Avoid giving diagnosis or treatment suggestions. Always remind the user to seek professional medical help if the situation is serious.

Example Q: I have a minor burn. What should I do?
Example A: Cool the burn under running water for 10–20 minutes, avoid ice, cover it with a clean dressing, and seek medical help if it’s large or blistered.

NOTE: provode me the crisp, clear and presice dignostic for the first AID and also use the short bullet points and use bold text where needed

${conversationText}
HealthBuddy:
`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await res.json();
      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';

      setChatHistory((prev) => [...prev.slice(0, -1), { sender: 'bot', text: botReply }]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: '❌ Error: ' + error.message },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl flex flex-col h-[400px]">
      <div className="flex-grow mb-6 overflow-y-auto space-y-4 px-2">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end flex-row-reverse' : 'justify-start'
            }`}
          >
            <div className="mt-2 shrink-0">
              {msg.sender === 'user' ? (
                <User className="w-6 h-6 text-green-600" />
              ) : (
                <Bot className="w-6 h-6 text-gray-400" />
              )}
            </div>

            <div
              className={`p-2 min-w-[100px] rounded-3xl shadow-md max-w-[75%] text-base leading-relaxed whitespace-pre-wrap break-words ${
                msg.sender === 'user'
                  ? 'bg-green-200 text-green-900 rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-full px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="Ask your health question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={isLoading}
        />

        <button
          className={`bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-full px-6 py-3 font-semibold shadow-md transition cursor-pointer`}
          onClick={sendMessage}
          disabled={isLoading}
          aria-label="Send message"
        >
          {isLoading ? 'Waiting...' : 'Ask!'}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
