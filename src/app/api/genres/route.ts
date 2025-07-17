import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/genres - fetch all genres
export async function GET(req: NextRequest) {
  const genres = await prisma.genre.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(genres);
} 