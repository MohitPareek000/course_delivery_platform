"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserSession } from "@/lib/auth";
import { LoadingPage } from "@/components/ui/loading-spinner";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const session = getCurrentUserSession();
    if (session) {
      // User is logged in, go to dashboard
      router.replace("/dashboard");
    } else {
      // Not logged in, go to login
      router.replace("/login");
    }
  }, [router]);

  // Show loading while checking session
  return <LoadingPage message="Loading..." />;
}
