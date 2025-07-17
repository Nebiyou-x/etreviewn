"use client";

import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function AddMovieForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

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
    (data as any).genres = selectedGenres;
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess("Movie added successfully!");
        form.reset();
        setSelectedGenres([]);
      } else {
        setError(result.error || "Failed to add movie");
      }
    } catch (err) {
      setError("Failed to add movie");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <h1 className="text-3xl font-bold mb-6">Add a New Movie</h1>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit} ref={formRef}>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input name="title" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Director</label>
          <input name="director" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Release Year</label>
          <input name="releaseYear" type="number" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input name="imageUrl" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Watch Link</label>
          <input name="watchUrl" className="w-full border rounded px-3 py-2" placeholder="https://..." />
        </div>
        <div>
          <Label className="block mb-1 font-medium">Genres</Label>
          <select
            multiple
            className="w-full border rounded px-3 py-2"
            value={selectedGenres}
            onChange={e => {
              const options = Array.from(e.target.selectedOptions);
              setSelectedGenres(options.map(opt => opt.value));
            }}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Movie"}
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
} 