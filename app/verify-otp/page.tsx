"use client";

import * as React from "react";
import { OTPInput } from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { CompanyLogosCarousel } from "@/components/auth/CompanyLogosCarousel";
import { analytics } from "@/lib/analytics";

export default function VerifyOTPPage() {
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [resendTimer, setResendTimer] = React.useState(60);
  const router = useRouter();

  React.useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("login-email");
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
        // Track OTP failed
        analytics.auth.otpEntered(false);
        analytics.auth.loginFailed("Invalid OTP");
        throw new Error(data.error || "Invalid OTP");
      }

      // Track successful OTP entry
      analytics.auth.otpEntered(true);

      // Store user session in localStorage for persistence (with expiry timestamp)
      const userSession = {
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name || data.user.email.split('@')[0],
        loggedIn: true,
        createdAt: Date.now(),
      };
      localStorage.setItem("user-session", JSON.stringify(userSession));
      localStorage.removeItem("login-email");

      // Track successful login
      analytics.auth.loginSuccess(data.user.id, data.user.email);

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

    // Track resend OTP button click
    analytics.button.clicked('Resend OTP', '/verify-otp', { email });

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

      // Track OTP resent successfully
      analytics.auth.otpRequested(email);

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
      {/* Left Side - Company Logos Section (on desktop) */}
      <div className="bg-gray-50 lg:flex-1 flex flex-col relative overflow-hidden order-2 lg:order-1">
        {/* Background decoration - desktop only */}
        <div className="hidden lg:block absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:p-8">
          <div className="w-full h-full flex flex-col">
            {/* Scaler Logo at Top - Desktop only */}
            <div className="hidden lg:block px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 lg:pt-20 mb-8">
              <img
                src="https://scaler-blog-prod-wp-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/02/05111428/Scaler-Logo.svg"
                alt="Scaler"
                className="h-5 w-auto"
              />
            </div>
            <CompanyLogosCarousel />
          </div>
        </div>
      </div>

      {/* Right Side - OTP Form (on desktop) */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 bg-white order-1 lg:order-2">
        {/* Back Button */}
        <div className="w-full max-w-md mx-auto mb-4">
          <Button
            variant="ghost"
            onClick={() => {
              analytics.navigation.backClicked('/verify-otp');
              router.push("/login");
            }}
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

            {/* Help Text - Only show in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Development mode:</span> Check the browser console for the OTP code.
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
