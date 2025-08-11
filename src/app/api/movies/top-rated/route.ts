import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Find all movies with genres and reviews
    const movies = await prisma.movie.findMany({
      include: {
        genres: true,
        reviews: {
          where: {
            rating: { not: null }, // Only include reviews with ratings
            isRatingOnly: true,    // Only include rating-only reviews
          },
        },
      },
    });

    // Calculate average ratings
    const moviesWithAvg = movies.map((movie: any) => {
      const ratings = movie.reviews.filter((r: any) => r.rating && r.rating > 0);
      const avgRating = ratings.length > 0
        ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length
        : 0;
      return { ...movie, avgRating, reviewCount: ratings.length };
    });

    // Filter movies with at least one rating and sort by average rating descending
    const ratedMovies = moviesWithAvg
      .filter((movie: any) => movie.avgRating > 0)
      .sort((a: any, b: any) => b.avgRating - a.avgRating);

    // Return the top rated movie (or null if none)
    const best = ratedMovies[0] || null;

    return NextResponse.json(best);
  } catch (error) {
    console.error('Error fetching top rated movie:', error);
    return NextResponse.json({ error: 'Failed to fetch top rated movie' }, { status: 500 });
  }
} 