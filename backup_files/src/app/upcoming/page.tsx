import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Star, Calendar, Home as HomeIcon, BookOpen, Users, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function UpcomingPage() {
  const upcomingMovies = [
    {
      id: 1,
      title: "Fikir Alema",
      releaseDate: "December 2023",
      director: "Yidnekachew Shumete",
      description: "A romantic drama exploring modern relationships in Addis Ababa",
      genres: ["Romance", "Drama"],
      status: "Post-production"
    },
    {
      id: 2,
      title: "The Red Sea Diving Resort",
      releaseDate: "2024",
      director: "Mikias Wolde",
      description: "Historical drama about Operation Brothers in the 1980s",
      genres: ["History", "Drama"],
      status: "Filming"
    },
    {
      id: 3,
      title: "Selam",
      releaseDate: "TBA 2024",
      director: "Hermon Hailay",
      description: "Coming-of-age story set in rural Ethiopia",
      genres: ["Drama", "Coming-of-age"],
      status: "Pre-production"
    },
    {
      id: 4,
      title: "Addis Noir",
      releaseDate: "November 2023",
      director: "Mikael Awake",
      description: "Crime thriller set in the streets of Addis Ababa",
      genres: ["Thriller", "Crime"],
      status: "Post-production"
    },
    {
      id: 5,
      title: "Lalibela",
      releaseDate: "2024",
      director: "Haile Gerima",
      description: "Historical epic about the construction of the rock-hewn churches",
      genres: ["History", "Epic"],
      status: "Announced"
    },
    {
      id: 6,
      title: "Kibur",
      releaseDate: "January 2024",
      director: "Yohannes Feleke",
      description: "Family drama about generational conflicts",
      genres: ["Drama", "Family"],
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-yellow-500" />
            <Link href="/" className="text-2xl font-bold">Ethio<span className="text-yellow-500">Flix</span></Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/movies" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <Film className="h-4 w-4" />
              <span>Movies</span>
            </Link>
            <Link href="/stories" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <BookOpen className="h-4 w-4" />
              <span>News</span>
            </Link>
          </div>
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-yellow-500">Upcoming</span> Ethiopian Movies
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Discover the most anticipated Ethiopian films in production and coming soon to theaters
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingMovies.map((movie) => (
            <Card key={movie.id} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{movie.title}</CardTitle>
                  <Badge variant="outline" className={
                    movie.status === "Completed" ? "bg-green-900 text-green-300" :
                    movie.status === "Post-production" ? "bg-blue-900 text-blue-300" :
                    movie.status === "Filming" ? "bg-yellow-900 text-yellow-300" :
                    "bg-gray-700 text-gray-300"
                  }>
                    {movie.status}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  Directed by {movie.director}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{movie.description}</p>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <Badge key={genre} variant="secondary" className="text-xs bg-gray-700">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-yellow-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{movie.releaseDate}</span>
                </div>
                <Button variant="outline" size="sm" className="border-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Remind Me
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Film className="h-6 w-6 text-yellow-500" />
              <h4 className="text-xl font-bold">Ethio<span className="text-yellow-500">Flix</span></h4>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">About</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-8">
            © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
          </p>
        </div>
      </footer>
    </div>
  );
}