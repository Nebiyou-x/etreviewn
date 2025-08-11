"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  tags: string[];
}

interface EditNewsFormProps {
  news: News;
}

export default function EditNewsForm({ news }: EditNewsFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [tags, setTags] = useState<string[]>(news.tags || []);
  const [newTag, setNewTag] = useState("");
  const router = useRouter();

  function addTag() {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  }

  function removeTag(tagToRemove: string) {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    (data as any).id = news.id;
    (data as any).tags = tags;
    
    try {
      const res = await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess("News updated successfully!");
        setTimeout(() => {
          router.push("/stories");
        }, 1500);
      } else {
        setError(result.error || "Failed to update news");
      }
    } catch (err) {
      setError("Failed to update news");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <h1 className="text-3xl font-bold mb-6">Edit News: {news.title}</h1>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input 
            name="title" 
            defaultValue={news.title}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea 
            name="content" 
            defaultValue={news.content}
            rows={6}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input 
            name="author" 
            defaultValue={news.author}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input 
            name="imageUrl" 
            defaultValue={news.imageUrl || ""}
            className="w-full border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="flex gap-2 mb-2">
            <input 
              type="text" 
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag..."
              className="flex-1 border border-accent rounded px-3 py-2 text-secondary placeholder-secondary bg-primary" 
            />
            <button 
              type="button" 
              onClick={addTag}
              className="bg-accent text-secondary px-4 py-2 rounded font-semibold hover:bg-primary hover:text-accent transition-all duration-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="bg-accent text-secondary px-4 py-2 rounded font-semibold hover:bg-primary hover:text-accent transition-all duration-200" 
            disabled={loading}
          >
            {loading ? "Updating..." : "Update News"}
          </button>
          <button 
            type="button" 
            onClick={() => router.push("/stories")}
            className="bg-secondary text-primary px-4 py-2 rounded font-semibold hover:bg-accent hover:text-secondary transition-all duration-200"
          >
            Cancel
          </button>
        </div>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
} 