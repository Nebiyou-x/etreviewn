import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get total count of reviews
    const totalReviews = await prisma.review.count();
    
    // Get count of reviews with ratings
    const ratingReviews = await prisma.review.count({
      where: {
        rating: { not: null },
        isRatingOnly: true,
      },
    });
    
    // Get count of reviews with comments
    const commentReviews = await prisma.review.count({
      where: {
        comment: { not: null },
        isRatingOnly: false,
      },
    });
    
    // Get a few sample reviews
    const sampleReviews = await prisma.review.findMany({
      take: 5,
      include: {
        movie: {
          select: { title: true },
        },
      },
    });
    
    return NextResponse.json({
      totalReviews,
      ratingReviews,
      commentReviews,
      sampleReviews,
    });
  } catch (error) {
    console.error('Debug reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch debug info' }, { status: 500 });
  }
} 