import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Verified } from "lucide-react";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState(null);
  const [isLightMode, setIsLightMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsLightMode(theme === "light");
  }, []);

  const reviewRequest = async (status, _id) => {
    try {
      setLoadingId(_id);
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
      toast.success(
        `Request ${status === "accepted" ? "accepted" : "rejected"}`
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) {
    return (
      <section className="min-h-screen flex items-center justify-center text-[#021431] dark:text-white">
        <p>Loading requests...</p>
      </section>
    );
  }

  return (
    <section
      className={`min-h-screen px-4 sm:px-6 py-10 relative text-[#021431] dark:text-white ${
        isLightMode
          ? "bg-gradient-to-b from-[#F2F7FE] via-white to-[#E3E9F4]"
          : "bg-gradient-to-b from-[#020013] via-cyan-800/5 to-[#020013]"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/feed")}
          className="cursor-pointer fixed top-4 left-4 z-50 px-4 py-2 text-sm md:text-md text-[#021431] dark:text-white rounded hover:bg-black/5 dark:hover:bg-white/10 transition hover:text-cyan-500 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Pending <span className="text-cyan-500">Requests</span>
        </h2>

        {/* No Requests Message */}
        {requests.length === 0 ? (
          <div className="bg-[#F2F7FE] dark:bg-white/5 border border-[#E3E9F4] dark:border-white/10 p-6 rounded-xl text-center text-[#4B5563] dark:text-white/60">
            🎉 You're all caught up! No pending requests.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {requests.map((request) => {
              const user = request.fromUserId;

              if (!user) return null;

              return (
                <div
                  key={request._id}
                  className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-[#E3E9F4] dark:border-white/10 p-5 rounded-xl shadow-md flex flex-col items-center text-center hover:scale-[1.02] hover:shadow-xl transition duration-300"
                >
                  {/* Avatar */}
                  <img
                    src={user.photoURL}
                    alt={user.firstName}
                    className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500 mb-4"
                  />

                  {/* Name + Title */}
                  <p className="text-lg font-bold flex items-center gap-1">
                    {user.firstName} {user.lastName}
                    {user.isPremium && (
                      <span title="Premium User">
                        <Verified
                          className="md:block hidden w-4 h-4 text-blue-500"
                          strokeWidth={2.5}
                          title="Premium User"
                        />
                      </span>
                    )}
                  </p>
                  <p className="text-[#4B5563] dark:text-white/60 text-sm mb-2">
                    {user.title || "No title"}
                  </p>

                  {/* About */}
                  <p className="text-sm text-[#374151] dark:text-white/70 italic mb-4 px-3 line-clamp-3">
                    {user.about || "No bio provided."}
                  </p>

                  {/* Info Pills */}
                  <div className="flex flex-wrap justify-center gap-3 text-xs text-[#6B7280] dark:text-white/60 mb-4">
                    {user.gender && (
                      <span className="flex items-center gap-1">
                        <i className="ri-user-line text-cyan-500 dark:text-cyan-400" />
                        {user.gender}
                      </span>
                    )}
                    {user.age && (
                      <span className="flex items-center gap-1">
                        <i className="ri-calendar-line text-cyan-500 dark:text-cyan-400" />
                        {user.age} yrs
                      </span>
                    )}
                    {(user.city || user.country) && (
                      <span className="flex items-center gap-1">
                        <i className="ri-map-pin-line text-cyan-500 dark:text-cyan-400" />
                        {user.city}, {user.country}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-3 mt-auto">
                    <button
                      className="btn btn-sm btn-outline border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500/10 transition"
                      onClick={() => reviewRequest("accepted", request._id)}
                      disabled={loadingId === request._id}
                    >
                      <i className="ri-user-add-line mr-1" />
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-outline border-red-500 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition"
                      onClick={() => reviewRequest("rejected", request._id)}
                      disabled={loadingId === request._id}
                    >
                      <i className="ri-close-line mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Requests;
