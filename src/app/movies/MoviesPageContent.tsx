
"use client";

import React, { useState, useEffect } from "react";
import { Film, Menu, X } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@/components/MovieCard";
import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";

export default function MoviesPageContent() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen w-full bg-primary">
      <nav className="sticky top-0 z-30 bg-primary border-b border-accent shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-6 w-6 sm:h-8 sm:w-8 text-accent drop-shadow" />
            <Link href="/" className="text-xl sm:text-2xl font-extrabold tracking-tight text-secondary">
              Ethio<span className="text-accent">Flix</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-secondary hover:text-accent transition font-medium">Home</Link>
            <Link href="/movies" className="text-accent font-bold">Movies</Link>
            <Link href="/stories" className="text-secondary hover:text-accent transition font-medium">News</Link>
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            {!session && (
              <>
                <Link href="/auth/login" className="text-accent font-bold hover:underline">Sign In</Link>
                <Link href="/auth/register" className="text-accent font-bold hover:underline">Register</Link>
              </>
            )}
            {session && (
              <Link href="/auth/logout" className="text-accent font-bold hover:underline">
                Log Out
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-secondary hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-accent bg-primary">
            <div className="px-4 py-2 space-y-2">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-secondary hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Home</span>
              </Link>
              <Link 
                href="/movies" 
                className="flex items-center space-x-2 text-accent font-bold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Movies</span>
              </Link>
              <Link 
                href="/stories" 
                className="flex items-center space-x-2 text-secondary hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>News</span>
              </Link>
              {!session && (
                <>
                  <Link 
                    href="/auth/login" 
                    className="flex items-center space-x-2 text-accent font-bold py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Sign In</span>
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="flex items-center space-x-2 text-accent font-bold py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Register</span>
                  </Link>
                </>
              )}
              {session && (
                <Link 
                  href="/auth/logout" 
                  className="flex items-center space-x-2 text-accent font-bold py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Log Out</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 mb-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent drop-shadow-lg">Ethiopian Movies</h1>
            <Badge className="bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-full text-sm sm:text-base font-medium flex items-center">
              <Film className="h-4 w-4 mr-2" />
              {movies.length} films
            </Badge>
            {isAdmin && (
              <Link href="/admin/add-movie">
                <button className="mt-2 sm:mt-0 sm:ml-4 bg-accent text-secondary font-bold py-2 px-4 sm:px-5 rounded-xl shadow-lg hover:bg-primary hover:text-accent transition-all duration-200">
                  + Add Movie
                </button>
              </Link>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="w-full lg:w-80">
              <label className="block mb-2 font-medium text-secondary text-sm">Filter by Genre</label>
              <select
                className="w-full h-12 border border-accent rounded-xl px-4 py-3 bg-primary text-secondary focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200 text-sm"
                value={genreId}
                onChange={handleGenreChange}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            <form method="GET" action="/movies" className="flex flex-1 max-w-md">
              <input
                type="text"
                name="search"
                placeholder="Search by title..."
                defaultValue={search}
                className="flex-1 h-12 px-4 py-3 rounded-l-xl bg-primary border border-accent text-secondary focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200 text-sm"
              />
              <button
                type="submit"
                className="h-12 px-6 py-3 bg-accent text-secondary font-semibold rounded-r-xl shadow-lg hover:bg-primary hover:text-accent transition-all duration-200 text-sm"
              >
                Search
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-secondary/60 text-lg py-8">Loading...</div>
            ) : movies.length === 0 ? (
              <div className="col-span-full text-center text-secondary/60 text-lg py-8">No movies found.</div>
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
