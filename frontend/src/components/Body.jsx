import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

// ❌ No login required
const PUBLIC_ROUTES = ["/", "/login", "/signup", "/about"];

// ✅ Login required, but no Navbar/Footer
const FULLSCREEN_ROUTES = ["/connections", "/requests", "/profile", "/premium"];

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user?.user);

  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
  const isFullscreenRoute = FULLSCREEN_ROUTES.includes(location.pathname);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (!isPublicRoute && error?.response?.status === 401) {
        navigate("/login");
      }
      console.error("Auth check failed:", error);
    }
  };

  useEffect(() => {
    if (!user && !isPublicRoute) {
      fetchUser();
    }
  }, [location.pathname]);

  return (
    <div>
      {/* ✅ Show navbar only if not fullscreen and not public */}
      {!isPublicRoute && !isFullscreenRoute && <Navbar />}

      <Outlet />

      {/* ✅ Show footer only if not fullscreen and not public */}
      {!isPublicRoute && !isFullscreenRoute && <Footer />}
    </div>
  );
};

export default Body;
