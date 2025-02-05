"use client";

import { OtpVerificationForm } from "@/components/auth/otp-verification-form";
import { PhoneVerificationForm } from "@/components/auth/phone-verification-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className={cn("w-full max-w-[400px]")}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              {isOtpSent
                ? "Enter the OTP sent to your phone"
                : "Enter your phone number below to login to your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isOtpSent ? (
              <OtpVerificationForm
                phoneNumber={phoneNumber}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : (
              <PhoneVerificationForm
                setPhoneNumber={setPhoneNumber}
                setIsOtpSent={setIsOtpSent}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
