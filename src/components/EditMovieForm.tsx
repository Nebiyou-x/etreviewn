"use client";

import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface Movie {
  id: string;
  title: string;
  description: string;
  director?: string;
  releaseYear?: number;
  imageUrl?: string;
  watchUrl?: string;
  genres: { id: string; name: string }[];
}

interface EditMovieFormProps {
  movie: Movie;
}

export default function EditMovieForm({ movie }: EditMovieFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    movie.genres.map(g => g.id)
  );
  const router = useRouter();

  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch(() => setGenres([]));
  }, []);

  function handleGenreChange(id: string) {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((gid) => gid !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    (data as any).id = movie.id;
    (data as any).genres = selectedGenres;
    
    try {
      const res = await fetch("/api/movies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess("Movie updated successfully!");
        setTimeout(() => {
          router.push("/movies");
        }, 1500);
      } else {
        setError(result.error || "Failed to update movie");
      }
    } catch (err) {
      setError("Failed to update movie");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <h1 className="text-3xl font-bold mb-6">Edit Movie: {movie.title}</h1>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input 
            name="title" 
            defaultValue={movie.title}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea 
            name="description" 
            defaultValue={movie.description}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Director</label>
          <input 
            name="director" 
            defaultValue={movie.director || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Release Year</label>
          <input 
            name="releaseYear" 
            type="number" 
            defaultValue={movie.releaseYear || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input 
            name="imageUrl" 
            defaultValue={movie.imageUrl || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Watch Link</label>
          <input 
            name="watchUrl" 
            defaultValue={movie.watchUrl || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
            placeholder="https://..." 
          />
        </div>
        <div>
          <Label className="block mb-1 font-medium">Genres</Label>
          <select
            multiple
            className="w-full border border-accent rounded px-3 py-2 text-secondary bg-primary"
            value={selectedGenres}
            onChange={e => {
              const options = Array.from(e.target.selectedOptions);
              setSelectedGenres(options.map(opt => opt.value));
            }}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id} className="text-primary bg-secondary">
                {genre.name}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedGenres.map((id) => {
              const genre = genres.find((g) => g.id === id);
              return genre ? (
                <Badge key={id} variant="secondary">{genre.name}</Badge>
              ) : null;
            })}
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="bg-accent text-secondary px-4 py-2 rounded font-semibold hover:bg-primary hover:text-accent transition-all duration-200" 
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Movie"}
          </button>
          <button 
            type="button" 
            onClick={() => router.push("/movies")}
            className="bg-secondary text-primary px-4 py-2 rounded font-semibold hover:bg-accent hover:text-secondary transition-all duration-200"
          >
            Cancel
          </button>
        </div>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
} 