import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <section
      className="min-h-screen bg-gradient-to-br 
from-[#dfe0e3] via-[#ffffff] to-[#c9ccd0]
dark:from-[#020013] dark:via-cyan-500/10 dark:to-[#020013] 
text-base-content px-4 py-16
"
    >
      {/* Back Button */}
      <button
          onClick={() => navigate(-1)}
          className="cursor-pointer fixed top-6 left-6 z-20 px-4 py-2 text-md text-[#021431] dark:text-white rounded hover:bg-black/5 dark:hover:bg-white/10 transition hover:text-cyan-500 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

      <div className="max-w-5xl mx-auto text-center mt-12 md:mt-24 px-2">
        {/* Logo + Heading */}
        <div className="flex flex-col sm:flex-row justify-center items-center mb-8 gap-2">
          <span className="text-4xl font-mono text-cyan-400 drop-shadow-glow">
            &lt;&#9679;&gt;
          </span>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-900 text-transparent bg-clip-text">
            About Connect.dev
          </h2>
        </div>

        {/* Tagline */}
        <p className="text-base md:text-lg text-gray-900 dark:text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
          Connect.dev is more than a platform — it's a professional playground
          for developers. Whether you're looking for collaborators, mentors, or
          friendships rooted in code and creativity, this is where your journey
          begins.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "🤝 Dev-to-Dev Friendship",
              desc: "Form meaningful connections with developers worldwide — beyond likes and follows.",
            },
            {
              title: "🌐 Built for Collaboration",
              desc: "Team up on open-source projects, hackathons, or startups. Tech is better together.",
            },
            {
              title: "💼 Career & Community",
              desc: "Showcase your skills, share knowledge, and grow your professional footprint organically.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-gray-900/30 dark:border-white/10 shadow-md dark:hover:shadow-xl hover:shadow-md hover:shadow-[#0069FF] dark:hover:shadow-cyan-500/10 transition"
            >
              <h3 className="text-lg md:text-xl font-semibold text-[#0069FF] dark:text-cyan-300 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-900 dark:text-white/70 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-20 bg-white/5 p-6 rounded-xl border border-white/10 max-w-3xl mx-auto text-left">
          <h3 className="text-xl font-bold dark:text-cyan-300 text-[#0069FF] mb-3">
            🔍 How It Works ?
          </h3>
          <ul className="list-disc list-inside text-gray-900 dark:text-white/70 text-sm space-y-2">
            <li>
              Create your profile and highlight your dev stack and passions.
            </li>
            <li>Swipe through profiles — connect, collaborate, or chat.</li>
            <li>Join a growing global dev community built on authenticity.</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <button
            className="btn btn-primary px-8 shadow-md hover:shadow-[#0069FF] dark:hover:shadow-cyan-500/30 transition"
          >
            Start Connecting →
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
