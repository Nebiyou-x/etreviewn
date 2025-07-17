"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import StarRating from "@/components/StarRating";

export default function QuickStarRating({ movieId }: { movieId: string }) {
  const [showStars, setShowStars] = useState(false);
  const [rated, setRated] = useState(false);

  return (
    <div className="flex gap-3 mb-6">
      {!showStars && !rated && (
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setShowStars(true)}
        >
          <Star className="h-4 w-4 mr-2" /> Rate
        </Button>
      )}
      {showStars && !rated && (
        <StarRating
          movieId={movieId}
          onRated={() => {
            setRated(true);
            setShowStars(false);
          }}
        />
      )}
      {rated && <span className="text-green-500 font-bold">Thank you for rating!</span>}
    </div>
  );
} 