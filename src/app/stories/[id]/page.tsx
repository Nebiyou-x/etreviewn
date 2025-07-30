export const runtime = 'nodejs'; // ✅ Fixes the params.id error on Edge

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  User,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function StoryDetailsPage({ params }: { params: { id: string } }) {
  const story = await prisma.news.findUnique({
    where: { id: params.id },
  });

  if (!story) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-accent">Story not found</h1>
          <Link href="/stories">
            <Button className="bg-accent text-secondary font-bold shadow-lg hover:bg-primary hover:text-accent transition-all duration-200">
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-primary">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <Link href="/stories">
          <Button
            variant="secondary"
            className="mb-6 text-accent border-accent bg-primary hover:bg-accent hover:text-secondary shadow-md"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          <div className="lg:col-span-2">
            <Card className="bg-primary border-accent shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent mb-2">
                  {story.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-secondary/80">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-accent" />
                    {story.author}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-accent" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {story.imageUrl && (
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-48 sm:h-64 object-cover rounded-xl mb-2 shadow-lg"
                  />
                )}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-1 bg-accent/20 text-accent border border-accent/30 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="prose prose-invert max-w-none text-secondary/90 leading-relaxed text-base sm:text-lg"
                  dangerouslySetInnerHTML={{
                    __html: story.content.replace(/\n/g, "<br />"),
                  }}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-primary border-accent shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-accent">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-accent">{story.author}</h4>
                    <p className="text-sm text-secondary/60">Film Journalist</p>
                  </div>
                </div>
                <p className="mt-4 text-secondary/80">
                  {story.author} has been covering Ethiopian cinema for over 5 years, with bylines in multiple international film publications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
