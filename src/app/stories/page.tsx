import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, User, CalendarDays, Film, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import StoriesPageClient from "@/components/StoriesPageClient";

export default async function StoriesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const initialNews = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return <StoriesPageClient initialNews={initialNews} isAdmin={session?.user?.email?.toLowerCase() === "admin@gmail.com"} />;
}