const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-[#f4ede3] dark:bg-[#020013] text-[#021431] dark:text-base-content px-6 py-4 z-50 shadow-inner">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-mono text-cyan-500">
            &lt;&#9679;&gt;
          </span>
          <span className="ml-2 text-xl font-semibold text-[#021431] dark:text-white">
            Connect.<span className="text-cyan-500">dev</span>
          </span>
        </div>

        {/* Center: Social Links */}
        <div className="flex justify-center gap-6 text-xl text-[#021431] dark:text-white">
          <a
            href="https://github.com/naeemashhar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 transition"
          >
            <i className="ri-github-fill"></i>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 transition"
          >
            <i className="ri-twitter-x-fill"></i>
          </a>
          <a
            href="https://linkedin.com/in/naeemashhar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 transition"
          >
            <i className="ri-linkedin-box-fill"></i>
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs md:text-sm opacity-70 text-center md:text-right text-[#4B5563] dark:text-white">
          © {new Date().getFullYear()} Connect.dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
