// app/api/manual-logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect("/auth/login");

  res.cookies.set("__Secure-better-auth.session_token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: true, // IMPORTANT for HTTPS in production
  });

  return res;
}
