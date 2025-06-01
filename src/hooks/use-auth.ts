import { axiosInstance } from "@/lib/axios";
import { useAuthStore, User } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthResponse {
  user: User | null;
}

export function useAuth() {
  const { user, setUser, setLoading } = useAuthStore();
  const router = useRouter();

  // Query to check auth status
  const query = useQuery<AuthResponse | null, Error>({
    queryKey: ["auth-check"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<AuthResponse>("/auth/me");
        return response.data;
      } catch (error) {
        console.log("🚀 ~ useAuth ~ error:", error);
        return null;
      }
    },
  });

  // Handle the success case separately using the query result
  useEffect(() => {
    if (query.data !== undefined && !query.isLoading) {
      setUser(query.data?.user || null);
      setLoading(false);
    }
  }, [query.data, query.isLoading, setUser, setLoading]);

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.log("🚀 ~ logout ~ error:", error);
    }
  };

  return {
    user,
    isLoading: query.isLoading,
    logout,
  };
}
