export const allFirstAid =  (req, res) => {
    try {
      const firstAidTopics = [
        {
          title: "Burns (Minor & Major)",
          category: "Injury",
          symptoms: ["Redness", "Blistering", "Peeling skin", "Pain"],
          steps: [
            "Cool the burn under running water for 10-20 minutes",
            "Remove tight items like rings from the area",
            "Cover with a clean, non-stick dressing"
          ],
          dos: ["Cool with water", "Use loose dressing"],
          donts: ["Don't apply ice or butter", "Don't pop blisters"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746016263/skin-burns-scaled_oxvyop.jpg"
        },
        {
          title: "Bleeding (Cuts/Wounds)",
          category: "Injury",
          symptoms: ["Open wound", "Visible blood loss"],
          steps: [
            "Apply pressure using a clean cloth or bandage",
            "Elevate the injured part",
            "Clean the wound once bleeding stops"
          ],
          dos: ["Use gloves if available", "Apply antiseptic cream"],
          donts: ["Don't remove embedded objects", "Don't use unclean cloths"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746016376/360_F_236518995_s02Z45E5epxqnBL4RAIblH1KfbJ7l9VT_woxbus.jpg"
        },
        {
          title: "Nosebleeds",
          category: "Medical Emergency",
          symptoms: ["Blood from one or both nostrils"],
          steps: [
            "Sit upright and lean forward slightly",
            "Pinch the soft part of the nose for 10 minutes"
          ],
          dos: ["Breathe through mouth"],
          donts: ["Don't tilt head back", "Don't blow nose"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746016493/Nosebleeds-1350381785-770x533-1_jpg_udfgeq.jpg"
        },
        {
          title: "Choking",
          category: "Medical Emergency",
          symptoms: ["Difficulty breathing", "Clutching throat", "Silent cough"],
          steps: [
            "Ask if the person is choking",
            "Perform Heimlich maneuver (abdominal thrusts)"
          ],
          dos: ["Encourage coughing if breathing"],
          donts: ["Don't hit back while coughing"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746016862/17107_y8rjzp.jpg"
        },
        {
          title: "Fractures (Broken Bones)",
          category: "Injury",
          symptoms: ["Swelling", "Bruising", "Deformity", "Pain on movement"],
          steps: [
            "Immobilize the limb",
            "Apply a cold pack",
            "Seek medical help"
          ],
          dos: ["Support the injured area"],
          donts: ["Don't move the limb unnecessarily"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746016920/a00165f02_drgmqa.jpg"
        },
        {
          title: "Heart Attack",
          category: "Medical Emergency",
          symptoms: ["Chest pain", "Shortness of breath", "Sweating", "Nausea"],
          steps: [
            "Call emergency services immediately",
            "Keep the person calm",
            "Give aspirin if not allergic"
          ],
          dos: ["Monitor breathing and pulse"],
          donts: ["Don't leave them alone", "Don't give food or water"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746016964/64e8dd618da6952e60aadebd_Heart_20Attack_vu8jit.webp"
        },
        {
          title: "Heat Stroke",
          category: "Environment-Related",
          symptoms: ["High body temperature", "Confusion", "Dry skin", "Fainting"],
          steps: [
            "Move the person to a cooler place",
            "Remove excess clothing",
            "Cool the body with wet cloths"
          ],
          dos: ["Use fans, cool towels"],
          donts: ["Don't give caffeinated drinks"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746017074/Heat_Stroke_and_Heat_0dd86d0882_q3v4lf.jpg"
        },
        {
          title: "Snake Bite",
          category: "Animal Bites",
          symptoms: ["Puncture marks", "Swelling", "Nausea"],
          steps: [
            "Keep the person still",
            "Immobilize bitten limb",
            "Get medical help"
          ],
          dos: ["Note the color/size of snake if possible"],
          donts: ["Don't cut the wound or suck venom"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746017135/NonvenomousBite_zezzhw.jpg"
        },
        {
          title: "Seizures (Epileptic Fits)",
          category: "Neurological Emergency",
          symptoms: ["Sudden collapse", "Shaking", "Confusion"],
          steps: [
            "Protect from injury",
            "Place something soft under head",
            "Turn on side after seizure ends"
          ],
          dos: ["Time the seizure"],
          donts: ["Don't restrain movements", "Don't put anything in mouth"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746017175/seizurerecoveryposition_yzl0cj.jpg"
        },
        {
          title: "Drowning",
          category: "Water Emergency",
          symptoms: ["Not breathing", "Bluish skin", "Unconscious"],
          steps: [
            "Remove from water safely",
            "Start CPR if trained",
            "Call emergency services"
          ],
          dos: ["Check airway and breathing"],
          donts: ["Don't delay help"],
          imageUrl: "https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746017219/delayed-drowning-in-kids.png_azdk6v.png"
        }
      ];
  
      res.status(200).json({
        success: true,
        message: "First Aid topics fetched successfully",
        data: firstAidTopics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch First Aid topics",
        error: error.message,
      });
    }
  };
  