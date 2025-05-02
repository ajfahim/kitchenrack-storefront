"use client";
import { OtpVerificationForm } from "@/components/auth/otp-verification-form";
import { SignupForm } from "@/components/auth/signup-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OtpType, TUserResponse } from "@/constants/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<TUserResponse | null>(null);
  console.log("🚀 ~ SignupPage ~ user:", user);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className={cn("w-full max-w-[400px]")}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              {isOtpSent
                ? "Enter the OTP sent to your phone"
                : "Fill in your details below to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isOtpSent ? (
              <OtpVerificationForm
                phoneNumber={phoneNumber}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                user={user}
                type={OtpType.REGISTRATION}
              />
            ) : (
              <SignupForm
                setPhoneNumber={setPhoneNumber}
                setIsOtpSent={setIsOtpSent}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setUser={setUser}
              />
            )}
            <div
              className="text-center text-sm mt-4 cursor-pointer text-accent/60 underline"
              onClick={() => setIsOtpSent(!isOtpSent)}
            >
              {isOtpSent ? "I don't have a code" : "I already have a code"}
            </div>
            <div className="text-center text-base mt-4">
              Already have an account?
              <Link href="/auth/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
