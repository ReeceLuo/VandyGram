import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.ts";
import friendsReducer from "../features/friends/friendsSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    friends: friendsReducer,
  },
});

export default store;
