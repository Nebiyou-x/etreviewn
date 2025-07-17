import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Require authentication
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { movieId, rating, comment } = await req.json();
  if (!movieId) {
    return NextResponse.json({ error: "Missing movieId" }, { status: 400 });
  }

  // Enforce: only rating or only comment, never both
  if ((rating && comment) || (!rating && !comment)) {
    return NextResponse.json({ error: "You must provide either a rating or a comment, not both." }, { status: 400 });
  }

  // If rating only
  if (rating && !comment) {
    // Find existing rating-only review
    const existing = await prisma.review.findFirst({
      where: {
        movieId,
        userId: session.user.id,
        isRatingOnly: true,
      },
    });
    if (existing) {
      const updated = await prisma.review.update({
        where: { id: existing.id },
        data: { rating, comment: null, isRatingOnly: true },
      });
      return NextResponse.json(updated);
    }
    const review = await prisma.review.create({
      data: {
        movieId,
        rating,
        comment: null,
        userId: session.user.id,
        isRatingOnly: true,
      },
    });
    return NextResponse.json(review);
  }

  // If comment only
  if (comment && !rating) {
    // Find existing comment-only review
    const existing = await prisma.review.findFirst({
      where: {
        movieId,
        userId: session.user.id,
        isRatingOnly: false,
      },
    });
    if (existing) {
      const updated = await prisma.review.update({
        where: { id: existing.id },
        data: { comment, rating: null, isRatingOnly: false },
      });
      return NextResponse.json(updated);
    }
    const review = await prisma.review.create({
      data: {
        movieId,
        comment,
        rating: null,
        userId: session.user.id,
        isRatingOnly: false,
      },
    });
    return NextResponse.json(review);
  }
}

// Like/unlike endpoints
export async function PUT(req: NextRequest) {
  // Like a review
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { reviewId } = await req.json();
  if (!reviewId) {
    return NextResponse.json({ error: "Missing reviewId" }, { status: 400 });
  }
  // Create like if not exists
  await prisma.reviewLike.upsert({
    where: { reviewId_userId: { reviewId, userId: session.user.id } },
    update: {},
    create: { reviewId, userId: session.user.id },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  // Unlike a review
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { reviewId } = await req.json();
  if (!reviewId) {
    return NextResponse.json({ error: "Missing reviewId" }, { status: 400 });
  }
  await prisma.reviewLike.deleteMany({
    where: { reviewId, userId: session.user.id },
  });
  return NextResponse.json({ success: true });
}

// Update GET to only return reviews with a comment (isRatingOnly: false)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("movieId");
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "5", 10);

  // Try to get session, but allow unauthenticated
  let userId: string | null = null;
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    userId = session?.user?.id || null;
  } catch {}

  if (!movieId) {
    return NextResponse.json({ error: "Missing movieId" }, { status: 400 });
  }

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { movieId, isRatingOnly: false }, // Only reviews with comments
      include: {
        user: true,
        _count: { select: { likes: true } },
      },
      orderBy: [
        { likes: { _count: 'desc' } },
        { createdAt: 'desc' },
      ],
      skip,
      take,
    }),
    prisma.review.count({ where: { movieId, isRatingOnly: false } }),
  ]);

  // For each review, check if the user liked it
  let likedMap: Record<string, boolean> = {};
  if (userId) {
    const liked = await prisma.reviewLike.findMany({
      where: {
        userId,
        reviewId: { in: reviews.map(r => r.id) },
      },
      select: { reviewId: true },
    });
    likedMap = Object.fromEntries(liked.map(l => [l.reviewId, true]));
  }

  const reviewsWithLikes = reviews.map(r => {
    const { _count, ...rest } = r;
    return {
      ...rest,
      likeCount: _count?.likes || 0,
      likedByUser: !!likedMap[r.id],
    };
  });

  return NextResponse.json({ reviews: reviewsWithLikes, total });
} 