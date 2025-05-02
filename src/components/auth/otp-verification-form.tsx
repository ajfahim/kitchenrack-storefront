"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import OTPInputComponent from "@/components/ui/otp-input";
import { OtpType } from "@/constants/enums";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { TUserResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface OtpVerificationFormProps {
  phoneNumber: string;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
  user: TUserResponse | null;
  type: OtpType;
}

export function OtpVerificationForm({
  phoneNumber,
  isLoading,
  setIsLoading,
  user,
  type,
}: OtpVerificationFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isPending, setIsPending] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      setIsLoading(true);
      setIsPending(true);
      const res = await axiosInstance.post(
        "/auth/verify-otp",
        {
          code: +otp,
          user,
          type,
        },
        {
          withCredentials: true,
        }
      );
      console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res.data.success) {
        toast.success(res.data.message);
        // Set user in auth store
        setUser(res.data.data.user);
        router.push("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="otp">Enter OTP</Label>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a code to {phoneNumber}
        </p>
        <OTPInputComponent value={otp} onChange={setOtp} />
      </div>
      <Button
        type="submit"
        className="w-full mt-6"
        disabled={isPending || isLoading}
      >
        {isPending || isLoading ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
}
