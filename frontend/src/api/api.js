import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../services/tokenService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    console.log("ACCESS TOKEN:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization Header Added");
    } else {
      console.log("No token found");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = getRefreshToken();

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}token/refresh/`,
          {
            refresh,
          }
        );

        const access = response.data.access;

        setTokens(access, refresh);

        originalRequest.headers.Authorization = `Bearer ${access}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;