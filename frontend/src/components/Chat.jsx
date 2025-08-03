import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";
import { addConnections } from "../utils/connectionSlice";
import { ArrowLeft, Check, Send, UsersRound, Verified, X } from "lucide-react";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  const [isLightMode, setIsLightMode] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsLightMode(theme === "light");
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res.data.data));
  };

  const fetchChatMessages = async () => {
    if (!targetUserId) return;
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        isPremium: senderId?.isPremium,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const targetUser = connections.find((c) => c._id === targetUserId);

  return (
    <div
      className={`w-full h-fit flex justify-center ${
        isLightMode
          ? "bg-radial from-[#feffff] to-[#ccd2dc]"
          : "bg-radial from-cyan-500/25 to-[#020013]"
      } `}
    >
      <div className="flex flex-col md:flex-row h-[90vh] m-2 md:m-5 border border-base-300 rounded-lg shadow-xl overflow-hidden w-full max-w-full">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-1/3 lg:w-1/4  bg-[#F2F7FE] dark:bg-[#020013] p-4 border-b md:border-b-0 md:border-r border-base-300 overflow-y-auto transition-transform duration-300 ease-in-out z-10 md:translate-x-0 ${
            showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } fixed md:static top-0 left-0 h-full md:h-auto`}
        >
          <div className="flex justify-between items-center mb-4 mt-17 md:hidden">
            <h2 className="text-xl font-semibold">Connections</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="btn btn-ghost btn-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {connections?.length === 0 ? (
            <p className="text-sm opacity-70">No connections yet.</p>
          ) : (
            <ul className="space-y-3">
              {connections.map((conn) => (
                <li
                  key={conn._id}
                  onClick={() => setShowSidebar(false)}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-base-300 transition ${
                    conn._id === targetUserId ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    to={`/message/${conn._id}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={conn.photoURL}
                      className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500"
                      alt={conn.firstName}
                    />
                    <div className="flex flex-col text-sm">
                      <div className="font-semibold flex gap-1 items-center">
                        {conn.firstName} {conn.lastName}
                        {conn.isPremium && (
                          <Verified
                            className="w-4 h-4 text-blue-500"
                            strokeWidth={2.5}
                            title="Premium User"
                          />
                        )}
                      </div>
                      <span className="opacity-70 text-xs">{conn.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col justify-between min-h-0">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b dark:border-base-300 border-base-200 bg-[#F2F7FE] dark:bg-base-100 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <Link to={"/connections"}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              {targetUser ? (
                <div className="flex items-center gap-3">
                  <img
                    src={targetUser.photoURL}
                    className="w-8 h-8 rounded-full object-cover"
                    alt={targetUser.firstName}
                  />
                  <div className="font-semibold text-base-content">
                    <div className="md:flex  items-center gap-1  font-semibold">
                       {targetUser.firstName} {targetUser.lastName}
                      {targetUser.isPremium && (
                        <Verified
                          className="md:block hidden w-4 h-4 text-blue-500"
                          strokeWidth={2.5}
                          title="Premium User"
                        />
                      )}
                      </div>
                  </div>
                </div>
              ) : (
                <span className="font-semibold text-lg">Back</span>
              )}
            </div>
            <button
              onClick={() => setShowSidebar(true)}
              className="btn btn-outline btn-sm md:hidden"
            >
              <UsersRound className="w-4 h-4" />
              <span className="ml-1">Connections</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <p className="text-center text-sm text-base-content/70 mt-10">
                Start the conversation by sending a message ✨
              </p>
            ) : (
              messages.map((msg, idx) => {
                const isCurrentUser = user.firstName === msg.firstName;
                const avatarUrl = isCurrentUser
                  ? user.photoURL
                  : connections.find((c) => c.firstName === msg.firstName)
                      ?.photoURL || "/avatar-placeholder.png";

                return (
                  <div
                    key={idx}
                    className={`chat ${
                      isCurrentUser ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={avatarUrl} alt="avatar" />
                      </div>
                    </div>
                    <div className="chat-header text-xs text-base-content/70 flex items-center gap-1">
                      {msg.firstName} {msg.lastName}
                      {msg.isPremium && (
                        <Verified
                          className="w-4 h-4 text-blue-500"
                          strokeWidth={2.5}
                          title="Premium User"
                        />
                      )}
                    </div>

                    <div
                      className={`max-w-[100%] md:max-w-[80%] px-4 py-2 rounded-tl-md rounded-br-md ${
                        isCurrentUser
                          ? "bg-cyan-600 text-gray-100 ml-auto rounded-bl-md"
                          : "bg-base-200 dark:bg-base-300 text-base-content mr-auto rounded-tr-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-base-300 bg-[#F2F7FE] dark:bg-[#020013] backdrop-blur-md">
            <div className="flex justify-between items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="max-w-5xl flex-1 input input-bordered rounded-full bg-base-200 text-base-content focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="btn bg-[#d3d8de] dark:bg-[#0d1128] rounded-full px-4 py-2 hover:border-2 hover:border-cyan-500 hover:scale-105 transition"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
