"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ movieId, onRated }: { movieId: string; onRated?: () => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function rate(n: number) {
    setLoading(true);
    setSelected(n);
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ movieId, rating: n, comment: "" }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    if (res.status === 401) {
      setError("You must be signed in to rate this movie.");
    } else if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to submit rating");
    } else {
      setSuccess(true);
      if (onRated) onRated();
      setTimeout(() => setSuccess(false), 2000);
    }
  }

  return (
    <div className="flex items-center space-x-1 mb-4">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => rate(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(null)}
          disabled={loading}
          className="focus:outline-none"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              (hovered ?? selected) >= n ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
            }`}
            fill={(hovered ?? selected) >= n ? "#eab308" : "none"}
          />
        </button>
      ))}
      {success && <span className="ml-2 text-green-500">Rated!</span>}
      {error === "You must be signed in to rate this movie." ? (
        <div className="text-yellow-500 ml-2">
          {error} {" "}
          <a href="/auth/login" className="underline text-blue-400">Sign in</a>
          {" or "}
          <a href="/auth/register" className="underline text-blue-400">Register</a>
        </div>
      ) : error && <div className="text-red-500 ml-2">{error}</div>}
    </div>
  );
} 