"use client";

import * as React from "react";
import { OTPInput } from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { CompanyLogosCarousel } from "@/components/auth/CompanyLogosCarousel";

export default function VerifyOTPPage() {
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [resendTimer, setResendTimer] = React.useState(60);
  const router = useRouter();

  React.useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem("login-email");
    if (!storedEmail) {
      router.push("/login");
      return;
    }
    setEmail(storedEmail);

    // Start resend timer
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  const handleVerifyOTP = async (otpValue: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Call the verify-otp API
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP");
      }

      // Session is now handled by NextAuth via cookie
      // No need to store in sessionStorage anymore
      sessionStorage.removeItem("login-email");

      // Redirect to dashboard - NextAuth will handle the session
      router.push("/dashboard");
      router.refresh(); // Refresh to pick up new session
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");

    try {
      // Call the send-otp API again
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If throttled, use the waitTime from the API response
        if (response.status === 429 && data.waitTime) {
          setResendTimer(data.waitTime);
          throw new Error(data.error || "Please wait before requesting a new OTP");
        }
        throw new Error(data.error || "Failed to resend OTP");
      }

      // In development, log the OTP
      if (data.otp) {
        console.log("Development OTP:", data.otp);
      }

      // Reset timer to 60 seconds
      setResendTimer(60);

      // Restart timer
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - OTP Form */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 bg-white">
        {/* Back Button */}
        <div className="w-full max-w-md mx-auto mb-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/login")}
            className="-ml-2 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Verify Your Email
            </h1>
            <p className="text-gray-600">
              We've sent a 4-digit code to
            </p>
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <Mail className="w-4 h-4" />
              {email}
            </div>
          </div>

          {/* OTP Input */}
          <div className="space-y-6">
            <div>
              <OTPInput
                length={4}
                onComplete={handleVerifyOTP}
                onChange={setOtp}
              />
              {error && (
                <p className="text-red-500 text-sm text-center mt-3">{error}</p>
              )}
            </div>

            {/* Resend OTP */}
            <div className="text-center text-sm">
              {resendTimer > 0 ? (
                <p className="text-gray-600">
                  Resend OTP in{" "}
                  <span className="font-semibold text-primary">
                    {resendTimer}s
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="text-primary font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Development mode:</span> Check the browser console for the OTP code.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Company Logos Section - Visible on all devices */}
      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:flex-1 lg:flex lg:items-center lg:justify-center lg:p-8 relative overflow-hidden">
        {/* Background decoration - desktop only */}
        <div className="hidden lg:block absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <CompanyLogosCarousel />
        </div>
      </div>
    </div>
  );
}
