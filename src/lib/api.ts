import axios from "axios";

export const API_URL = "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_URL,
});

// Attach token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Prevent console spam for 401 errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // no console.error flood
      return Promise.reject({ silent: true });
    }
    return Promise.reject(err);
  }
);
