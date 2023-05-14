import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchTags } from "./tag.actions";

const initialState = {
  status: "idle",
  tags: [],
};

const tagSlice = createSlice({
  name: "tags",
  initialState,
  extraReducers: {
    [fetchTags.pending]: (state) => {
      state.status = "pending";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.tags = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.status = "rejected";
      state.tags = [];
    },
  },
});

export default tagSlice.reducer;
