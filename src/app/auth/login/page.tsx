import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ReturnButton } from "@/components/return-button";
export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />
      
      <h1 className="text-3xl font-bold">Login</h1>
       </div>
      <LoginForm />
   
 

      <p className="text-muted-foreground text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="hover:text-foreground">
          Register
        </Link>
      </p>
    </div>
  );   
}