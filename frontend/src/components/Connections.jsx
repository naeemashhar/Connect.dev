import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { toast } from "react-toastify";
import { ArrowLeft, Verified } from "lucide-react"; // 👈 add Verified
import { Link, useNavigate } from "react-router-dom";

import lightBackground from "/l.png";
import darkBackground from "/bg-login.png";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections", error);
    }
  };

  const handleRemove = () => {
    toast.info("🧹 Remove feature is coming soon!");
  };

  useEffect(() => {
    fetchConnections();
  }, []);

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

  if (!connections) {
    return (
      <section className="min-h-screen flex items-center justify-center text-[#021431] dark:text-white">
        <p>Loading connections...</p>
      </section>
    );
  }

  return (
    <section
      className="min-h-screen px-6 py-8 relative text-[#021431] dark:text-white"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-white/60 dark:bg-black/40 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-6 lg:mb-0">
          <button
            onClick={() => navigate("/feed")}
            className="cursor-pointer fixed top-6 left-6 z-20 px-4 py-2 text-md text-[#021431] dark:text-white rounded hover:bg-black/5 dark:hover:bg-white/10 transition hover:text-cyan-500 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <h2 className="text-3xl font-semibold mb-6 mt-4 lg:mt-0">
          Your <span className="text-cyan-500">Connections</span>
        </h2>

        {connections.length === 0 ? (
          <div className="bg-[#F2F7FE] dark:bg-white/5 p-6 rounded-xl text-[#4B5563] dark:text-white/60 text-center border border-[#E3E9F4] dark:border-white/10">
            You haven’t connected with anyone yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {connections.map((user) => (
              <div
                key={user._id}
                className="backdrop-blur-md bg-white/40 dark:bg-white/5 border border-[#E3E9F4] dark:border-white/10 p-4 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl duration-300"
              >
                <img
                  src={user.photoURL}
                  alt={user.firstName}
                  className="object-cover w-24 h-24 rounded-full border-2 border-cyan-500 mb-4"
                />

                {/* 🟦 Verified name section */}
                <h3 className="text-lg font-bold text-[#021431] dark:text-white flex items-center justify-center gap-1">
                  {user.firstName} {user.lastName}
                  {user.isPremium && (
                    <Verified
                      className="w-4 h-4 text-blue-500"
                      strokeWidth={2.5}
                      title="Premium User"
                    />
                  )}
                </h3>

                <p className="text-[#4B5563] dark:text-white/60 text-sm mb-2">
                  {user.title}
                </p>

                <p className="text-sm text-[#374151] dark:text-white/70 italic mb-4 px-2">
                  {user.about}
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-xs text-[#6B7280] dark:text-white/60 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="ri-user-line text-cyan-500 dark:text-cyan-400" />
                    {user.gender}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line text-cyan-500 dark:text-cyan-400" />
                    {user.age} yrs
                  </span>
                  {(user.city || user.country) && (
                    <span className="flex items-center gap-1">
                      <i className="ri-map-pin-line text-cyan-500 dark:text-cyan-400" />
                      {user.city}, {user.country}
                    </span>
                  )}
                </div>

                {user.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {user.skills.slice(0, 5).map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 rounded-full font-mono"
                      >
                        &lt;{skill}&gt;
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-center gap-4 mt-2">
                  <Link to={"/message/" + user._id}>
                    <button
                      className="btn btn-sm btn-outline border-cyan-500 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500/10 transition"
                    >
                      <i className="ri-chat-1-line mr-1" />
                      Message
                    </button>
                  </Link>

                  <button
                    onClick={() => handleRemove(user._id)}
                    className="btn btn-sm btn-outline border-red-500 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition"
                  >
                    <i className="ri-user-unfollow-line mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Connections;
