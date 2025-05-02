"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { TApiResponse } from "@/types/api";
import { TUserResponse } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface SignupFormProps {
  setPhoneNumber: (phone: string) => void;
  setIsOtpSent: (status: boolean) => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
  setUser: (user: TUserResponse | null) => void;
}

type TSignUpData = {
  id: string;
  full_name: string;
  role: "admin" | "user";
  phone: string;
};

export function SignupForm({
  setPhoneNumber,
  setIsOtpSent,
  isLoading,
  setIsLoading,
  setUser,
}: SignupFormProps) {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  const { mutateAsync: signUp, isPending } = useMutation({
    mutationFn: async ({
      phone,
      full_name,
    }: {
      phone: string;
      full_name: string;
    }) => {
      const { data } = await axiosInstance.post<TApiResponse<TSignUpData>>("/auth/signup", {
        phone,
        full_name,
      });
      console.log("🚀 ~ mutationFn: ~ data:", data);
      return data;
    },
    onSuccess: (response) => {
      if (response.success) {
        setUser(response.data);
        setPhoneNumber(phone);
        setIsOtpSent(true);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      console.error("SignUp Error:", error);
      toast.error("Failed to send OTP. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!fullName) {
      toast.error("Please enter your full name");
      return;
    }

    try {
      setIsLoading(true);
      await signUp({
        full_name: fullName,
        phone,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <PhoneInput
            value={phone}
            onChange={(value) => setPhone(value || "")}
            international
            defaultCountry="BD"
          />
        </div>
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
