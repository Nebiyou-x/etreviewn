
"use client";

import React, { useState, useEffect } from "react";
import { Film } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@/components/MovieCard";
import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";

// 👇 your entire MoviesPageContent component code here
export default function MoviesPageContent() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.email?.toLowerCase() === "admin@gmail.com";
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const genreId = searchParams.get("genreId") || "";

  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (genreId) params.set("genreId", genreId);
      const res = await fetch(`/api/movies?${params.toString()}`);
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    }
    fetchMovies();
  }, [search, genreId]);

  function handleDelete(id: string) {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  }

  function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newGenreId = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (newGenreId) {
      params.set("genreId", newGenreId);
    } else {
      params.delete("genreId");
    }
    router.push(`/movies?${params.toString()}`);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-900/80 via-zinc-900/90 to-black/95">
      <nav className="sticky top-0 z-30 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-orange-400 drop-shadow" />
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
              Ethio<span className="text-orange-400">Flix</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-zinc-200 hover:text-orange-400 transition font-medium">Home</Link>
            <Link href="/movies" className="text-orange-400 font-bold">Movies</Link>
            <Link href="/stories" className="text-zinc-200 hover:text-orange-400 transition font-medium">News</Link>
          </div>
          <div className="flex items-center space-x-4">
            {!session && (
              <>
                <Link href="/auth/login" className="text-orange-400 font-bold hover:underline">Sign In</Link>
                <Link href="/auth/register" className="text-orange-400 font-bold hover:underline">Register</Link>
              </>
            )}
            {session && (
              <Link href="/auth/logout" className="text-orange-400 font-bold hover:underline">
                Log Out
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400 drop-shadow-lg">Ethiopian Movies</h1>
            <Badge className="bg-orange-500/20 text-orange-200 border border-orange-400/30 px-3 py-1 rounded-full text-base font-medium flex items-center">
              <Film className="h-4 w-4 mr-2" />
              {movies.length} films
            </Badge>
            {isAdmin && (
              <Link href="/admin/add-movie">
                <button className="ml-4 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white font-bold py-2 px-5 rounded-xl shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200">
                  + Add Movie
                </button>
              </Link>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-60">
              <label className="block mb-1 font-medium text-orange-200">Filter by Genre</label>
              <select
                className="w-full border-none rounded-xl px-4 py-2 bg-white/10 backdrop-blur-md text-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                value={genreId}
                onChange={handleGenreChange}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            <form method="GET" action="/movies" className="flex flex-1 max-w-lg">
              <input
                type="text"
                name="search"
                placeholder="Search by title..."
                defaultValue={search}
                className="w-full px-4 py-2 rounded-l-xl bg-white/10 backdrop-blur-md border-none text-orange-100 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white font-bold rounded-r-xl shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200"
              >
                Search
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {loading ? (
              <div className="col-span-full text-center text-orange-200/60 text-lg">Loading...</div>
            ) : movies.length === 0 ? (
              <div className="col-span-full text-center text-orange-200/60 text-lg">No movies found.</div>
            ) : (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} isAdmin={isAdmin} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
