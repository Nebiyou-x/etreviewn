import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search")?.trim() || "";
  const genreId = searchParams.get("genreId") || "";
  try {
    const movies = await prisma.movie.findMany({
      where: {
        ...(search
          ? {
              title: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {}),
        ...(genreId
          ? {
              genres: {
                some: { id: genreId },
              },
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      include: { 
        genres: true,
        reviews: {
          where: {
            rating: { not: null },
            isRatingOnly: true,
          },
        },
      },
    });

    // Calculate average ratings for each movie
    const moviesWithAvgRating = movies.map((movie: any) => {
      const ratings = movie.reviews.filter((r: any) => r.rating && r.rating > 0);
      const avgRating = ratings.length > 0
        ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length
        : null;
      return { ...movie, avgRating };
    });
    return NextResponse.json(moviesWithAvgRating);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || session.user?.email?.toLowerCase() !== "admin@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { title, description, director, releaseYear, imageUrl, genres, watchUrl } = data;
  if (!title || !description) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        director,
        releaseYear: releaseYear ? Number(releaseYear) : null,
        imageUrl,
        watchUrl,
        genres: genres && Array.isArray(genres) && genres.length > 0
          ? {
              connect: genres.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: { genres: true },
    });
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error("Movie creation error:", error);
    let details: string;
    if (error instanceof Error) {
      details = error.message;
    } else if (typeof error === "string") {
      details = error;
    } else {
      details = JSON.stringify(error);
    }
    return NextResponse.json({ error: "Failed to create movie", details }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || session.user?.email?.toLowerCase() !== "admin@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { id, title, description, director, releaseYear, imageUrl, genres, watchUrl } = data;
  if (!id || !title || !description) {
    return NextResponse.json({ error: "ID, title and description are required" }, { status: 400 });
  }

  try {
    // First disconnect all existing genres
    await prisma.movie.update({
      where: { id },
      data: { genres: { set: [] } },
    });

    // Then update the movie with new data and connect new genres
    const movie = await prisma.movie.update({
      where: { id },
      data: {
        title,
        description,
        director,
        releaseYear: releaseYear ? Number(releaseYear) : null,
        imageUrl,
        watchUrl,
        genres: genres && Array.isArray(genres) && genres.length > 0
          ? {
              connect: genres.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: { genres: true },
    });
    return NextResponse.json(movie);
  } catch (error) {
    console.error("Movie update error:", error);
    let details: string;
    if (error instanceof Error) {
      details = error.message;
    } else if (typeof error === "string") {
      details = error;
    } else {
      details = JSON.stringify(error);
    }
    return NextResponse.json({ error: "Failed to update movie", details }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || session.user.email.toLowerCase() !== "admin@gmail.com") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Movie ID required" }), { status: 400 });
    }
    await prisma.movie.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to delete movie" }), { status: 500 });
  }
} 