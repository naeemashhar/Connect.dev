import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed?.users);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.users));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <div className="text-cyan-600 dark:text-cyan-300 flex justify-center text-2xl font-bold">Loading feed...</div>;

  if (feed.length <= 0) {
    return (
      <div className="text-[#D9DFF2 ] text-center mt-40 text-2xl font-bold">
        No more profiles for now. <span className="text-cyan-500">Refresh</span>{" "}
        to see if new developers have joined!
      </div>
    );
  }

  return (
    <div>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
