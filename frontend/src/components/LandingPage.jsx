import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Info, LogIn, SunMoon, Sun, Moon } from "lucide-react";
import { RiMenu3Fill } from "@remixicon/react";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = ({ theme, setTheme }) => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fadeIn = (element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    };

    fadeIn(heroRef.current);
    fadeIn(featuresRef.current);
    fadeIn(howItWorksRef.current);
    fadeIn(ctaRef.current);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      ref={scrollRef}
      data-scroll-section
      className="min-h-screen bg-white text-black dark:bg-[#020013] dark:text-white"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b border-black/10 bg-white/50 backdrop-blur dark:border-white/10 dark:bg-[#020013]/50">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xl sm:text-2xl font-mono text-cyan-500">
            &lt;&#9679;&gt;
          </span>
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-black dark:text-white whitespace-nowrap"
          >
            Connect.<span className="text-cyan-500">dev</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="shadow-lg cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border-0 border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-transparent backdrop-blur hover:scale-105 hover:shadow-md transition-all duration-300"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          <Link
            className="btn btn-ghost text-sm sm:text-lg text-black dark:hover:bg-black hover:bg-[#E3E9F4] border-0 dark:text-white"
            to="/about"
          >
            About
          </Link>

          <Link to="/login">
            <button className="text-sm sm:text-base cursor-pointer px-4 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-500 hover:text-black transition-all">
              Login to your account
            </button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="sm:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <RiMenu3Fill className="w-5 h-5 dark:text-white text-black" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content mt-3 z-[1] p-3 shadow-xl bg-gray-100 dark:bg-base-200 rounded-xl w-52 text-sm text-black dark:text-[#D9DFF2] space-y-2"
          >
            <li>
              <Link
                to="/about"
                className="border-b border-gray-300 dark:border-gray-600 flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-base-300 transition"
              >
                <Info className="w-4 h-4 text-cyan-400" />
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="border-b border-gray-300 dark:border-gray-600 flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-base-300 transition"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                Login
              </Link>
            </li>
            <li>
              <div className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-base-300 transition">
                <span className="flex items-center gap-2">
                  <SunMoon className="w-4 h-4 text-cyan-400" />
                  Theme
                </span>
                <input
                  type="checkbox"
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                  data-toggle-theme="dark,light"
                  data-act-class="ACTIVECLASS"
                  className="toggle toggle-xs"
                />
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        data-scroll-section
        className="mt-10 px-8 py-20 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6 leading-tight text-black dark:text-white">
          Connect with Developers{" "}
          <span className="text-cyan-400">Worldwide 🌍</span>
        </h2>
        <p className="text-lg text-black/70 dark:text-white/80">
          Whether you're a student, fresher, or pro — Connect.dev helps you grow
          your tech network, collaborate on projects, and build lasting
          professional relationships.
        </p>

        <div className="mt-10">
          <Link to="/signup">
            <button className="px-6 py-3 bg-cyan-500 text-black rounded-lg font-semibold shadow-lg hover:bg-cyan-400 transition">
              Join Connect.dev — It's Free 🚀
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        data-scroll-section
        className="px-8 py-16 bg-gray-100 dark:bg-[#0c0c1f]"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-8 text-cyan-400">
            What you get ?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="bg-white dark:bg-[#14142a] p-6 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">
                👥 Developer Matching
              </h4>
              <p className="text-black/80 dark:text-white/80">
                Swipe through curated developer profiles based on your skills
                and interests.
              </p>
            </div>
            <div className="bg-white dark:bg-[#14142a] p-6 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">
                📚 Learn & Collaborate
              </h4>
              <p className="text-black/80 dark:text-white/80">
                Find collaborators for open-source, startup ideas, or coding
                challenges.
              </p>
            </div>
            <div className="bg-white dark:bg-[#14142a] p-6 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">
                💬 Real-time Connections
              </h4>
              <p className="text-black/80 dark:text-white/80">
                Chat with matched developers and expand your professional
                circle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={howItWorksRef}
        className="px-8 py-20 text-center max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-cyan-400 mb-6">
          How it works ?
        </h3>
        <ol className="text-black dark:text-white/90 space-y-4 list-decimal list-inside text-left">
          <li>
            <strong>Sign up</strong> with basic details and choose your skills.
          </li>
          <li>
            <strong>Get matched</strong> with like-minded developers worldwide.
          </li>
          <li>
            <strong>Start collaborating</strong> on side-projects, freelancing,
            or just networking!
          </li>
        </ol>
      </section>

      {/* Final CTA */}
      <section
        ref={ctaRef}
        className="px-8 py-20 bg-gray-100 dark:bg-[#0e0e24] text-center"
      >
        <h3 className="text-3xl font-bold mb-4 text-black dark:text-white">
          Ready to build your developer network?
        </h3>
        <p className="text-black/70 dark:text-white/70 mb-8">
          Get started today and connect with devs who match your goals.
        </p>
        <Link to="/signup">
          <button className="px-8 py-4 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition">
            Get Started Free
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="dark:bg-[#0a0a1a]/80  backdrop-blur border-t border-white/10 dark:text-white text-black text-sm">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-mono text-cyan-400 mb-3">
              &lt;●&gt; Connect
              <span className="dark:text-white text-gray-900">.dev</span>
            </h2>
            <p className="dark:text-white/70 text-gray-900 text-sm leading-relaxed">
              Your space to find passionate developers, collaborate on ideas,
              and grow your coding network — globally.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-cyan-400 uppercase text-xs mb-3 tracking-widest">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/feed" className="hover:text-cyan-400 transition">
                  Developer Feed
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:text-cyan-400 transition">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:text-cyan-400 transition">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" className="hover:text-cyan-400 transition">
                  Premium Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-cyan-400 uppercase text-xs mb-3 tracking-widest">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">
                  About
                </Link>
              </li>
              <li>
                <a href="/" className="hover:text-cyan-400 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-cyan-400 transition">
                  Support
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-cyan-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Theme */}
          <div>
            <h3 className="text-cyan-400 uppercase text-xs mb-3 tracking-widest">
              Connect
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/naeemashhar"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400"
              >
                <i className="ri-github-fill text-xl" />
              </a>
              <a
                href="https://linkedin.com/in/naeemashhar"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400"
              >
                <i className="ri-linkedin-fill text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400"
              >
                <i className="ri-twitter-x-line text-xl" />
              </a>
            </div>
            <p className="text-sm dark:text-white/50 text-gray-900">
              Made with ❤️ by a developer, for developers.
            </p>
          </div>
        </div>

        <div className="border-t dark:border-white/10 border-gray-900 text-center py-4 dark:text-white/40 text-gray-900 text-xs">
          © {new Date().getFullYear()} Connect.dev — All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
