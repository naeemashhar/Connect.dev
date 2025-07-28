import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { ArrowLeft } from "lucide-react";

import lightBackground from "/l.png";
import darkBackground from "/bg-login.png";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handelLoginClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.message || "Something went wrong :(");
      console.error(error);
    }
  };

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
    // Add other background styles as needed
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-center bg-no-repeat bg-cover"
      style={backgroundStyle}
    >
      <div className="max-w-lg w-full rounded-lg shadow-lg p-8 space-y-6 bg-[#F2F7FE] dark:bg-[#020013]">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer fixed top-6 left-6 z-20 px-4 py-2 text-md text-[#021431] dark:text-white rounded hover:bg-black/5 dark:hover:bg-white/10 transition hover:text-cyan-500 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex justify-center items-center cursor-pointer">
          <span className="text-2xl font-mono text-cyan-500">
            &lt;&#9679;&gt;
          </span>
          <span className="ml-2 text-2xl font-semibold text-[#021431] dark:text-white">
            Connect.<span className="text-cyan-500">dev</span>
          </span>
        </div>

        <h2 className="my-10 text-center text-3xl font-bold text-[#021431] dark:text-white">
          <span className="text-cyan-500">Log in</span> to your account
        </h2>

        <form className="space-y-4 my-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium dark:text-gray-300 text-[#021431]"
            >
              Email address
            </label>
            <input
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              id="email"
              type="email"
              autoComplete="off"
              required
              className="mt-1 w-full px-4 py-2 bg-[#E3E9F4] dark:bg-base-200 rounded-md placeholder:text-[#6B7280] text-[#021431] dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium dark:text-gray-300 text-[#021431]"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm text-semibold text-[#0069FF] dark:text-cyan-500 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 bg-[#E3E9F4] dark:bg-base-200 rounded-md placeholder:text-[#6B7280] text-[#021431] dark:text-white pr-10"
                placeholder="••••••••"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="ri-eye-off-line text-lg" />
                ) : (
                  <i className="ri-eye-line text-lg" />
                )}
              </span>
            </div>
          </div>

          <p className="text-sm text-red-500">{error}</p>
          <button
            className="cursor-pointer w-full py-2.5 px-4 bg-gray-600 dark:bg-[#021431] text-white text-sm font-semibold rounded-lg shadow-sm hover:dark:bg-cyan-400 hover:bg-[#0069FF] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all"
            onClick={handelLoginClick}
          >
            Log in
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <span className="border-b w-1/5 border-[#021431] dark:border-gray-300"></span>
          <span className="text-md dark:text-gray-300 text-[#021431]">
            or continue with
          </span>
          <span className="border-b w-1/5 border-[#021431] dark:border-gray-300"></span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full px-4">
          {/* Google Button */}
          <button className="flex items-center justify-center w-full sm:w-[50%] h-10 px-4 py-2 rounded-md cursor-pointer border border-gray-400 bg-white text-black hover:dark:bg-cyan-400 hover:bg-[#E3E9F4] transition text-sm sm:text-base dark:border-gray-800 dark:bg-base-200 dark:text-white">
            <i className="ri-google-fill mr-2 text-lg"></i>
            Log in with Google
          </button>

          {/* GitHub Button */}
          <button className="flex items-center justify-center w-full sm:w-[50%] h-10 px-4 py-2 rounded-md cursor-pointer border border-[#B0B8C1] text-[#021431] hover:dark:bg-cyan-400 hover:bg-[#E3E9F4] transition text-sm sm:text-base dark:border-gray-800 dark:bg-base-200 dark:text-white">
            <i className="ri-github-fill mr-2 text-lg"></i>
            Log in with Github
          </button>
        </div>

        <p className="text-center text-md dark:text-gray-300 text-[#021431]">
          Are you new here?{" "}
          <Link
            to="/signup"
            className="dark:text-cyan-400 text-[#0069FF] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
