import { Genre } from "@/generated/prisma";
import { useState, useEffect } from "react";



type MovieFormProps = {
  movieId: string;
};

export default function MovieForm({ movieId }: MovieFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movieData, setMovieData] = useState<any>(null);

  useEffect(() => {
    if (movieId) {
      fetch(`/api/movies/${movieId}`)
        .then((res) => res.json())
        .then((data) => setMovieData(data))
        .catch((err) => setError("Failed to load movie data"));
    }
  }, [movieId]);

 
}