import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // Find the review with the most likes
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      movie: true,
      likes: true,
    },
  });

  // Add likeCount to each review
  const reviewsWithLikes = reviews.map((r: any) => ({
    ...r,
    likeCount: r.likes.length,
  }));

  // Sort by likeCount descending
  reviewsWithLikes.sort((a: any, b: any) => b.likeCount - a.likeCount);

  // Return the most liked review (or null)
  const mostLiked = reviewsWithLikes[0] || null;

  return NextResponse.json(mostLiked);
} 