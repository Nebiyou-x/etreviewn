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

  // ✅ Use inline typing instead of missing LogoutContext
  async logout(context: { res: import("next/server").NextResponse }) {
    context.res.cookies.set("better-auth.session-token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });

    return {
      redirectTo: "/auth/login",
    };
  },
});
