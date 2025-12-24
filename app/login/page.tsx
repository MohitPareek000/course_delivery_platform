"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { CompanyLogosCarousel } from "@/components/auth/CompanyLogosCarousel";
import { getCurrentUserSession } from "@/lib/auth";
import { LoadingPage } from "@/components/ui/loading-spinner";

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const session = getCurrentUserSession();
    if (session) {
      // User is already logged in, redirect to dashboard
      router.replace("/dashboard");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  // Show loading while checking session
  if (isChecking) {
    return <LoadingPage message="Loading..." />;
  }

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

      {/* Right Side - Login Form (on desktop) */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white order-1 lg:order-2">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Log in to your Account
            </h1>
            <p className="text-sm text-gray-600">
              Hey Learners, Enter your email
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
