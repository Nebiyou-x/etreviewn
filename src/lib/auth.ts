import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  // ✅ Fixed logout handler with correct cookie name
  async logout(context: { res: import("next/server").NextResponse }) {
    context.res.cookies.set("__Secure-better-auth.session-token", "", {
      path: "/",
      httpOnly: true,
      secure: true, // required to match original cookie
      sameSite: "lax", // match the SameSite setting
      expires: new Date(0), // immediately expire
    });

    return {
      redirectTo: "/auth/login",
    };
  },
});
