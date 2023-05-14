import axios from 'axios';
import { getToken } from '../store/auth/auth.actions';

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
})

const Api = (ssr = false) => {
  if (!ssr) {
    const isTokenExists = getToken();
    AxiosInstance.defaults.headers.common['Authorization'] = isTokenExists ? `Bearer ${isTokenExists.token}` : '';
  }
  return AxiosInstance;
}
 
 
// Api.interceptors.request.use(function(config){
//     const state = store.getState();
//     const token = state.auth._auth_token;
//     config.headers.Authorization = token ? `Bearer ${token}` : '';
//     return config;
// });

// Api.interceptors.response.use(response => response, error => {
//     if (error.response.status === 401) {
//         AuthApi.logout();
//         return Promise.reject()
//     }

//     return Promise.reject(error)
// })

export default Api;
