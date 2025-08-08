import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Markdown from 'react-markdown';
import {
    Target,
    User,
    Venus,
    Mars,
    Dumbbell,
    Clock,
} from "lucide-react";

const Diet = () => {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        weight: '',
        goal: '',
        gender: '',
        activity: '',
    });


    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [dietHistory, setDietHistory] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        try {
            const res = await axios.post(
                `${baseURL}/api/diet/generate-diet`,
                formData,
                {
                    withCredentials: true, // ✅ needed to send cookies
                }
            );

            setResponse(res.data);
        } catch (err) {
            console.error('Error generating diet plan:', err);
            setResponse({ error: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDietHistory = async () => {
            try {
                const res = await axios.get(`${baseURL}/api/diet/all`, {
                    withCredentials: true,
                });
                setDietHistory(res.data); // Assuming res.data is an array of diets
            } catch (err) {
                console.error('Error fetching diet history:', err);
            }
        };

        fetchDietHistory();
    }, []);


    return (
        <>
            <Navbar />
            <div className='p-5 mt-5'>
                {dietHistory.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">
                            Your Previous Diet Plans
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dietHistory.map((diet) => (
                                <div
                                    key={diet._id}
                                    className="p-5 bg-white bg-opacity-70 backdrop-blur-xl rounded-2xl shadow-xl border border-green-200 transition hover:shadow-2xl"
                                >
                                    <div className="flex flex-wrap gap-2 mb-4 text-sm text-green-900 font-medium">
                                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                                            <Target className="w-4 h-4 text-green-600" />
                                            {diet.goal}
                                        </div>
                                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                                            <User className="w-4 h-4 text-green-600" />
                                            {diet.age} yrs
                                        </div>
                                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                                            {diet.gender === "female" ? (
                                                <Venus className="w-4 h-4 text-pink-500" />
                                            ) : (
                                                <Mars className="w-4 h-4 text-blue-500" />
                                            )}
                                            {diet.gender}
                                        </div>
                                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                                            <Dumbbell className="w-4 h-4 text-green-600" />
                                            {diet.activity}
                                        </div>
                                    </div>

                                    <div className="text-green-950 text-sm whitespace-pre-line mb-4 h-60 overflow-y-scroll">
                                        <Markdown>
                                            {diet.plan}
                                        </Markdown>
                                    </div>

                                    <div className="flex items-center text-xs text-gray-500">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {new Date(diet.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}



                <div className="max-w-md mx-auto p-6 bg-green-100 shadow-xl rounded-2xl text-black border border-green-300 mt-20">
                    <h2 className="text-2xl font-bold mb-6 text-center text-green-900">Generate Diet Plan</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="number"
                            name="age"
                            placeholder="Enter your age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-green-300 rounded-md placeholder:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <input
                            type="text"
                            name="height"
                            placeholder="Enter your height (e.g., 5'7 or 170cm)"
                            value={formData.height}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-green-300 rounded-md placeholder:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <input
                            type="text"
                            name="weight"
                            placeholder="Enter your weight (kg or lbs)"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-green-300 rounded-md placeholder:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <input
                            type="text"
                            name="goal"
                            placeholder="Enter your fitness goal (e.g., Lose weight)"
                            value={formData.goal}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-green-300 rounded-md placeholder:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-green-300 rounded-md text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <select
                            name="activity"
                            value={formData.activity}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-green-300 rounded-md text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        >
                            <option value="" disabled>Select Activity Level</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Lightly Active</option>
                            <option value="moderate">Moderately Active</option>
                            <option value="active">Active</option>
                            <option value="very active">Very Active</option>
                        </select>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold p-3 rounded-md hover:from-green-600 hover:to-green-800 transition duration-300"
                        >
                            {loading ? 'Generating...' : 'Generate'}
                        </button>
                    </form>

                    {response && (
                        <div className="mt-6 bg-green-200 p-4 rounded-md text-green-900 border border-green-400">
                            <h3 className="text-lg font-semibold mb-2">AI Generated Diet Plan:</h3>
                            {response.error ? (
                                <p className="text-red-600">{response.error}</p>
                            ) : (
                                // <p className="whitespace-pre-line">{response.plan}</p>
                                <Markdown>
                                    {response.plan}
                                </Markdown>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Diet;
