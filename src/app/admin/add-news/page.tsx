import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AddNewsForm from "./AddNewsForm";

export default async function AddNewsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user?.email?.toLowerCase() !== "admin@gmail.com") {
    return <p className="text-destructive">Unauthorized</p>;
  }
  return <AddNewsForm />;
} 