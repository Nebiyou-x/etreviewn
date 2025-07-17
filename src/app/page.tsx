"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Star, Popcorn, Search, Calendar, Users, Home as HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { User, CalendarDays, MessageSquare } from "lucide-react";
import "./globals.css";

export default function Home() {
  const trendingMovies = [
    
  ];

  // Top Rated Movie (dynamic fetch)
  const [topRatedMovie, setTopRatedMovie] = useState<any>(null);
  const [loadingTop, setLoadingTop] = useState(true);

  useEffect(() => {
    setLoadingTop(true);
    fetch("/api/movies/top-rated")
      .then((res) => res.json())
      .then((data) => {
        setTopRatedMovie(data);
        setLoadingTop(false);
      })
      .catch(() => setLoadingTop(false));
  }, []);

  // Add after the top rated movie state
  const [topRatedList, setTopRatedList] = useState<any[]>([]);
  const [loadingTopList, setLoadingTopList] = useState(true);

  useEffect(() => {
    setLoadingTopList(true);
    fetch("/api/movies/top-rated-list")
      .then((res) => res.json())
      .then((data) => {
        setTopRatedList(data);
        setLoadingTopList(false);
      })
      .catch(() => setLoadingTopList(false));
  }, []);

  // Add after the top rated list state
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    setLoadingNews(true);
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setLatestNews(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoadingNews(false);
      })
      .catch(() => setLoadingNews(false));
  }, []);

  // Add after the latest news state
  const [popularReview, setPopularReview] = useState<any>(null);
  const [loadingPopularReview, setLoadingPopularReview] = useState(true);

  useEffect(() => {
    setLoadingPopularReview(true);
    fetch("/api/reviews/popular")
      .then((res) => res.json())
      .then((data) => {
        setPopularReview(data);
        setLoadingPopularReview(false);
      })
      .catch(() => setLoadingPopularReview(false));
  }, []);

  const recentReviews = [
   
  ];

  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [loadingAllMovies, setLoadingAllMovies] = useState(true);

  useEffect(() => {
    setLoadingAllMovies(true);
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setAllMovies(data);
        setLoadingAllMovies(false);
      })
      .catch(() => setLoadingAllMovies(false));
  }, []);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-x-hidden">
      {/* Midnight Mist Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
          `,
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
      {/* Main Content Layer */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-gray-700">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-yellow-500" />
              <Link href="/" className="text-2xl font-bold text-white">Ethio<span className="text-yellow-500">Flix</span></Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-1 text-gray-200 hover:text-white">
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link href="/movies" className="flex items-center space-x-1 text-gray-200 hover:text-white">
                <Film className="h-4 w-4" />
                <span>Movies</span>
              </Link>
              <Link href="/stories" className="flex items-center space-x-1 text-gray-200 hover:text-white">
                <BookOpen className="h-4 w-4" />
                <span>News</span>
              </Link>
            </div>
          </div>
        </nav>
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Discover & Review <span className="text-yellow-500">Ethiopian</span> Cinema
            </h2>
            <p className="text-lg text-yellow-300 mb-4 font-semibold">
              The largest and most comprehensive source for Ethiopian movie information, reviews, and news. Explore our vast collection and join the community!
            </p>
            <p className="text-xl text-gray-200 mb-8">
              Track what you've watched. Share your thoughts. Find your next favorite Ethiopian film.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Input 
                placeholder="Search for Ethiopian movies..." 
                className="pl-12 py-6 bg-gray-800 border-gray-700 focus:border-yellow-500 text-white placeholder-gray-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8">
          <Tabs defaultValue="top-rated" className="w-full">
            <TabsList className="grid w-full grid-cols-1 bg-gray-800">
              <TabsTrigger value="top-rated" className="data-[state=active]:bg-gray-700 text-white">
                <Star className="h-4 w-4 mr-2" />
                Top Rated
              </TabsTrigger>
            </TabsList>

            {/* Top Rated Tab */}
            <TabsContent value="top-rated">
              {loadingTopList ? (
                <div className="text-white">Loading...</div>
              ) : topRatedList && topRatedList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                  {topRatedList.map((movie: any) => (
                    <Card key={movie.id} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
                      <CardHeader>
                        <div className="aspect-[2/3] bg-gray-700 rounded-md overflow-hidden relative">
                          <img
                            src={movie.imageUrl || "/placeholder.jpg"}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg text-white">{movie.title}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {movie.releaseYear} • {movie.director}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {movie.genres && movie.genres.map((genre: any) => (
                            <Badge key={genre.id || genre.name} variant="primary" className="text-xs bg-gray-700 text-white">
                              {genre.name}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-white font-bold text-lg">{movie.avgRating ? movie.avgRating.toFixed(1) : "N/A"}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center">
                        <Button variant="primary" className="ml-auto">
                          Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-white">No top rated movies found.</div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Latest News Section */}
        <section className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-yellow-500" /> Latest News
          </h3>
          {loadingNews ? (
            <div className="text-white">Loading...</div>
          ) : latestNews && latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((news: any) => (
                <Card key={news.id} className="bg-gray-800 border-gray-700">
                  {news.imageUrl && (
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-gray-700 rounded-t-md overflow-hidden">
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                  )}
                  <CardContent className="p-4">
                    <CardTitle className="text-lg text-white line-clamp-2">{news.title}</CardTitle>
                    <CardDescription className="text-gray-300 mb-2">
                      By {news.author} • {new Date(news.createdAt).toLocaleDateString()}
                    </CardDescription>
                    <p className="text-gray-400 line-clamp-3">{news.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-white">No news found.</div>
          )}
        </section>

        {/* Popular Review Section */}
        <section className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" /> Popular Reviews
          </h3>
          {loadingPopularReview ? (
            <div className="text-white">Loading...</div>
          ) : popularReview && popularReview.id ? (
            <Card className="bg-gray-800 border-yellow-500 border-2 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-700 w-12 h-12 flex items-center justify-center text-xl font-bold text-white">
                    {popularReview.user?.name?.[0] || "U"}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{popularReview.user?.name || "Unknown User"}</div>
                    <div className="text-gray-400 text-sm">on <span className="font-semibold">{popularReview.movie?.title || "Unknown Movie"}</span></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-white font-bold text-lg">{popularReview.rating}</span>
                  <span className="ml-4 text-gray-400">{popularReview.likeCount} likes</span>
                </div>
                <p className="text-gray-200 text-lg">{popularReview.comment}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="text-white">No popular review found.</div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-700 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Film className="h-6 w-6 text-yellow-500" />
                <h4 className="text-xl font-bold text-white">Ethio<span className="text-yellow-500">Flix</span></h4>
              </div>
              <div className="flex space-x-6">
                <Link href="#" className="text-gray-300 hover:text-white">About</Link>
                <Link href="#" className="text-gray-300 hover:text-white">Privacy</Link>
                <Link href="#" className="text-gray-300 hover:text-white">Terms</Link>
                <Link href="#" className="text-gray-300 hover:text-white">Contact</Link>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-8">
              © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}