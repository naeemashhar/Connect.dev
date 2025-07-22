import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    users: null,
  },
  reducers: {
    addFeed: (state, action) => {
      state.users = action.payload; // <-- make sure API gives you an array
    },
    removeUserFromFeed: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
