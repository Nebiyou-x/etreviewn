import React from "react";

export default function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#23283a] border-none shadow-xl rounded-xl animate-pulse flex flex-col"
        >
          <div className="aspect-[2/3] bg-gray-700 rounded-t-xl w-full" />
          <div className="p-5 flex-1 flex flex-col gap-3">
            <div className="h-6 bg-gray-600 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
            <div className="flex gap-2 mt-2">
              <div className="h-4 w-12 bg-gray-700 rounded-full" />
              <div className="h-4 w-12 bg-gray-700 rounded-full" />
            </div>
            <div className="h-5 w-16 bg-gray-700 rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
} 