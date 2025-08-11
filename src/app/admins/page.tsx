import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MovieForm from "@/components/MovieFormed";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export default async function Movieedit() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Debug: Show the session object on the page
  return (
    <div>
      
      {/* The rest of your logic below */}
      {(!session || session.user?.email?.toLowerCase() !== "admin@gmail.com") ? (
        <p className="text-destructive">Unauthorized</p>
      ) : (
        <MovieForm />
      )}
    </div>
  );
} 