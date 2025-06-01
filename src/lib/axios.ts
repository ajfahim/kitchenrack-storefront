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

// Add response interceptor to handle errors
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

    // For now, just pass through all errors without authentication handling
    // Authentication logic will be implemented later for profile pages
    
    // Note for future implementation:
    // 1. Check if the error is an auth error (401/404)
    // 2. Check if the request is for a protected route (e.g., /profile/)
    // 3. Try to refresh the token if needed
    // 4. Redirect to login only for protected routes if refresh fails

    return Promise.reject(error);
  }
);
