"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import OTPInputComponent from "@/components/ui/otp-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface OtpVerificationFormProps {
  phoneNumber: string;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}

export function OtpVerificationForm({
  phoneNumber,
  isLoading,
  setIsLoading,
}: OtpVerificationFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      setIsLoading(true);

      // Emulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For testing purposes, check if OTP is 123456
      if (otp !== "123456") {
        throw new Error("Invalid OTP");
      }

      // Emulate success response
      const mockToken = "mock_jwt_token_" + Date.now();
      localStorage.setItem("token", mockToken);

      toast.success("Successfully logged in!");

      // Redirect back (you might want to store the return URL in a state or query param)
      router.back();
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
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
      <Button type="submit" className="w-full mt-6" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
}
