"use client";

import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Loading profile...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Account Information</h2>
            <p>
              <span className="font-medium">Name:</span> {user.fullName}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/profile/orders"
              className="bg-blue-50 hover:bg-blue-100 p-4 rounded-md flex flex-col items-center transition-colors"
            >
              <h3 className="font-medium text-lg">My Orders</h3>
              <p className="text-gray-600 text-sm text-center">
                View your order history
              </p>
            </Link>

            <Link
              href="/profile/settings"
              className="bg-blue-50 hover:bg-blue-100 p-4 rounded-md flex flex-col items-center transition-colors"
            >
              <h3 className="font-medium text-lg">Account Settings</h3>
              <p className="text-gray-600 text-sm text-center">
                Update your profile information
              </p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p>
            You are not logged in. Please{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              sign in
            </Link>{" "}
            to view your profile.
          </p>
        </div>
      )}
    </div>
  );
}
