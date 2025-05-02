import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

export type User = {
  id: string;
  fullName: string;
  phone: string;
};

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),

  checkAuth: async () => {
    console.log("🔍 Starting auth check...");
    set({ isLoading: true });
    try {
      console.log("📡 Making auth/me request...");
      const { data } = await axiosInstance.get("/auth/me", {
        withCredentials: true, // Ensure cookies are sent
      });
      console.log("📥 Auth check response:", data);

      if (data.success) {
        set({ user: data.data, isLoading: false, isAuthenticated: true });
        console.log("✅ Auth check successful, user set:", data.data);
      } else {
        console.log("❌ Auth check failed: unsuccessful response");
        set({ user: null, isLoading: false, isAuthenticated: false });
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        success: boolean;
        message: string;
        data: unknown;
      }>;
      console.error("❌ Auth check error:", {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        message: axiosError.message,
      });

      // Handle both 401 and 404 as auth errors that should trigger refresh
      if (
        axiosError.response?.status === 401 ||
        axiosError.response?.status === 404
      ) {
        console.log(
          "🔄 Auth check failed with",
          axiosError.response?.status,
          "- attempting refresh"
        );
        set({ isLoading: false });
        return;
      }

      set({ user: null, isLoading: false, isAuthenticated: false });
    }
  },
}));
