"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface Genre {
  id: string;
  name: string;
}

interface MovieFormProps {
  movieId?: string; // optional, present if editing
}

export default function MovieForm({ movieId }: MovieFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movieData, setMovieData] = useState<any>(null);

  // Fetch genres on mount
  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then(setGenres)
      .catch(() => setGenres([]));
  }, []);

  // If editing, fetch movie data by ID
  useEffect(() => {
    if (!movieId) return;

    fetch(`/api/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
        setSelectedGenres(data.genres?.map((g: Genre) => g.id) || []);
      })
      .catch(() => setError("Failed to load movie data"));
  }, [movieId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    (data as any).genres = selectedGenres;

    try {
      const method = movieId ? "PUT" : "POST";
      const url = movieId ? `/api/movies/${movieId}` : "/api/movies";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(movieId ? "Movie updated successfully!" : "Movie added successfully!");
        if (!movieId) {
          form.reset();
          setSelectedGenres([]);
          setMovieData(null);
        } else {
          setMovieData(result); // update local data on edit success
        }
      } else {
        setError(result.error || (movieId ? "Failed to update movie" : "Failed to add movie"));
      }
    } catch {
      setError(movieId ? "Failed to update movie" : "Failed to add movie");
    } finally {
      setLoading(false);
    }
  }

  if (movieId && !movieData) {
    return <p className="p-4">Loading movie details...</p>;
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <h1 className="text-3xl font-bold mb-6">{movieId ? "Edit Movie" : "Add a New Movie"}</h1>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            defaultValue={movieData?.title || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={movieData?.description || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Director</label>
          <input
            name="director"
            defaultValue={movieData?.director || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Release Year</label>
          <input
            name="releaseYear"
            type="number"
            defaultValue={movieData?.releaseYear || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            name="imageUrl"
            defaultValue={movieData?.imageUrl || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Watch Link</label>
          <input
            name="watchUrl"
            defaultValue={movieData?.watchUrl || ""}
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
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions);
              setSelectedGenres(options.map((opt) => opt.value));
            }}
          >
            {genres.map((genre) => (
              <option
                key={genre.id}
                value={genre.id}
                className="text-primary bg-secondary"
              >
                {genre.name}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedGenres.map((id) => {
              const genre = genres.find((g) => g.id === id);
              return genre ? (
                <Badge key={id} variant="secondary">
                  {genre.name}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? (movieId ? "Updating..." : "Adding...") : (movieId ? "Update Movie" : "Add Movie")}
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
