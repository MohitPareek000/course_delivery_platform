"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { analytics } from "@/lib/analytics";

export function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track login button clicked
    analytics.auth.loginButtonClicked();

    setIsLoading(true);
    setError("");

    // Track email entered
    analytics.auth.emailEntered(email);

    // Clear any existing session data before starting new login
    localStorage.removeItem("user-session");
    localStorage.removeItem("login-email");

    try {
      // Track OTP requested
      analytics.auth.otpRequested(email);

      // Call the send-otp API
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      // Store email in localStorage for OTP verification
      localStorage.setItem("login-email", email);

      // In development, also store the OTP for easy access
      if (data.otp) {
        console.log("Development OTP:", data.otp);
      }

      router.push("/verify-otp");
    } catch (error: any) {
      console.error("Email login error:", error);

      // Track login failed
      analytics.auth.loginFailed(error.message || "Failed to send OTP");

      setError(error.message || "Failed to send OTP. Please try again.");
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Email Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 text-base"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold"
          disabled={!isValidEmail(email) || isLoading}
        >
          {isLoading ? "Sending OTP..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}
