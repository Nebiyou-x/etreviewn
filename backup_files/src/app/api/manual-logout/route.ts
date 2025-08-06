// app/api/manual-logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set("__Secure-better-auth.session_token", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });

  return response;
}
