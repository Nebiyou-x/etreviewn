"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import ReviewForm from "@/components/ReviewForm";
import { authClient } from "@/lib/auth-client";

const REVIEWS_PER_PAGE = 5;

export default function PaginatedReviews({ movieId }: { movieId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(0); // for refreshing after new review
  // Add like loading state
  const [likeLoading, setLikeLoading] = useState<{ [reviewId: string]: boolean }>({});
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  useEffect(() => {
    loadReviews(0, true);
    // eslint-disable-next-line
  }, [movieId, refreshFlag]);

  const loadReviews = async (pageToLoad = page, reset = false) => {
    setLoading(true);
    const skip = pageToLoad * REVIEWS_PER_PAGE;
    const res = await fetch(`/api/reviews?movieId=${movieId}&skip=${skip}&take=${REVIEWS_PER_PAGE}`);
    const data = await res.json();
    setTotal(data.total);
    if (reset) {
      setReviews(data.reviews);
      setPage(1);
    } else {
      setReviews(prev => [...prev, ...data.reviews]);
      setPage(pageToLoad + 1);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    loadReviews(page);
  };

  // Calculate average rating
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) : null;

  // Refresh reviews after submitting a new one
  const handleReviewSubmitted = () => {
    setRefreshFlag(f => f + 1);
  };

  // Like/unlike handler
  const handleLike = async (reviewId: string, liked: boolean) => {
    setLikeLoading(l => ({ ...l, [reviewId]: true }));
    // Optimistic update
    setReviews(reviews => reviews.map(r =>
      r.id === reviewId
        ? {
            ...r,
            likeCount: r.likeCount + (liked ? -1 : 1),
            likedByUser: !liked,
          }
        : r
    ));
    const method = liked ? "DELETE" : "PUT";
    await fetch("/api/reviews", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewId }),
    });
    setLikeLoading(l => ({ ...l, [reviewId]: false }));
    // Optionally, refresh from server for accuracy
    // setRefreshFlag(f => f + 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-500">Reviews</h2>
        {/* Removed average rating and stars from the reviews section */}
      </div>
      <ReviewForm movieId={movieId} onReviewSubmitted={handleReviewSubmitted} />
      {reviews.length > 0 ? (
        <div className="space-y-6 mt-6">
          {reviews.map(r => (
            <Card key={r.id} className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {/* Removed star rating display */}
                    <span className="font-bold text-green-500">{r.user?.name || "Anonymous"}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{r.comment}</p>
                <div className="flex items-center mt-2">
                  <button
                    className={`flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors ${r.likedByUser ? 'font-bold' : ''}`}
                    aria-label={r.likedByUser ? "Unlike" : "Like"}
                    disabled={likeLoading[r.id] || !isAuthenticated}
                    onClick={() => handleLike(r.id, r.likedByUser)}
                  >
                    <ThumbsUp
                      className={`w-5 h-5 ${r.likedByUser ? 'fill-green-400 text-green-400' : 'text-gray-500'}`}
                      fill={r.likedByUser ? '#22c55e' : 'none'}
                    />
                    <span>{r.likeCount}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="py-8 text-center text-gray-500">
            No reviews yet. Be the first to review this film!
          </CardContent>
        </Card>
      )}
      {reviews.length < total && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
} 