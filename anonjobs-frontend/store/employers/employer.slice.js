import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchEmployerJobs } from "./employer.action";

const initialState = {
  status: "idle",
  employerJobs: {},
};

const employerSlice = createSlice({
  name: "employers",
  initialState,
  extraReducers: {
    [HYDRATE]: (state, action) => {
      const nextState = {
        ...state, // use previous state
        ...action.payload.employer, // apply delta from hydration
      };
      return nextState;
    },
    [fetchEmployerJobs.pending]: (state) => {
      state.status = "pending";
    },
    [fetchEmployerJobs.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.employerJobs = action.payload;
    },
    [fetchEmployerJobs.rejected]: (state) => {
      state.status = "rejected";
      state.employerJobs = {};
    },
  },
});

export default employerSlice.reducer;
