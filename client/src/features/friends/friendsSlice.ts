import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
});

export default friendsSlice.reducer;