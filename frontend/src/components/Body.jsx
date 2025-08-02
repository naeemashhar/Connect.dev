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

// ✅ Login required, but full screen — no Navbar/Footer
const FULLSCREEN_PREFIXES = ["/connections", "/requests", "/profile", "/premium", "/message"]; // <-- include "/message"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const user = useSelector((store) => store.user?.user);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isFullscreenRoute = FULLSCREEN_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

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
  }, [pathname]);

  return (
    <div>
      {/* ✅ Only show Navbar/Footer if NOT public AND NOT fullscreen */}
      {!isPublicRoute && !isFullscreenRoute && <Navbar />}
      <Outlet />
      {!isPublicRoute && !isFullscreenRoute && <Footer />}
    </div>
  );
};

export default Body;
