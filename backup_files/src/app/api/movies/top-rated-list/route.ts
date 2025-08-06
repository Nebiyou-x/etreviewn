import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch all movies with genres and reviews
  const movies = await prisma.movie.findMany({
    include: {
      genres: true,
      reviews: true,
    },
  });

  // Calculate average ratings
  const moviesWithAvg = movies.map((movie: any) => {
    const avgRating = movie.reviews.length
      ? movie.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / movie.reviews.length
      : 0;
    return { ...movie, avgRating };
  });

  // Sort by average rating descending and take top 4
  moviesWithAvg.sort((a: any, b: any) => b.avgRating - a.avgRating);
  const topN = moviesWithAvg.slice(0, 4);

  return NextResponse.json(topN);
} 