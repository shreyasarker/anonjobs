import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
import Api from "../../apis/Api";

export const fetchYearlySalaries = createAsyncThunk("tags/fetchYearlySalaries", async (data, thunkAPI) => {
    const url = config.endpoints.yearlySalaries.fetchYearlySalaries;
    return await Api(data?.ssr).get(url, data?.reqHeaders).then((response) => {
      return response.data.data;
    }).catch((error) => {
      return thunkAPI.rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    })
});