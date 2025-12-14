import { LoginForm } from "@/components/auth/LoginForm";
import { CompanyLogosCarousel } from "@/components/auth/CompanyLogosCarousel";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Log in to your Account
            </h1>
            <p className="text-sm text-gray-600">
              Hey Learners, Enter your email to login
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />
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
