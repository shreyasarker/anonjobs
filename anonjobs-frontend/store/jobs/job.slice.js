import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanyJobs, fetchJob, fetchJobs, fetchJobTags, storeJob, updateJob } from "./job.action";

const initialState = {
  status: "idle",
  jobs: {},
  jobTags: [],
  job: {},
  companyJobs: {}
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: {
    [fetchJobs.pending]: (state) => {
      state.status = "pending";
    },
    [fetchJobs.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.jobs = action.payload;
    },
    [fetchJobs.rejected]: (state) => {
      state.status = "rejected";
      state.jobs = {};
    },
    [storeJob.pending]: (state) => {
      state.status = "pending";
    },
    [storeJob.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [storeJob.rejected]: (state) => {
      state.status = "rejected";
    },
    [updateJob.pending]: (state) => {
      state.status = "pending";
    },
    [updateJob.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [updateJob.rejected]: (state) => {
      state.status = "rejected";
    },
    [fetchJobTags.pending]: (state) => {
      state.status = "pending";
    },
    [fetchJobTags.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.jobTags = action.payload;
    },
    [fetchJobTags.rejected]: (state) => {
      state.status = "rejected";
      state.jobTags = [];
    },
    [fetchJob.pending]: (state) => {
      state.status = "pending";
    },
    [fetchJob.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.job = action.payload;
    },
    [fetchJob.rejected]: (state) => {
      state.status = "rejected";
      state.job = {};
    },
    [fetchCompanyJobs.pending]: (state) => {
      state.status = "pending";
    },
    [fetchCompanyJobs.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.companyJobs = action.payload;
    },
    [fetchCompanyJobs.rejected]: (state) => {
      state.status = "rejected";
      state.companyJobs = {};
    },
  },
});

export default jobSlice.reducer;
