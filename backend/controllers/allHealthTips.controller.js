export const AllTips = (req, res) => {
  try {
    const healthTips = [
      {
        category: "Nutrition",
        tips: [
          "Eat 5 servings of fruits & vegetables daily.",
          "Choose lean proteins like chicken, fish, tofu.",
          "Limit processed foods, sugary drinks, and excess salt.",
          "Incorporate whole grains such as oats, quinoa, and brown rice.",
          "Avoid overeating by listening to your body’s hunger cues.",
          "Consume healthy fats like avocado, nuts, and olive oil.",
        ],
        icon: "Apple"
      },
      {
        category: "Hydration",
        tips: [
          "Drink 2–3 liters of water daily.",
          "Limit sugary drinks and alcohol.",
          "Include water-rich foods like cucumbers & oranges.",
          "Start your day with a glass of water to boost metabolism.",
          "Carry a water bottle to remind yourself to hydrate throughout the day.",
          "Drink herbal teas for additional hydration and antioxidants.",
        ],
        icon: "Droplet"
      },
      {
        category: "Exercise",
        tips: [
          "30 min of physical activity most days.",
          "Mix cardio, strength, and flexibility exercises.",
          "Take stairs, walk, or cycle when possible.",
          "Try yoga or pilates to improve flexibility and balance.",
          "Engage in strength training exercises at least twice a week.",
          "Stretch before and after your workout to avoid injury.",
        ],
        icon: "Dumbbell"
      },
      {
        category: "Sleep",
        tips: [
          "Aim for 7–9 hours of sleep.",
          "Keep a regular sleep schedule.",
          "Avoid screens 1 hour before bed.",
          "Create a relaxing bedtime routine to help your body wind down.",
          "Make your sleep environment cool, dark, and quiet.",
          "Avoid caffeine and heavy meals close to bedtime.",
        ],
        icon: "BedDouble"
      },
      {
        category: "Mental Health",
        tips: [
          "Practice mindfulness or meditation.",
          "Stay connected with friends/family.",
          "Take breaks and enjoy hobbies.",
          "Journal your thoughts and feelings for better mental clarity.",
          "Seek professional help when necessary; therapy can be incredibly beneficial.",
          "Stay active in your community or volunteer for mental well-being.",
        ],
        icon: "Brain"
      },
      {
        category: "Sunlight & Vitamin D",
        tips: [
          "Get 15–20 min of sunlight daily.",
          "Use sunscreen if outdoors long.",
          "Consider supplements if needed.",
          "Expose your arms and legs to sunlight for better absorption of Vitamin D.",
          "Aim for sunlight in the morning to regulate your circadian rhythm.",
          "Wear protective clothing and hats when in direct sun for extended periods.",
        ],
        icon: "Sun"
      },
      {
        category: "Posture & Ergonomics",
        tips: [
          "Keep back straight, shoulders relaxed.",
          "Take breaks to stretch every hour.",
          "Set up an ergonomic workstation.",
          "Ensure your chair supports the natural curve of your spine.",
          "Keep your computer screen at eye level to avoid neck strain.",
          "Avoid slouching or hunching over your desk.",
        ],
        icon: "MoveHorizontal"
      },
      {
        category: "Regular Checkups",
        tips: [
          "Visit your doctor annually.",
          "Monitor blood pressure, cholesterol, sugar.",
          "Get vaccinations as recommended.",
          "Ask for regular blood tests to monitor vital health indicators.",
          "Schedule regular dental and eye exams.",
          "Keep track of your family’s medical history for proactive care.",
        ],
        icon: "Stethoscope"
      },
      {
        category: "Eye Care",
        tips: [
          "Follow 20 - 20 - 20 rule (every 20 min, look 20 ft away, 20 sec).",
          "Adjust screen brightness.",
          "Use lubricating drops if needed.",
          "Wear sunglasses with UV protection when outside.",
          "Schedule an eye exam every 1-2 years.",
          "Take care of your eyes by blinking often and keeping them hydrated.",
        ],
        icon: "Eye"
      },
      {
        category: "Stress Management",
        tips: [
          "Take deep breaths when stressed.",
          "Prioritize & delegate tasks.",
          "Practice gratitude daily.",
          "Engage in regular physical activity to reduce stress.",
          "Avoid overloading your schedule and learn to say 'no'.",
          "Try relaxation techniques such as progressive muscle relaxation.",
        ],
        icon: "Smile"
      }
    ];

    res.status(200).json(healthTips);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
