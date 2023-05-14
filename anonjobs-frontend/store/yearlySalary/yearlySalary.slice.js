import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchYearlySalaries } from "./yearlySalary.action";

const initialState = {
  status: "idle",
  yearlySalaries: [],
};

const yearlySalaryReducer = createSlice({
  name: "yearlySalaries",
  initialState,
  extraReducers: {
    [fetchYearlySalaries.pending]: (state) => {
      state.status = "pending";
    },
    [fetchYearlySalaries.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.yearlySalaries = action.payload;
    },
    [fetchYearlySalaries.rejected]: (state) => {
      state.status = "rejected";
      state.yearlySalaries = [];
    },
  },
});

export default yearlySalaryReducer.reducer;
