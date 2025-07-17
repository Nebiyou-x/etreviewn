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
      <div className="min-h-screen bg-gradient-to-br from-orange-900/80 via-zinc-900/90 to-black/95 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-orange-400">Story not found</h1>
          <Link href="/stories">
            <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white font-bold shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200">
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-900/80 via-zinc-900/90 to-black/95">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/stories">
          <Button
            variant="secondary"
            className="mb-6 text-orange-400 border-orange-400/40 bg-black/40 hover:bg-orange-400/10 shadow-md"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-extrabold text-orange-400 mb-2">
                  {story.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-zinc-300">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-orange-400" />
                    {story.author}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-orange-400" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {story.imageUrl && (
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-64 object-cover rounded-xl mb-2 shadow-lg"
                  />
                )}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-orange-500/20 text-orange-200 border border-orange-400/30 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="prose prose-invert max-w-none text-zinc-100/90 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{
                    __html: story.content.replace(/\n/g, "<br />"),
                  }}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-orange-400">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-orange-400/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-200">{story.author}</h4>
                    <p className="text-sm text-zinc-400">Film Journalist</p>
                  </div>
                </div>
                <p className="mt-4 text-zinc-200">
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
