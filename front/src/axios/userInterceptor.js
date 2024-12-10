import axios from "axios";
import { Failed } from "../helpers/popup";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Failed(error.response ? error.response.data.message : error.message);
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get(`${BASE_URL}/refreshToken`, {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } else if (error?.response?.status === 403) {
      localStorage.clear();
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
