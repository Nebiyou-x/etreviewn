"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, CalendarDays, Film, Plus, Trash2, Menu, X } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function StoriesPageClient({ initialNews, isAdmin }: { initialNews: any[]; isAdmin: boolean }) {
  const [news, setNews] = useState(initialNews);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen w-full bg-primary">
      {/* Glassy Navbar */}
      <nav className="sticky top-0 z-30 bg-primary border-b border-accent shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-accent drop-shadow" />
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-secondary">
              Ethio<span className="text-accent">Flix</span>
            </Link>
          </div>
          
          {/* Centered Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-secondary hover:text-accent transition font-medium">Home</Link>
              <Link href="/movies" className="text-secondary hover:text-accent transition font-medium">Movies</Link>
              <Link href="/stories" className="text-accent font-bold">News</Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-secondary hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-accent drop-shadow-lg">News</h1>
            <Badge className="bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-full text-base font-medium flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              {news.length} stories
            </Badge>
            {isAdmin && (
              <Link href="/admin/add-news">
                <button className="ml-4 bg-accent text-secondary font-bold py-2 px-5 rounded-xl shadow-lg hover:bg-primary hover:text-accent transition-all duration-200 flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Add News
                </button>
              </Link>
            )}
          </div>
         
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((story: any) => (
            <Card
              key={story.id}
              className="bg-primary border border-accent shadow-xl hover:border-accent transition-colors group rounded-2xl overflow-hidden flex flex-col h-full"
            >
              <CardHeader>
                <h2 className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors mb-2">
                  {story.title}
                </h2>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                {story.imageUrl && (
                  <img src={story.imageUrl} alt={story.title} className="w-full h-44 object-cover rounded-xl mb-2 shadow-md" />
                )}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-accent/20 text-accent border border-accent/30 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-secondary text-sm">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-accent" />
                    {story.author}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-accent" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-secondary leading-relaxed line-clamp-3">{story.content.slice(0, 120)}...</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-accent pt-4 gap-2 bg-primary mt-auto">
                <Link href={`/stories/${story.id}`} className="w-full">
                  <Button className="w-full bg-accent text-secondary font-bold shadow-lg hover:bg-primary hover:text-accent transition-all duration-200">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Full Story
                  </Button>
                </Link>
                {isAdmin && (
                  <Button
                    variant="secondary"
                    className="flex items-center"
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
      <footer className="border-t border-accent py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-accent" />
              <h4 className="text-xl font-bold">Ethio<span className="text-accent">Flix</span></h4>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-secondary hover:text-accent">About</Link>
              <Link href="/privacy" className="text-secondary hover:text-accent">Privacy</Link>
              <Link href="/terms" className="text-secondary hover:text-accent">Terms</Link>
              <Link href="/contact" className="text-secondary hover:text-accent">Contact</Link>
            </div>
          </div>
          <p className="text-center text-secondary mt-8">
            © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
          </p>
        </div>
      </footer>
    </div>
  );
} 