import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
import Api from "../../apis/Api";

export const fetchEmployerJobs = createAsyncThunk(
  "jobs/fetchEmployerJobs",
  async (data, thunkAPI) => {
    const url = config.endpoints.employers.fetchEmployerJobs;
    return Api(data?.ssr).get(`${url}?page=${data.page}`, data.reqHeaders)
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
