import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getISTDate } from "@/lib/dateUtils";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          return null;
        }

        // Normalize email to lowercase for case-insensitive matching
        const email = (credentials.email as string).toLowerCase().trim();

        // Verify OTP
        const otpRecord = await prisma.oTP.findFirst({
          where: {
            email,
            otp: credentials.otp as string,
            verified: false,
            expiresAt: {
              gt: new Date(),
            },
          },
        });

        if (!otpRecord) {
          return null;
        }

        // Mark OTP as verified
        await prisma.oTP.update({
          where: { id: otpRecord.id },
          data: { verified: true },
        });

        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          const istNow = getISTDate();
          user = await prisma.user.create({
            data: {
              email,
              emailVerified: istNow,
              createdAt: istNow,
              updatedAt: istNow,
            },
          });
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
