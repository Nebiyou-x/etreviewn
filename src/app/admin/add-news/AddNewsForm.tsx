"use client";

import { useState, useRef } from "react";

export default function AddNewsForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: any = Object.fromEntries(formData.entries());
    data.tags = data.tags ? data.tags.split(",").map((t: string) => t.trim()) : [];
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess("News added successfully!");
        form.reset();
      } else {
        setError(result.error || "Failed to add news");
      }
    } catch (err) {
      setError("Failed to add news");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 max-w-lg mx-auto mt-8 bg-gray-900 p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">Add News</h2>
      {success && <div className="text-green-500">{success}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block mb-1">Title</label>
        <input name="title" required className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white" />
      </div>
      <div>
        <label className="block mb-1">Content</label>
        <textarea name="content" required rows={6} className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white" />
      </div>
      <div>
        <label className="block mb-1">Author</label>
        <input name="author" required className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white" />
      </div>
      <div>
        <label className="block mb-1">Image URL</label>
        <input name="imageUrl" className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white" />
      </div>
      <div>
        <label className="block mb-1">Tags (comma separated)</label>
        <input name="tags" className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white" />
      </div>
      <button type="submit" disabled={loading} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow">
        {loading ? "Adding..." : "Add News"}
      </button>
    </form>
  );
} 