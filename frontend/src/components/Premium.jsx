import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import lightBackground from "/lg.png";
import darkBackground from "/bg-login.png";

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import PremiumSuccess from "./PremiumSuccess";

const Premium = () => {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(true);

  const [loading, setLoading] = useState(true);


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

  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/premium/verify`, {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error("Error verifying premium:", error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    verifyPremiumUser();
  }, []);

    if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500" />
      </div>
    );
  }


  const handelBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    //open razorpay dialog-box
    const { amount, keyId, currency, notes, orderId } = order.data;
    const options = {
      key: keyId,
      amount,
      currency,
      name: "Connect.Dev",
      description: "Made with ❤️ by a developer, for developers.",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options); //get Razorpay from script.js code in html(below title)
    rzp.open();
  };

  return isUserPremium ? (
    <PremiumSuccess />
  ) : (
    <section
      className="relative py-20 dark:text-white text-[#021431]"
      style={backgroundStyle}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/40 pointer-events-none z-0" />

      {/* Back Button - Absolute top-left */}
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer absolute top-6 left-6 z-20 px-4 py-2 text-md text-[#021431] dark:text-white rounded hover:bg-black/5 transition hover:text-cyan-500 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Upgrade Your <span className="text-cyan-500">Connect.dev</span>{" "}
            Experience
          </h2>
          <p className="text-[#4B5563] dark:text-white/70 text-lg">
            Choose the plan that fits your goals — whether you're here to
            explore or to lead.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
          {/* Silver Membership */}
          <div className="bg-white/30 dark:bg-cyan/5  dark:bg-transparent backdrop-blur-[6px] border border-white/40 dark:border-white/10 rounded-xl p-8 flex flex-col shadow-md hover:shadow-gray-400/30 dark:hover:shadow-gray-500/25 transition">
            <h3 className="text-2xl font-semibold text-[#021431] dark:text-gray-300 mb-2">
              🔘 Silver Membership
            </h3>
            <p className="text-[#4B5563] dark:text-white/70 mb-6">
              Ideal for growing developers looking to expand their network.
            </p>
            <div className="text-5xl font-bold mb-6 text-[#021431] dark:text-white">
              ₹199
              <span className="text-lg text-[#6B7280] dark:text-white/60">
                /mo
              </span>
            </div>

            <ul className="space-y-3 text-left text-[#4B5563] dark:text-white/70 mb-8">
              {[
                "Access to core Connect.dev features",
                "Community chat access",
                "Up to 10 profile connections",
                "Basic profile highlighting",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-cyan-500 dark:text-cyan-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handelBuyClick("silver")}
              className="btn w-full bg-[#021431] text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Choose Silver
            </button>
          </div>

          {/* Gold Membership */}
          <div className="relative bg-yellow-100/30 dark:bg-transparent backdrop-blur-[6px] border border-yellow-400/40 dark:border-yellow-600 rounded-xl p-8 flex flex-col shadow-lg hover:shadow-yellow-300/30 dark:hover:shadow-yellow-400/30 transition">
            <div className="absolute top-0 right-0 bg-cyan-500 text-white text-sm font-semibold px-4 py-1 rounded-bl-lg rounded-tr-lg">
              Best Value
            </div>
            <h3 className="text-2xl font-semibold text-yellow-600 dark:text-yellow-300 mb-2">
              🟡 Gold Membership
            </h3>
            <p className="text-[#4B5563] dark:text-white/70 mb-6">
              Perfect for developers ready to stand out and lead the community.
            </p>
            <div className="text-5xl font-bold mb-6 text-[#021431] dark:text-white">
              ₹799
              <span className="text-lg text-[#6B7280] dark:text-white/60">
                /mo
              </span>
            </div>

            <ul className="space-y-3 text-left text-[#4B5563] dark:text-white/80 mb-8">
              {[
                "All Silver features included",
                "Unlimited profile connections",
                "Priority matching algorithm",
                "Gold badge on your profile",
                "Exclusive access to early features",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handelBuyClick("gold")}
              className="btn w-full bg-yellow-400 text-[#021431] hover:bg-yellow-300 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500"
            >
              Go Gold
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Premium;
