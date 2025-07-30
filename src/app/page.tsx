"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Star, Popcorn, Search, Calendar, Users, Home as HomeIcon, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { User, CalendarDays, MessageSquare } from "lucide-react";
import "./globals.css";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen w-full bg-primary relative overflow-x-hidden">
      {/* Main Content Layer */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-accent bg-primary">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              <Link href="/" className="text-xl sm:text-2xl font-bold text-secondary">
                Ethio<span className="text-accent">Flix</span>
              </Link>
            </div>
            
            {/* Centered Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-1 text-accent font-bold">
                  <HomeIcon className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link href="/movies" className="flex items-center space-x-1 text-secondary hover:text-accent transition-colors">
                  <Film className="h-4 w-4" />
                  <span>Movies</span>
                </Link>
                <Link href="/stories" className="flex items-center space-x-1 text-secondary hover:text-accent transition-colors">
                  <BookOpen className="h-4 w-4" />
                  <span>News</span>
                </Link>
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

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-accent bg-primary">
              <div className="px-4 py-2 space-y-2">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 text-secondary hover:text-accent transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HomeIcon className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link 
                  href="/movies" 
                  className="flex items-center space-x-2 text-secondary hover:text-accent transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Film className="h-4 w-4" />
                  <span>Movies</span>
                </Link>
                <Link 
                  href="/stories" 
                  className="flex items-center space-x-2 text-secondary hover:text-accent transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>News</span>
                </Link>
              </div>
            </div>
          )}
        </nav>
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-secondary">
              Discover & Review <span className="text-accent">Ethiopian</span> Cinema
            </h2>
            <p className="text-base sm:text-lg text-accent mb-4 font-semibold px-4">
              The largest and most comprehensive source for Ethiopian movie information, reviews, and news. Explore our vast collection and join the community!
            </p>
            <p className="text-lg sm:text-xl text-secondary mb-6 sm:mb-8 px-4">
              Track what you've watched. Share your thoughts. Find your next favorite Ethiopian film.
            </p>
            <div className="relative max-w-xl mx-auto px-4">
              <Input 
                placeholder="Search for Ethiopian movies..." 
                className="pl-12 py-4 sm:py-6"
              />
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-secondary" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-6 sm:py-8">
          <Tabs defaultValue="top-rated" className="w-full">
            <TabsList className="grid w-full grid-cols-1 bg-primary">
              <TabsTrigger value="top-rated" className="text-secondary">
                <Star className="h-4 w-4 mr-2" />
                Top Rated
              </TabsTrigger>
            </TabsList>

            {/* Top Rated Tab */}
            <TabsContent value="top-rated">
              {loadingTopList ? (
                <div className="text-secondary text-center py-8">Loading...</div>
              ) : topRatedList && topRatedList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
                  {topRatedList.map((movie: any) => (
                    <Card key={movie.id} className="bg-primary border-accent hover:border-accent transition-colors">
                      <CardHeader>
                        <div className="aspect-[2/3] bg-primary rounded-md overflow-hidden relative">
                          <img
                            src={movie.imageUrl || "/placeholder.jpg"}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4">
                        <CardTitle className="text-base sm:text-lg text-secondary">{movie.title}</CardTitle>
                        <CardDescription className="text-secondary">
                          {movie.releaseYear} • {movie.director}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {movie.genres && movie.genres.map((genre: any) => (
                            <Badge key={genre.id || genre.name} variant="primary" className="text-xs">
                              {genre.name}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                          <span className="text-secondary font-bold text-lg">{movie.avgRating ? movie.avgRating.toFixed(1) : "N/A"}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center p-3 sm:p-4">
                        <Button variant="primary" className="ml-auto">
                          Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-secondary text-center py-8">No top rated movies found.</div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Latest News Section */}
        <section className="container mx-auto px-4 py-6 sm:py-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-secondary flex items-center">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-accent" /> Latest News
          </h3>
          {loadingNews ? (
            <div className="text-secondary text-center py-8">Loading...</div>
          ) : latestNews && latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {latestNews.map((news: any) => (
                <Card key={news.id} className="bg-primary border-accent">
                  {news.imageUrl && (
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-primary rounded-t-md overflow-hidden">
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                  )}
                  <CardContent className="p-3 sm:p-4">
                    <CardTitle className="text-base sm:text-lg text-secondary line-clamp-2">{news.title}</CardTitle>
                    <CardDescription className="text-secondary mb-2">
                      By {news.author} • {new Date(news.createdAt).toLocaleDateString()}
                    </CardDescription>
                    <p className="text-secondary line-clamp-3">{news.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-secondary text-center py-8">No news found.</div>
          )}
        </section>

        {/* Popular Review Section */}
        <section className="container mx-auto px-4 py-6 sm:py-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-secondary flex items-center">
            <Star className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-accent" /> Popular Reviews
          </h3>
          {loadingPopularReview ? (
            <div className="text-secondary text-center py-8">Loading...</div>
          ) : popularReview && popularReview.id ? (
            <Card className="bg-primary border-accent border-2 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-accent w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold text-secondary">
                    {popularReview.user?.name?.[0] || "U"}
                  </div>
                  <div>
                    <div className="text-secondary font-semibold">{popularReview.user?.name || "Unknown User"}</div>
                    <div className="text-secondary text-sm">on <span className="font-semibold">{popularReview.movie?.title || "Unknown Movie"}</span></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                  <span className="text-secondary font-bold text-lg">{popularReview.rating}</span>
                  <span className="ml-4 text-secondary">{popularReview.likeCount} likes</span>
                </div>
                <p className="text-secondary text-base sm:text-lg">{popularReview.comment}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="text-secondary text-center py-8">No popular review found.</div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-accent py-6 sm:py-8 bg-primary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Film className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                <h4 className="text-lg sm:text-xl font-bold text-secondary">Ethio<span className="text-accent">Flix</span></h4>
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <Link href="#" className="text-secondary hover:text-accent transition-colors">About</Link>
                <Link href="#" className="text-secondary hover:text-accent transition-colors">Privacy</Link>
                <Link href="#" className="text-secondary hover:text-accent transition-colors">Terms</Link>
                <Link href="#" className="text-secondary hover:text-accent transition-colors">Contact</Link>
              </div>
            </div>
            <p className="text-center text-secondary mt-6 sm:mt-8">
              © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}