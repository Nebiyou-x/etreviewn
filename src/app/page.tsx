"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Star, Popcorn, Search, Calendar, Users, HomeIcon, Menu, X, BookOpen, TrendingUp, Award, Play, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { User, CalendarDays, MessageSquare } from 'lucide-react';
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

  const [stats, setStats] = useState<{ userCount: number; reviewCount: number } | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
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

            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login" className="text-accent font-bold hover:underline">Sign In</Link>
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
                  className="flex items-center space-x-2 text-accent font-bold py-2"
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
                <Link 
                  href="/auth/login" 
                  className="flex items-center space-x-2 text-accent font-bold py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          )}
        </nav>
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-secondary">
              Discover & Review <span className="text-accent">Ethiopian</span> Cinema
            </h2>
            <p className="text-lg sm:text-xl text-accent mb-6 font-semibold px-4">
              The largest and most comprehensive source for Ethiopian movie information, reviews, and news.
            </p>
            <p className="text-xl sm:text-2xl text-secondary mb-8 px-4">
              Track what you've watched. Share your thoughts. Find your next favorite Ethiopian film.
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/movies">
                <Button size="lg" className="bg-accent text-secondary hover:bg-primary hover:text-accent px-8 py-4 text-lg">
                  <Film className="h-5 w-5 mr-2" />
                  Explore Movies
                </Button>
              </Link>
              <Link href="/stories">
                <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-secondary px-8 py-4 text-lg">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Read News
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-primary border-accent text-center">
              <CardContent className="p-6">
                <Film className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-secondary mb-2">{allMovies.length}+</h3>
                <p className="text-secondary/70">Ethiopian Movies</p>
              </CardContent>
            </Card>
            <Card className="bg-primary border-accent text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-secondary mb-2">{stats ? stats.userCount : '...'}+</h3>
                <p className="text-secondary/70">Active Users</p>
              </CardContent>
            </Card>
            <Card className="bg-primary border-accent text-center">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-secondary mb-2">{stats ? stats.reviewCount : '...'}+</h3>
                <p className="text-secondary/70">Reviews & Ratings</p>
              </CardContent>
            </Card>
          </div>
          </section>

{/* Main Content */}
<section className="container mx-auto px-4 py-8">
  <Tabs defaultValue="top-rated" className="w-full">
  <TabsList className="w-full bg-primary border border-accent rounded-2xl overflow-hidden mb-6 flex">
  <TabsTrigger
    value="top-rated"
    className="w-full text-secondary font-semibold py-4 px-6 text-center data-[state=active]:bg-accent data-[state=active]:text-secondary transition-colors"
  >
    <div className="flex items-center justify-center gap-2">
      <Star className="h-5 w-5 text-accent data-[state=active]:text-secondary transition-colors" />
      <span>Top Rated</span>
    </div>
  </TabsTrigger>
</TabsList>


    {/* Top Rated Tab */}
    <TabsContent value="top-rated">
      {loadingTopList ? (
        <div className="text-secondary text-center py-8">Loading...</div>
      ) : topRatedList && topRatedList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topRatedList.map((movie: any) => (
            <Card
              key={movie.id}
              className="bg-primary border border-accent hover:border-accent transition-colors flex flex-col h-full"
            >
              <CardHeader className="p-0">
                <div className="aspect-[2/3] rounded-t-md overflow-hidden relative">
                  <img
                    src={movie.imageUrl || "/placeholder.jpg"}
                    alt={movie.title}
                    className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-1">
                <CardTitle className="text-base sm:text-lg text-secondary mb-1 line-clamp-2">
                  {movie.title}
                </CardTitle>
                <CardDescription className="text-secondary mb-2">
                  {movie.releaseYear} • {movie.director}
                </CardDescription>
                <div className="flex flex-wrap gap-1 mb-2">
                  {movie.genres?.map((genre: any) => (
                    <Badge
                      key={genre.id || genre.name}
                      variant="primary"
                      className="text-xs bg-accent/20 text-accent border border-accent/30"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                  <span className="text-accent font-bold text-lg">
                    {movie.avgRating ? movie.avgRating.toFixed(1) : "N/A"}
                  </span>
                </div>
                <div className="mt-auto" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="primary" className="w-full">
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-secondary text-center py-8">
          No top rated movies found.
        </div>
      )}
    </TabsContent>
  </Tabs>
</section>


        {/* Latest News Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center">
              <BookOpen className="h-6 w-6 mr-3 text-accent" /> Latest News
            </h3>
            <Link href="/stories">
              <Button variant="outline" className="text-accent border-accent hover:bg-accent hover:text-secondary">
                View All News
              </Button>
            </Link>
          </div>
          {loadingNews ? (
            <div className="text-secondary text-center py-8">Loading...</div>
          ) : latestNews && latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((news: any) => (
                <Card key={news.id} className="bg-primary border-accent hover:border-accent transition-colors">
                  {news.imageUrl && (
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-primary rounded-t-xl overflow-hidden">
                        <img
                          src={news.imageUrl || "/placeholder.svg"}
                          alt={news.title}
                          className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                  )}
                  <CardContent className="p-4">
                    <CardTitle className="text-lg text-secondary line-clamp-2">{news.title}</CardTitle>
                    <CardDescription className="text-secondary mb-2">
                      By {news.author} • {new Date(news.createdAt).toLocaleDateString()}
                    </CardDescription>
                    <p className="text-secondary line-clamp-3">{news.content}</p>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Link href={`/stories/${news.id}`} className="w-full">
                      <Button className="w-full bg-accent text-secondary hover:bg-primary hover:text-accent">
                        Read Full Story
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-secondary text-center py-8">No news found.</div>
          )}
        </section>

        {/* Popular Review Section */}
        <section className="container mx-auto px-4 py-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-secondary flex items-center">
            <Heart className="h-6 w-6 mr-3 text-accent" /> Popular Reviews
          </h3>
          {loadingPopularReview ? (
            <div className="text-secondary text-center py-8">Loading...</div>
          ) : popularReview && popularReview.id ? (
            <Card className="bg-primary border-accent border-2 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-accent w-12 h-12 flex items-center justify-center text-xl font-bold text-secondary">
                    {popularReview.user?.name?.[0] || "U"}
                  </div>
                  <div>
                    <div className="text-secondary font-semibold">{popularReview.user?.name || "Unknown User"}</div>
                    <div className="text-secondary text-sm">on <span className="font-semibold">{popularReview.movie?.title || "Unknown Movie"}</span></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
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
        <footer className="border-t border-accent py-8 bg-primary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Film className="h-6 w-6 text-accent" />
                <h4 className="text-xl font-bold text-secondary">Ethio<span className="text-accent">Flix</span></h4>
              </div>
              <div className="flex space-x-6">
                <Link href="/about" className="text-secondary hover:text-accent transition-colors">About</Link>
                <Link href="/privacy" className="text-secondary hover:text-accent transition-colors">Privacy</Link>
                <Link href="/terms" className="text-secondary hover:text-accent transition-colors">Terms</Link>
                <Link href="/contact" className="text-secondary hover:text-accent transition-colors">Contact</Link>
              </div>
            </div>
            <p className="text-center text-secondary mt-8">
              © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
