import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

import lightBackground from "/l.png";
import darkBackground from "/bg-login.png";
import { Verified } from "lucide-react";

const UserCard = ({ user }) => {
  const [hoverAction, setHoverAction] = useState(null);
  const dispatch = useDispatch();

  const [isLightMode, setIsLightMode] = useState(true);

  // Listen to data-theme attribute changes on <html>
  useEffect(() => {
    const updateTheme = () => {
      const theme =
        document.documentElement.getAttribute("data-theme") || "light";
      setIsLightMode(theme === "light");
    };

    updateTheme(); // Initial call

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${isLightMode ? lightBackground : darkBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const handelSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    photoURL,
    title,
    about,
    gender,
    age,
    skills,
    city,
    country,
  } = user;

  const skillOptions = [
    { name: "ReactJs", logo: "/physics.png" },
    { name: "NodeJs", logo: "/nodejs.png" },
    { name: "MongoDB", logo: "/database-management.png" },
    { name: "HTML", logo: "/html.png" },
    { name: "CSS", logo: "/css-3.png" },
    { name: "JavaScript", logo: "/js.png" },
    { name: "Python", logo: "/python.png" },
    { name: "Express", logo: "/expressjs-icon.svg" },
    { name: "TypeScript", logo: "/typescript.png" },
    { name: "Java", logo: "/java.png" },
    { name: "C++", logo: "/c-.png" },
    { name: "C#", logo: "/c-sharp.png" },
    { name: "PHP", logo: "/php.png" },
  ];

  const cardStateClass =
    hoverAction === "interested"
      ? "rotate-0 sm:rotate-[3deg] border-green-700 sm:shadow-md sm:dark:shadow-green-500 sm:shadow-green-700 dark:border-green-500"
      : hoverAction === "ignore"
      ? "rotate-0 sm:-rotate-[3deg] border-red-700 sm:shadow-md sm:dark:shadow-red-500 sm:shadow-red-700 dark:border-red-500"
      : "rotate-0 border-cyan-500";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-6 pb-24 text-[#021431] dark:text-white"
      style={backgroundStyle}
    >
      <div
        className={`w-full max-w-md backdrop-blur-xl px-4 sm:px-6 py-8 sm:py-10 
      rounded-3xl shadow-xl text-center transition-all duration-500 ease-in-out border 
      bg-white/40 dark:bg-black/30 ${cardStateClass} mb-20`}
      >
        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 group">
          <img
            src={photoURL || "/fallback.png"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover border-4 border-cyan-400 shadow-md
            transition-all duration-300 ease-in-out
            [clip-path:polygon(28%_0%,100%_0%,100%_78%,78%_100%,0%_100%,0%_28%)]
            group-hover:clip-path-none group-hover:rounded-full"
          />
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-1">
            {user.firstName} {user.lastName}
            {user.isPremium && (
              <span title="Premium User">
                <Verified className="w-4 h-4 text-blue-500" strokeWidth={2.5} />
              </span>
            )}
          </h2>
          <span className="text-sm text-cyan-500 font-light">
            ({user.title || "No Title"})
          </span>
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-[#4B5563] dark:text-white/60">
          <span className="flex items-center gap-1">
            <i className="ri-map-pin-line text-cyan-500" /> {city}, {country}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-user-line text-cyan-500" /> {gender}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-calendar-line text-cyan-500" /> {age} yrs
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed px-2 text-[#334155] dark:text-white/80">
          {about || "No bio available."}
        </p>

        {Array.isArray(skills) && skills.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {skills.map((skill, i) => {
              const matchedSkill = skillOptions.find((s) => s.name === skill);
              return (
                <span
                  key={i}
                  className="flex items-center gap-2 px-3 py-1 text-xs font-mono text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 rounded-full bg-cyan-100 dark:bg-cyan-500/10 shadow-md hover:bg-cyan-200/50 dark:hover:bg-cyan-500/20 transition"
                >
                  {matchedSkill?.logo && (
                    <img
                      src={matchedSkill.logo}
                      alt={skill}
                      className="w-4 h-4 rounded-sm"
                    />
                  )}
                  &lt;{skill}&gt;
                </span>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="btn btn-sm btn-outline border-red-500 text-red-600 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/20 w-full sm:w-28"
            onMouseEnter={() => setHoverAction("ignore")}
            onMouseLeave={() => setHoverAction(null)}
            onClick={() => handelSendRequest("ignored", _id)}
          >
            <i className="ri-close-line mr-1" /> Ignore
          </button>
          <button
            className="btn btn-sm btn-outline border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500/10 dark:hover:bg-green-500/20 w-full sm:w-28"
            onMouseEnter={() => setHoverAction("interested")}
            onMouseLeave={() => setHoverAction(null)}
            onClick={() => handelSendRequest("interested", _id)}
          >
            <i className="ri-heart-line mr-1" /> Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
