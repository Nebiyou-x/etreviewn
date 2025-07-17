"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, CalendarDays, Film, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function StoriesPageClient({ initialNews, isAdmin }: { initialNews: any[]; isAdmin: boolean }) {
  const [news, setNews] = useState(initialNews);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;
    setDeletingId(id);
    const res = await fetch("/api/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);
    if (res.ok) {
      setNews((prev) => prev.filter((n) => n.id !== id));
    } else {
      alert("Failed to delete news");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-900/80 via-zinc-900/90 to-black/95">
      {/* Glassy Navbar */}
      <nav className="sticky top-0 z-30 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-orange-400 drop-shadow" />
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
              Ethio<span className="text-orange-400">Flix</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-zinc-200 hover:text-orange-400 transition font-medium">Home</Link>
            <Link href="/movies" className="text-zinc-200 hover:text-orange-400 transition font-medium">Movies</Link>
            <Link href="/stories" className="text-orange-400 font-bold">News</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400 drop-shadow-lg">News</h1>
            <Badge className="bg-orange-500/20 text-orange-200 border border-orange-400/30 px-3 py-1 rounded-full text-base font-medium flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              {news.length} stories
            </Badge>
            {isAdmin && (
              <Link href="/admin/add-news">
                <button className="ml-4 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white font-bold py-2 px-5 rounded-xl shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Add News
                </button>
              </Link>
            )}
          </div>
          <div className="flex space-x-3 w-full md:w-auto">
            <Button variant="secondary" className="text-orange-400 border-orange-400/40 hover:bg-orange-400/10 shadow-md">
              Filter
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((story: any) => (
            <Card
              key={story.id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:border-orange-400 transition-colors group rounded-2xl overflow-hidden"
            >
              <CardHeader>
                <h2 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                  {story.title}
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {story.imageUrl && (
                  <img src={story.imageUrl} alt={story.title} className="w-full h-44 object-cover rounded-xl mb-2 shadow-md" />
                )}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-orange-500/20 text-orange-200 border border-orange-400/30 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-zinc-300 text-sm">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-orange-400" />
                    {story.author}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-orange-400" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-zinc-100/90 leading-relaxed line-clamp-3">{story.content.slice(0, 120)}...</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-white/20 pt-4 gap-2 bg-white/5">
                <Link href={`/stories/${story.id}`} className="w-full ml-3">
                  <Button className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white font-bold shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Full Story
                  </Button>
                </Link>
                {isAdmin && (
                  <Button
                    variant="secondary"
                    className="ml-2 flex items-center"
                    onClick={() => handleDelete(story.id)}
                    disabled={deletingId === story.id}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {deletingId === story.id ? "Deleting..." : "Delete"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      {/* Glassy Footer */}
      <footer className="border-t border-white/20 py-8 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-orange-400" />
              <h4 className="text-xl font-bold">Ethio<span className="text-orange-400">Flix</span></h4>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-zinc-300 hover:text-orange-400">About</Link>
              <Link href="/privacy" className="text-zinc-300 hover:text-orange-400">Privacy</Link>
              <Link href="/terms" className="text-zinc-300 hover:text-orange-400">Terms</Link>
              <Link href="/contact" className="text-zinc-300 hover:text-orange-400">Contact</Link>
            </div>
          </div>
          <p className="text-center text-zinc-400 mt-8">
            © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
          </p>
        </div>
      </footer>
    </div>
  );
} 