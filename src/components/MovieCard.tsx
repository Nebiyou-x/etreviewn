"use client";
import React, { useState } from "react";
import { Film, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function MovieCard({ movie, isAdmin = false, onDelete, onUpdate }: { movie: any, isAdmin?: boolean, onDelete?: (id: string) => void, onUpdate?: (updatedMovie: any) => void }) {
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
      <div className="bg-primary border border-accent rounded-xl overflow-hidden shadow-lg group-hover:ring-2 group-hover:ring-accent transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
        <div className="aspect-[2/3] bg-primary flex items-center justify-center overflow-hidden min-h-0 relative">
          {movie.imageUrl && !imgError ? (
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="object-cover w-full h-full block group-hover:scale-105 transition-transform duration-300 bg-primary"
              onError={() => setImgError(true)}
            />
          ) : (
            <Film className="h-12 w-12 text-accent" />
          )}
          {/* Rating overlay */}
          {movie.avgRating && (
            <div className="absolute top-2 right-2 bg-accent/90 text-secondary px-2 py-1 rounded-full text-xs font-semibold">
              {movie.avgRating.toFixed(1)} ⭐
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="text-base font-bold text-secondary line-clamp-2 mb-2 group-hover:text-accent transition-colors">
            {movie.title}
          </h2>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-secondary/70 flex items-center">
              {movie.releaseYear || "N/A"}
            </span>
            {movie.director && (
              <span className="text-xs text-secondary/60 line-clamp-1">
                {movie.director}
              </span>
            )}
          </div>
          {movie.description && (
            <p className="text-xs text-secondary/60 line-clamp-2 mb-3 flex-1">
              {movie.description}
            </p>
          )}
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genres && movie.genres.slice(0, 2).map((genre: any) => (
              <Badge key={genre.id || genre} variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
                {genre.name || genre}
              </Badge>
            ))}
            {movie.genres && movie.genres.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
                +{movie.genres.length - 2}
              </Badge>
            )}
          </div>
          {isAdmin && (
            <div className="mt-auto flex gap-2">
              <Link href={`/admin/edit-movie/${movie.id}`}>
                <button className="bg-secondary hover:bg-accent text-primary hover:text-secondary font-semibold py-2 px-3 rounded-lg text-xs transition-all duration-200 flex items-center">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </button>
              </Link>
              <button
                className="bg-accent hover:bg-primary text-secondary hover:text-accent font-semibold py-2 px-3 rounded-lg text-xs transition-all duration-200 flex items-center"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 