import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Fetching top rated movies...'); // Debug log
    
    // Fetch all movies with genres and reviews
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
    
    console.log(`Found ${movies.length} movies with reviews`); // Debug log

    // Calculate average ratings
    const moviesWithAvg = movies.map((movie: any) => {
      const ratings = movie.reviews.filter((r: any) => r.rating && r.rating > 0);
      const avgRating = ratings.length > 0
        ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length
        : 0;
      console.log(`Movie: ${movie.title}, Reviews: ${movie.reviews.length}, Ratings: ${ratings.length}, Avg: ${avgRating}`); // Debug log
      return { ...movie, avgRating, reviewCount: ratings.length };
    });

    // Filter movies with at least one rating, sort by average rating descending and take top 4
    const ratedMovies = moviesWithAvg
      .filter((movie: any) => movie.avgRating > 0)
      .sort((a: any, b: any) => b.avgRating - a.avgRating);
    
    const topN = ratedMovies.slice(0, 3);
    
    console.log(`Returning ${topN.length} top rated movies:`, topN.map(m => ({ title: m.title, avgRating: m.avgRating }))); // Debug log

    return NextResponse.json(topN);
  } catch (error) {
    console.error('Error fetching top rated movies list:', error);
    return NextResponse.json({ error: 'Failed to fetch top rated movies list' }, { status: 500 });
  }
} 