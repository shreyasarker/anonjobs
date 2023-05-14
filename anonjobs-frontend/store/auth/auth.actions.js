import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
import Api from "../../apis/Api";
import Cookie from 'js-cookie';
import Crypto from 'crypto-js';
import { v4 as uuid } from 'uuid';

const storageKey = process.env.NEXT_PUBLIC_TOKEN_KEY;
const cookieName = process.env.NEXT_PUBLIC_ENCRYPTED_COOKIE_NAME;
const encryptionToken =  Cookie.get(cookieName) || uuid();

if(!Cookie.get(cookieName)) {
  Cookie.set(cookieName, encryptionToken, { secure: true, expires: 180 });
}

export const getToken = (serverToken=null, cookieName=null) => {
  const store = serverToken || Cookie.get(storageKey);
  const encryptionCookie = cookieName || encryptionToken; 
  if (store) {
    try {
      const bytes = Crypto.AES.decrypt(store, encryptionCookie).toString(Crypto.enc.Utf8);
      const token = JSON.parse(bytes);
      return token;
    } catch (e) {
      Cookie.remove(storageKey);
    }
  }

  return null;
}

const setToken = (token) => {
  const store = Crypto.AES.encrypt(JSON.stringify({ token }), encryptionToken).toString();
  return Cookie.set(storageKey, store);
}

const destroyToken = () => {
  localStorage.removeItem(storageKey);
}

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    const url = config.endpoints.auth.register;
    return Api().post(url, data)
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

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const url = config.endpoints.auth.login;
  return Api().post(url, data)
    .then((response) => {
      setToken(response.data.token);
      return response.data;
    })
    .catch((error) => {
      return thunkAPI.rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    });
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const url = config.endpoints.auth.logout;
  return Api.post(url)
    .then((response) => {
      destroyToken();
      return response.data;
    })
    .catch((error) => {
      return thunkAPI.rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    });
});

export const fetchAuthUser = createAsyncThunk(
  "jobs/fetchAuthUser",
  async (_, thunkAPI) => {
    const url = config.endpoints.auth.user;
    return Api().get(url)
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
