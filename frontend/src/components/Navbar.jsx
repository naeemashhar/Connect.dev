import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import {
  SunMoon,
  Users,
  Info,
  User,
  GitPullRequest,
  Star,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const loggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="navbar px-4 py-2 shadow-md bg-white text-gray-800 dark:bg-[#020013] dark:text-white transition-colors duration-300">
      {/* Logo */}
      <div className="flex-1 cursor-pointer">
        <span className="text-2xl font-mono text-cyan-600 dark:text-cyan-500">
          &lt;&#9679;&gt;
        </span>
        <Link
          to="/"
          className="ml-2 text-2xl font-semibold text-gray-800 dark:text-white"
        >
          Connect.<span className="text-cyan-600 dark:text-cyan-500">dev</span>
        </Link>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden lg:flex items-center gap-5">
        {/* Theme toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            aria-label="Toggle Theme"
          />

          {/* Moon Icon for Light Mode (off) */}
          <svg
            className="swap-off fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64 17.66A9 9 0 0012 21a9 9 0 000-18 9 9 0 00-6.36 15.66z" />
          </svg>

          {/* Sun Icon for Dark Mode (on) */}
          <svg
            className="swap-on fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l1.42 
        1.42a1 1 0 01-1.42 1.42L4.22 5.64a1 1 0 010-1.42zM2 13a1 1 0 011-1h2a1 1 
        0 010 2H3a1 1 0 01-1-1zm1.22 7.78a1 1 0 001.42 0l1.42-1.42a1 1 
        0 10-1.42-1.42L3.64 19.36a1 1 0 000 1.42zM13 22a1 1 0 01-1-1v-2a1 1 
        0 012 0v2a1 1 0 01-1 1zm7.78-1.22a1 1 0 000-1.42l-1.42-1.42a1 1 
        0 10-1.42 1.42l1.42 1.42a1 1 0 001.42 0zM22 13a1 1 0 
        00-1-1h-2a1 1 0 000 2h2a1 1 0 001-1zm-1.22-7.78a1 1 0 
        00-1.42 0L17.94 6.36a1 1 0 001.42 1.42l1.42-1.42a1 1 
        0 000-1.42z"
            />
          </svg>
        </label>

        <Link
          className="btn btn-ghost text-sm sm:text-lg text-black dark:hover:bg-black hover:bg-[#E3E9F4] border-0 dark:text-white"
          to="/connections"
        >
          Connections
        </Link>
        <Link
          className="btn btn-ghost text-sm sm:text-lg text-black dark:hover:bg-black hover:bg-[#E3E9F4] border-0 dark:text-white"
          to="/about"
        >
          About
        </Link>
      </div>

      {/* Avatar + Dropdown */}
      <div className="flex-none ml-2">
        {loggedInUser && (
          <div className="dropdown dropdown-end relative group">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2">
                <img alt="user" src={loggedInUser.photoURL} />
              </div>
            </div>

            {/* Hover Welcome */}
            <div className="absolute top-12 right-0 bg-gray-800 dark:bg-white text-white dark:text-gray-800 text-xs rounded px-4 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              Welcome, {loggedInUser.firstName}
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl rounded-xl w-52 text-sm text-gray-700 dark:text-[#D9DFF2] bg-white dark:bg-base-200 space-y-2"
            >
              {/* Theme toggle (mobile only) */}
              <li className="block lg:hidden">
                <div className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-base-300 transition">
                  <span className="flex items-center gap-2">
                    <SunMoon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    Theme
                  </span>
                  <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                    className="toggle toggle-xs"
                  />
                </div>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-base-300 transition"
                >
                  <User className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  Profile
                </Link>
              </li>

              <li className="block lg:hidden">
                <Link
                  to="/connections"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-base-300 transition"
                >
                  <Users className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  Connections
                </Link>
              </li>

              <li>
                <Link
                  to="/requests"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-base-300 transition"
                >
                  <GitPullRequest className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  Requests
                </Link>
              </li>

              <li>
                <Link
                  to="/premium"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-base-300 transition"
                >
                  <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                  Premium
                </Link>
              </li>

              <li className="block lg:hidden">
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-base-300 transition"
                >
                  <Info className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  About
                </Link>
              </li>

              <li>
                <a
                  onClick={handelLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-600 hover:text-white transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
