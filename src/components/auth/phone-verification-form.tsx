"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { TUserResponse } from "@/constants/types";
import { TApiResponse } from "@/types/api";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface PhoneVerificationFormProps {
  setPhoneNumber: (phone: string) => void;
  setIsOtpSent: (status: boolean) => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
  setUser: (user: TUserResponse | null) => void;
}

type TSignInData = {
  id: string;
  full_name: string;
  role: "admin" | "user";
  phone: string;
};

export function PhoneVerificationForm({
  setPhoneNumber,
  setIsOtpSent,
  isLoading,
  setIsLoading,
  setUser,
}: PhoneVerificationFormProps) {
  const [phone, setPhone] = useState("");

  const { mutateAsync: signIn, isPending } = useMutation({
    mutationFn: async ({ phone }: { phone: string }) => {
      const { data } = await axiosInstance.post<TApiResponse<TSignInData>>("/auth/login", {
        phone,
      });
      console.log("🚀 ~ mutationFn: ~ data:", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("🚀 ~ response:", data);
      if (data.success) {
        setUser({
          id: data.data?.id,
          full_name: data.data?.full_name,
          role: data.data?.role,
          phone: data.data?.phone,
        });
        setPhoneNumber(phone);
        setIsOtpSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("SignIn Error:", error);
      toast.error("Failed to send OTP. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      setIsLoading(true);
      await signIn({
        phone,
      });
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
      <Button
        type="submit"
        className="w-full mt-6"
        disabled={isPending || isLoading}
      >
        {isPending || isLoading ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );
}
