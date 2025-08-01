"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReturnButton } from "@/components/return-button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/manual-logout", { method: "GET", credentials: "include" })
      .then((res) => {
        if (res.ok) {
          setDone(true);
          // After deleting cookie, redirect
          router.push("/auth/login");
        } else {
          console.error("Logout route error", res.status);
          setDone(true);
        }
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        setDone(true);
      });
  }, [router]);

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-3xl font-bold">Logout</h1>
      </div>

      {done ? (
        <div className="space-y-4">
          <p className="text-green-500 text-lg">You have been logged out.</p>
          <Link href="/auth/login">
            <Button>Sign In Again</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="ml-2">Go Home</Button>
          </Link>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">Logging you out...</p>
      )}
    </div>
  );
}
