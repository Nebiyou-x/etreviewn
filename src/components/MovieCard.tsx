"use client";
import React, { useState } from "react";
import { Film } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function MovieCard({ movie, isAdmin = false, onDelete }: { movie: any, isAdmin?: boolean, onDelete?: (id: string) => void }) {
  const [imgError, setImgError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    setDeleting(true);
    const res = await fetch("/api/movies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: movie.id }),
    });
    setDeleting(false);
    if (res.ok) {
      if (onDelete) onDelete(movie.id);
    } else {
      alert("Failed to delete movie");
    }
  }
  return (
    <Link key={movie.id} href={`/movies/${movie.id}`} className="block group relative">
      <div className="bg-primary border border-accent rounded-lg overflow-hidden shadow-lg group-hover:ring-2 group-hover:ring-accent transition">
        <div className="aspect-[2/3] bg-primary flex items-center justify-center overflow-hidden min-h-0">
          {movie.imageUrl && !imgError ? (
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="object-cover w-full h-full block group-hover:scale-105 transition-transform duration-200 bg-primary"
              onError={() => setImgError(true)}
            />
          ) : (
            <Film className="h-12 w-12 text-accent" />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-secondary line-clamp-1">{movie.title}</h2>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-secondary flex items-center">
              {movie.releaseYear || "N/A"}
            </span>
          </div>
          <p className="text-sm text-secondary mt-2 line-clamp-2">Dir. {movie.director || "Unknown"}</p>
          <p className="text-xs text-secondary mt-2 line-clamp-2">{movie.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres && movie.genres.map((genre: any) => (
              <Badge key={genre.id || genre} variant="secondary" className="text-xs bg-primary">
                {genre.name || genre}
              </Badge>
            ))}
          </div>
          {isAdmin && (
            <button
              className="mt-4 bg-accent hover:bg-primary text-secondary font-bold py-1 px-3 rounded text-xs"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
} 