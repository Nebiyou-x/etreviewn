import { Suspense } from "react";
import MoviesPageContent from "./MoviesPageContent";

export default function MoviesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoviesPageContent />
    </Suspense>
  );
}
