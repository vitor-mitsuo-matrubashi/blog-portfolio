// ===========================================
// not-found.tsx - Custom 404 Page
// This page is shown when a user visits a URL that doesn't exist
// Provides a friendly message and link back to home
// ===========================================

"use client";
// "use client" is required because we use onClick event handler

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

// ------------------------------------
// Not Found Page Component
// ------------------------------------
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Large 404 Text */}
        <h1 className="text-8xl font-bold text-accent mb-4">404</h1>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>

        <p className="text-muted max-w-md mx-auto mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:border-accent transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
