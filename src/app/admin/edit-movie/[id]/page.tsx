import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditMovieForm from "@/components/EditMovieForm";

export default async function EditMoviePage({ params }: { params: { id: string } }) {
  const movie = await prisma.movie.findUnique({
    where: { id: params.id },
    include: { genres: true },
  });

  if (!movie) {
    notFound();
  }

  return <EditMovieForm movie={movie} />;
} 