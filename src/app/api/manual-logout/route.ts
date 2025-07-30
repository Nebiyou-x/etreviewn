// app/api/manual-logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect("/auth/login"); // redirect after logout
  res.cookies.set("__Secure-better-auth.session_token", "", {
    path: "/",
    expires: new Date(0), // expire immediately
  });
  return res;
}
