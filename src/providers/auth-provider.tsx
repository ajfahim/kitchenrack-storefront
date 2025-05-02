"use client";

import { useAuthStore } from "@/store/auth-store";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const pathname = usePathname();
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    // Skip auth check for auth-related pages
    if (!pathname?.includes('/auth/') && !hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkAuth();
    }
  }, [checkAuth, pathname]);

  return <>{children}</>;
}
