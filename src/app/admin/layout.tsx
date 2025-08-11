import React from "react";
import Link from "next/link";
import { Film, BookOpen, Plus } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary">
      {/* Admin Navigation Header */}
      <nav className="sticky top-0 z-30 bg-primary border-b border-accent shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-accent drop-shadow" />
              <Link href="/" className="text-2xl font-extrabold tracking-tight text-secondary">
                Ethio<span className="text-accent">Flix</span>
              </Link>
              <span className="text-accent font-bold ml-4">Admin Panel</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/admin/add-movie" className="text-secondary hover:text-accent transition font-medium flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Movie
              </Link>
              <Link href="/admin/add-news" className="text-secondary hover:text-accent transition font-medium flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Add News
              </Link>
              <Link href="/stories" className="text-secondary hover:text-accent transition font-medium">Back to News</Link>
              <Link href="/movies" className="text-secondary hover:text-accent transition font-medium">Back to Movies</Link>
              <Link href="/" className="text-secondary hover:text-accent transition font-medium">Home</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-primary">
        {children}
      </main>
    </div>
  );
} 