// app/api/manual-logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.redirect("/auth/login");

    response.cookies.set("__Secure-better-auth.session_token", "", {
      path: "/",
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });

    return response;
  } catch (err) {
    console.error("Logout error:", err);

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
