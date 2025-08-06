import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const userCount = await prisma.user.count();
  const reviewCount = await prisma.review.count();
  return NextResponse.json({ userCount, reviewCount });
} 