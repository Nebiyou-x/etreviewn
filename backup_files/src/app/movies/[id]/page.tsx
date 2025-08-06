import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calendar, Film, ArrowLeft, User } from 'lucide-react';
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { authClient } from "@/lib/auth-client";
import QuickStarRating from "@/components/QuickStarRating";
import PaginatedReviews from "@/components/PaginatedReviews";
import { Menu, X, HomeIcon, BookOpen } from 'lucide-react';

// ✅ Wrapper to satisfy Next.js runtime handling
export default function PageWrapper(props: { params: { id: string } }) {
  return <MovieDetailsPage params={props.params} />;
}

// ✅ Actual page logic in async function
async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = await prisma.movie.findUnique({
    where: { id: params.id },
    include: { genres: true },
  });

  if (!movie) {
    notFound();
  }

  const reviews = await prisma.review.findMany({
    where: { movieId: params.id },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const ratingReviews = reviews.filter(r => r.rating !== null && r.rating !== undefined);
  const avgRating = ratingReviews.length
    ? (ratingReviews.reduce((sum, r) => sum + r.rating!, 0) / ratingReviews.length)
    : null;
  const ratingCount = ratingReviews.length;

  return (
    <div className="min-h-screen w-full bg-primary">
      {/* Navigation */}
      <nav className="border-b border-accent bg-primary">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            <Link href="/" className="text-xl sm:text-2xl font-bold text-secondary">
              Ethio<span className="text-accent">Flix</span>
            </Link>
          </div>
          
          {/* Centered Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-secondary hover:text-accent transition font-medium">Home</Link>
              <Link href="/movies" className="text-accent font-bold">Movies</Link>
              <Link href="/stories" className="text-secondary hover:text-accent transition font-medium">News</Link>
            </div>
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" className="text-accent font-bold hover:underline">Sign In</Link>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center py-4 sm:py-8 px-2">
        <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl bg-primary border border-accent overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-10 p-4 sm:p-6 md:p-10">
            <div className="w-full lg:w-1/3 flex-shrink-0 flex items-center justify-center">
              <div className="aspect-[2/3] w-48 md:w-56 rounded-2xl overflow-hidden shadow-xl border-2 border-accent bg-primary flex items-center justify-center">
                {movie.imageUrl ? (
                  <img
                    src={movie.imageUrl || "/placeholder.svg"}
                    alt={movie.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary">
                    <Film className="h-16 w-16 sm:h-20 sm:w-20 text-accent" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-accent drop-shadow-lg">
                  {movie.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-secondary/80 text-base sm:text-lg">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    {movie.releaseYear || "N/A"}
                  </span>
                  {avgRating && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                      <span className="font-semibold">{avgRating.toFixed(1)}</span>
                      <span className="text-secondary/60 text-sm sm:text-base">
                        ({ratingCount} {ratingCount === 1 ? "rating" : "ratings"})
                      </span>
                    </span>
                  )}
                  {movie.director && (
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                      {movie.director}
                    </span>
                  )}
                </div>

                {movie.genres && Array.isArray(movie.genres) && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {movie.genres.map((genre) => (
                      <Badge
                        key={genre.id}
                        className="bg-accent/20 text-accent border border-accent/30 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <QuickStarRating movieId={movie.id} />
                {movie.watchUrl && (
                  <a href={movie.watchUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-accent text-secondary font-bold shadow-lg hover:bg-primary hover:text-accent transition-all duration-200 px-4 sm:px-6 py-2 rounded-xl">
                      Watch Now
                    </Button>
                  </a>
                )}
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-accent tracking-wide">Synopsis</h3>
                <p className="text-secondary/90 leading-relaxed text-sm sm:text-base md:text-lg">
                  {movie.description}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-4 left-4 z-20">
            <Link href="/movies">
              <Button
                variant="outline"
                className="text-accent border-accent bg-primary hover:bg-accent hover:text-secondary shadow-md"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>

          <div className="relative z-10 mt-6 sm:mt-8 px-4 pb-6 sm:pb-8">
            <div className="max-w-3xl mx-auto rounded-2xl bg-primary border border-accent shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent">Reviews</h2>
              <PaginatedReviews movieId={movie.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-accent py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Film className="h-6 w-6 text-accent" />
              <h4 className="text-xl font-bold text-secondary">Ethio<span className="text-accent">Flix</span></h4>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-secondary hover:text-accent transition-colors">About</Link>
              <Link href="/privacy" className="text-secondary hover:text-accent transition-colors">Privacy</Link>
              <Link href="/terms" className="text-secondary hover:text-accent transition-colors">Terms</Link>
              <Link href="/contact" className="text-secondary hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
          <p className="text-center text-secondary mt-8">
            © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
          </p>
        </div>
      </footer>
    </div>
  );
}
