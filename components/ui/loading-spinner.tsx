import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  message = "Loading...",
  size = "md",
  className
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={cn("text-center", className)}>
      {/* Animated spinner with gradient */}
      <div className={cn("relative mx-auto mb-4", sizeClasses[size])}>
        <div className="absolute inset-0 rounded-full border-3 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-primary border-r-primary animate-spin"></div>
      </div>

      {/* Loading text with pulse animation */}
      <div className="space-y-2">
        <p className={cn("font-medium text-gray-700", textSizes[size])}>{message}</p>
        <div className="flex items-center justify-center gap-1">
          <span className={cn("bg-primary rounded-full animate-bounce", dotSizes[size])} style={{ animationDelay: '0ms' }}></span>
          <span className={cn("bg-primary rounded-full animate-bounce", dotSizes[size])} style={{ animationDelay: '150ms' }}></span>
          <span className={cn("bg-primary rounded-full animate-bounce", dotSizes[size])} style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
}

interface LoadingPageProps {
  message?: string;
  showSidebar?: boolean;
  sidebarProps?: {
    userName: string;
    userEmail: string;
  };
}

export function LoadingPage({
  message = "Loading...",
  showSidebar = false,
  sidebarProps
}: LoadingPageProps) {
  const Sidebar = showSidebar ? require("@/components/dashboard/Sidebar").Sidebar : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {showSidebar && Sidebar && sidebarProps && (
        <Sidebar userName={sidebarProps.userName} userEmail={sidebarProps.userEmail} />
      )}
      <main className="flex-1 flex items-center justify-center p-4">
        <LoadingSpinner message={message} size="md" />
      </main>
    </div>
  );
}
