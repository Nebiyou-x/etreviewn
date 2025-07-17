import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // Find the movie with the highest average review rating
  const topMovie = await prisma.movie.findMany({
    include: {
      genres: true,
      reviews: true,
    },
  });

  // Calculate average ratings
  const moviesWithAvg = topMovie.map((movie: any) => {
    const avgRating = movie.reviews.length
      ? movie.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / movie.reviews.length
      : 0;
    return { ...movie, avgRating };
  });

  // Sort by average rating descending
  moviesWithAvg.sort((a: any, b: any) => b.avgRating - a.avgRating);

  // Return the top rated movie (or null if none)
  const best = moviesWithAvg[0] || null;

  return NextResponse.json(best);
} 