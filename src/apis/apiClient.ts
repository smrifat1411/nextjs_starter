import axios from "axios";
import { getToken, setToken, removeToken } from "@/utils/tokenUtils";
import { handleApiError } from "./errorHandler";

const REFRESH_TOKEN_ENDPOINT = "/auth/refresh"; // Adjust based on your API

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Authorization Header
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    handleApiError(error); // Automatically handles request errors
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Errors and Token Refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (Unauthorized) for token refresh
    if (
      error.response?.message === "token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getToken();
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${REFRESH_TOKEN_ENDPOINT}`,
          { token: refreshToken }
        );

        if (refreshResponse.data?.status === "success") {
          const { accessToken, refreshToken: newRefreshToken } =
            refreshResponse.data;
          setToken(accessToken, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest); // Retry the original request
        } else {
          removeToken();
        }
      } catch (refreshError) {
        // removeToken();

        handleApiError(refreshError); // Automatically handles token refresh errors
        return Promise.reject(refreshError);
      }
    }

    // Handle all other errors automatically
    handleApiError(error);
    return Promise.reject(error);
  }
);

export default apiClient;
