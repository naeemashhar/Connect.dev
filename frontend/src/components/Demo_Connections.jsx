import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections, removeConnections } from "../utils/connectionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/user/connections/${id}`, {
        withCredentials: true,
      });
      dispatch(removeConnections(id));
    } catch (error) {
      console.error("Failed to remove connection:", error);
    }
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>Loading connections...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#020013] via-cyan-500/5 to-[#24243e] px-6 py-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Your <span className="text-cyan-500">Connections</span>
        </h2>

        {connections.length === 0 ? (
          <div className="bg-white/5 p-6 rounded-xl text-white/60 text-center border border-white/10">
            You haven’t connected with anyone yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {connections.map((user) => (
              <div
                key={user._id}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl duration-300"
              >
                <img
                  src={user.photoURL}
                  alt={user.firstName}
                  className="object-cover w-24 h-24 rounded-full border-2 border-cyan-500 mb-4"
                />
                <h3 className="text-lg font-bold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-white/60 text-sm mb-2">{user.title}</p>
                <p className="text-sm text-white/70 italic mb-3">{user.about}</p>

                <div className="text-xs text-white/50 mb-2 flex justify-center gap-3">
                  <span>
                    <i className="ri-user-line text-cyan-400" /> {user.gender}
                  </span>
                  <span>
                    <i className="ri-calendar-line text-cyan-400" /> {user.age} yrs
                  </span>
                </div>

                {(user.city || user.country) && (
                  <p className="text-xs text-white/50 mb-3">
                    <i className="ri-map-pin-line text-cyan-400" /> {user.city}, {user.country}
                  </p>
                )}

                {user.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-3">
                    {user.skills.slice(0, 5).map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full font-mono"
                      >
                        &lt;{skill}&gt;
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-2 mt-2">
                  <button
                    onClick={() => handleViewProfile(user)}
                    className="btn btn-sm btn-outline border-white text-white hover:bg-white/10"
                  >
                    <i className="ri-user-search-line mr-1" />
                    View Profile
                  </button>

                  <button
                    onClick={() => toast.info("💬 Chat feature coming soon!")}
                    className="btn btn-sm btn-outline border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                  >
                    <i className="ri-chat-1-line mr-1" />
                    Message
                  </button>

                  <button
                    onClick={() => handleRemove(user._id)}
                    className="btn btn-sm btn-outline border-red-500 text-red-400 hover:bg-red-500/20"
                  >
                    <i className="ri-user-unfollow-line mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Full Profile */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#101018] border border-white/10 rounded-xl p-6 w-[90%] max-w-lg relative text-white">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-red-400 text-lg"
            >
              ✕
            </button>

            <div className="text-center">
              <img
                src={selectedUser.photoURL}
                alt={selectedUser.firstName}
                className="w-24 h-24 rounded-full border-2 border-cyan-500 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">
                {selectedUser.firstName} {selectedUser.lastName}
              </h3>
              <p className="text-white/60 mb-1">{selectedUser.title}</p>
              <p className="text-sm text-white/70 italic mb-3">{selectedUser.about}</p>

              <div className="text-xs text-white/50 mb-2 flex justify-center gap-3">
                <span>
                  <i className="ri-user-line text-cyan-400" /> {selectedUser.gender}
                </span>
                <span>
                  <i className="ri-calendar-line text-cyan-400" /> {selectedUser.age} yrs
                </span>
              </div>

              {(selectedUser.city || selectedUser.country) && (
                <p className="text-xs text-white/50 mb-3">
                  <i className="ri-map-pin-line text-cyan-400" /> {selectedUser.city}, {selectedUser.country}
                </p>
              )}

              {selectedUser.skills?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {selectedUser.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full font-mono"
                    >
                      &lt;{skill}&gt;
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Connections;
