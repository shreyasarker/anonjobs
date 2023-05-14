import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  jobFilters: {search: '', tag: '', isAnon: '', isRemote: ''}
};

const filterSlice = createSlice({
  name: "jobFilter",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.jobFilters = action.payload;
    },
    clearFilters(state){
      state.jobFilters = {search: '', tag: '', isAnon: '', isRemote: ''}
    }
  }
});

export const { setFilters, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;
