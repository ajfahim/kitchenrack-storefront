"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useState } from "react";
import toast from "react-hot-toast";

interface PhoneVerificationFormProps {
  setPhoneNumber: (phone: string) => void;
  setIsOtpSent: (status: boolean) => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}

export function PhoneVerificationForm({
  setPhoneNumber,
  setIsOtpSent,
  isLoading,
  setIsLoading,
}: PhoneVerificationFormProps) {
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      setIsLoading(true);

      // Emulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Emulate success scenario
      setPhoneNumber(phone);
      setIsOtpSent(true);
      toast.success("OTP sent to your phone number");

      // For testing, log the OTP (in real app, this would come from backend)
      console.log("Test OTP: 123456");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <PhoneInput
          value={phone}
          onChange={(value) => setPhone(value || "")}
          international
          defaultCountry="BD"
        />
      </div>
      <Button type="submit" className="w-full mt-6" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );
}
