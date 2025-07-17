import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AddMovieForm from "@/components/AddMovieForm";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export default async function AddMoviePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Debug: Show the session object on the page
  return (
    <div>
      <h2>Session Debug Info</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/* The rest of your logic below */}
      {(!session || session.user?.email?.toLowerCase() !== "admin@gmail.com") ? (
        <p className="text-destructive">Unauthorized</p>
      ) : (
        <AddMovieForm />
      )}
    </div>
  );
} 