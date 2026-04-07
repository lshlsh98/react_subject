import axios from "axios";
import useAuthStore from "./useAuthStore";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKSERVER,
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default instance;
