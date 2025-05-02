// src/lib/axios.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface AuthErrorResponse {
  success: boolean;
  message: string;
  data: null;
}

interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: null;
}

// Use environment variable for base URL
export const baseURL = `${process.env.NEXT_PUBLIC_Backend_URL}/api/v1`;

console.log("🚀 ~ baseURL:", baseURL);

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Log all requests in development
if (process.env.NODE_ENV === "development") {
  axiosInstance.interceptors.request.use((request) => {
    console.log("🚀 Request:", {
      url: request.url,
      method: request.method,
      headers: request.headers,
      withCredentials: request.withCredentials,
    });
    return request;
  });
}

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<AuthErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    console.log("🚀 ~ Error interceptor:", {
      status: error.response?.status,
      url: originalRequest?.url,
      retry: originalRequest?._retry,
      error: error.message,
      response: error.response?.data,
    });

    const isRefreshEndpoint = originalRequest?.url?.includes("/auth/refresh-token");
    const isAuthError = error.response?.status === 401 || error.response?.status === 404;

    // Only retry once and only for auth errors that aren't from the refresh endpoint
    if (isAuthError && !originalRequest._retry && !isRefreshEndpoint) {
      console.log("🔄 Attempting token refresh...", {
        originalUrl: originalRequest.url,
        status: error.response?.status,
        isRefresh: isRefreshEndpoint,
        hasRetried: originalRequest._retry,
      });

      originalRequest._retry = true;
      try {
        console.log("📡 Making refresh token request with cookies present:", {
          cookies: document.cookie,
          config: {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        });

        const response = await axiosInstance.get<RefreshTokenResponse>("/auth/refresh-token", {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        console.log("📥 Refresh token response:", {
          status: response.status,
          data: response.data,
        });

        if (response.data.success) {
          console.log("✅ Token refreshed successfully, retrying original request");
          return axiosInstance({
            ...originalRequest,
            withCredentials: true, // Ensure cookies are sent with retry
          });
        } else {
          console.log("❌ Refresh token request failed:", response.data);
          throw new Error("Token refresh failed");
        }
      } catch (refreshError: unknown) {
        const axiosError = refreshError as AxiosError<AuthErrorResponse>;
        console.error("❌ Token refresh failed:", {
          message: axiosError.message,
          response: axiosError.response?.data,
          status: axiosError.response?.status,
        });

        // Only redirect to login for auth-related errors
        if (
          (axiosError.response?.status === 403 || axiosError.response?.status === 401) &&
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/auth/")
        ) {
          console.log("🔄 Redirecting to login page due to invalid token");
          window.location.href = "/auth/login";
        }
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);
