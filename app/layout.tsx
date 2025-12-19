import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/gtm/GoogleTagManager";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Cortex - A Course Platform",
  description: "Comprehensive learning and course management platform",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";

  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId={gtmId} />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <GoogleTagManagerNoScript gtmId={gtmId} />
        <AnalyticsProvider>
          <SessionProvider>{children}</SessionProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
