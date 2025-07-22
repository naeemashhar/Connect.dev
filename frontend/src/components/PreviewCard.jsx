
const PreviewCard = ({ user }) => {
  if (!user) return null;

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

  const {
    firstName = "",
    lastName = "",
    photoURL = "",
    title = "",
    about = "",
    gender = "",
    age = "",
    city = "",
    country = "",
    skills = [],
  } = user;

  return (
   <div className="max-w-md w-full bg-white/40 dark:bg-black/30 backdrop-blur-xl px-6 py-13 rounded-3xl shadow-xl text-center border border-cyan-700 dark:border-cyan-500 transition-all duration-300 hover:scale-[1.01]">
  {/* Profile Image */}
  <div className="w-40 h-40 mx-auto mb-4 transition-all duration-300 ease-in-out group">
    <img
      src={photoURL || "/fallback.png"}
      alt={`${firstName} ${lastName}`}
      className="w-full h-full object-cover border-4 border-cyan-400 shadow-md
        transition-all duration-300 ease-in-out
        [clip-path:polygon(28%_0%,100%_0%,100%_78%,78%_100%,0%_100%,0%_28%)]
        group-hover:clip-path-none group-hover:rounded-full"
    />
  </div>

  {/* Name + Title */}
  <h2 className="text-2xl font-semibold tracking-tight text-[#021431] dark:text-white">
    {firstName} {lastName}
    <span className="text-sm text-cyan-700 dark:text-cyan-400 font-light ml-2">({title})</span>
  </h2>

  {/* Location + Gender + Age */}
  <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm text-gray-600 dark:text-white/60">
    <span className="flex items-center gap-1">
      <i className="ri-map-pin-line text-cyan-600 dark:text-cyan-400" /> {city}, {country}
    </span>
    <span className="flex items-center gap-1">
      <i className="ri-user-line text-cyan-600 dark:text-cyan-400" /> {gender}
    </span>
    <span className="flex items-center gap-1">
      <i className="ri-calendar-line text-cyan-600 dark:text-cyan-400" /> {age} yrs
    </span>
  </div>

  {/* About Section */}
  <p className="mt-4 text-sm leading-relaxed px-2 text-gray-700 dark:text-white/80">
    {about}
  </p>

  {/* Skills Tags */}
  {Array.isArray(skills) && skills.length > 0 && (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      {skills.map((skill, i) => {
        const matchedSkill = skillOptions.find((s) => s.name === skill);
        return (
          <span
            key={i}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-mono text-cyan-800 dark:text-cyan-300 border border-cyan-400/50 dark:border-cyan-500/40 rounded-full bg-cyan-100 dark:bg-cyan-500/10 shadow-md hover:bg-cyan-200 dark:hover:bg-cyan-500/20 transition"
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
</div>

  );
};

export default PreviewCard;
