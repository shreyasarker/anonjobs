import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
import Api from "../../apis/Api";

export const storeJob = createAsyncThunk(
  "jobs/store",
  async (data, thunkAPI) => {
    const url = config.endpoints.jobs.store;
    return await Api().post(url, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue({
          data: error.response.data,
          status: error.response.status,
        });
      });
  }
);

export const updateJob = createAsyncThunk(
  "jobs/update",
  async (data, thunkAPI) => {
    const url = `${config.endpoints.jobs.update}/${data.id}`;
    return await Api.put(url, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue({
          data: error.response.data,
          status: error.response.status,
        });
      });
  }
);

export const fetchJob = createAsyncThunk(
  "jobs/fetchJob",
  async (data, thunkAPI) => {
    const url = `${config.endpoints.jobs.fetchJob}/${data.id}`;
    return await Api(data?.ssr).get(url, data.reqHeaders)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue({
          data: error.response.data,
          status: error.response.status,
        });
      });
  }
);

export const fetchJobTags = createAsyncThunk(
  "jobs/fetchJobTags",
  async (data, thunkAPI) => {
    const url = config.endpoints.jobs.jobTags;
    return await Api(data?.ssr).get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue({
          data: error.response.data,
          status: error.response.status,
        });
      });
  }
);

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (data, thunkAPI) => {
    const url = config.endpoints.jobs.fetchJobs;
    return await Api(data?.ssr).post(`${url}?page=${data.page}`, {filters: data.filters}, data?.reqHeaders)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue({
          data: error.response.data,
          status: error.response.status,
        });
      });
  }
);

export const fetchCompanyJobs = createAsyncThunk(
  "jobs/fetchCompanyJobs",
  async (data, thunkAPI) => {
    const url = config.endpoints.jobs.fetchCompanyJobs;
    return await Api(data?.ssr).get(`${url}/${data.slug}?page=${data.page}`, data?.reqHeaders)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue({
          data: error.response.data,
          status: error.response.status,
        });
      });
  }
);

