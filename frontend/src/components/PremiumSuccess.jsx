// src/components/PremiumSuccess.jsx
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

import lightBackground from "/lg.png";
import darkBackground from "/bg-login.png";

const PremiumSuccess = () => {
  const navigate = useNavigate();

  const [isLightMode, setIsLightMode] = useState(true);
  
    useEffect(() => {
      const theme = localStorage.getItem("theme") || "light";
      setIsLightMode(theme === "light");
    }, []);
  
    const backgroundStyle = {
      backgroundImage: `url(${isLightMode ? lightBackground : darkBackground})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };
  

  return (
    <section
      className="relative min-h-screen py-20  text-center text-[#021431] dark:text-white"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-white/60 dark:bg-black/40 z-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="bg-white/30 dark:bg-transparent backdrop-blur-lg border border-white/30 dark:border-white/10 p-10 rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />

            <h2 className="text-3xl font-bold mb-2">Welcome to Premium!</h2>
            <p className="text-lg text-gray-600 dark:text-white/70 mb-6">
              You're now enjoying all the exclusive features of your premium plan.
            </p>

            <button
              onClick={() => navigate("/feed")}
              className="btn bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSuccess;
