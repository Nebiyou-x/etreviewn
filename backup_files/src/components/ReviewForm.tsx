"use client";
import { useState } from "react";

export default function ReviewForm({ movieId, onReviewSubmitted }: { movieId: string; onReviewSubmitted?: () => void }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ movieId, comment }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    if (res.status === 401) {
      setError("You must be signed in to leave a review.");
    } else if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to submit review");
    } else {
      setSuccess(true);
      setComment("");
      if (onReviewSubmitted) onReviewSubmitted();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Write your review"
        required
        className="w-full p-2 border rounded text-black"
      />
      <button type="submit" disabled={loading} className="bg-yellow-600 px-4 py-2 rounded text-white">
        {loading ? "Submitting..." : "Submit Review"}
      </button>
      {error === "You must be signed in to leave a review." ? (
        <div className="text-yellow-500">
          {error} {" "}
          <a href="/auth/login" className="underline text-blue-400">Sign in</a>
          {" or "}
          <a href="/auth/register" className="underline text-blue-400">Register</a>
        </div>
      ) : error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">Review submitted!</div>}
    </form>
  );
} 