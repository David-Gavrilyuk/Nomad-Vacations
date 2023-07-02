import axios from "axios";
import { store } from "../Redux/Store";
import { logout } from "../Redux/UserReducer";

const api = axios.create({
  baseURL: "http://206.81.21.198:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data === "Invalid or expired token" && error.response.status === 401) {
      console.log(error.response);
      // Handle expired or invalid token
      store.dispatch(logout());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
