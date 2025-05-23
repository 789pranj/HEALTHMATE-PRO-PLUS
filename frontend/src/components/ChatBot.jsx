import React, { useState } from 'react';
import { marked } from 'marked';

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = async () => {
        if (!userInput.trim()) {
            setResponse('⚠️ Please enter a message.');
            return;
        }

        setResponse('💬 HealthBuddy is typing...');
        try {
            const res = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD_MYDj-PTjo7-eme7lpqx0A1Qgehf3Y2U',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `You are HealthBuddy, an AI assistant trained to give first aid advice. Provide clear, practical first aid instructions for common health situations like cuts, burns, choking, sprains, or fever. Avoid giving diagnosis or treatment suggestions. Always remind the user to seek professional medical help if the situation is serious.

Example Q: I have a minor burn. What should I do?
Example A: Cool the burn under running water for 10–20 minutes, avoid ice, cover it with a clean dressing, and seek medical help if it’s large or blistered.

User: ${userInput}`
                                    }
                                ],
                            },
                        ],
                    }),
                }
            );

            const data = await res.json();
            const text =
                data.candidates?.[0]?.content?.parts?.[0]?.text ||
                'No response received.';
            setResponse('🤖 ' + text);
            setUserInput('');
        } catch (error) {
            setResponse('❌ Error: ' + error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-600">HealthBuddy</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter your health-related question"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
            </div>
            <div className="flex justify-center mb-4">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm shadow"
                    onClick={sendMessage}
                >
                    Ask!
                </button>
            </div>
            <div
                className={`mt-4 p-4 min-h-[50px] border rounded bg-green-50 text-gray-800 text-sm transition-all duration-500 ${response ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div
                    dangerouslySetInnerHTML={{ __html: marked.parse(response) }}
                />
            </div>
        </div>
    );
};

export default ChatBot;
