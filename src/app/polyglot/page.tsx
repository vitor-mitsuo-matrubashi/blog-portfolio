// ===========================================
// polyglot/page.tsx - Polyglot Notes Page
// Lists language practice posts with language filtering
// Uses client-side state for the language filter
// ===========================================

"use client";
// "use client" is required because we use useState for filtering
// This makes the component interactive in the browser

import { useState } from "react";
// useState hook for managing the selected language filter

import { allPolyglotPosts } from "contentlayer/generated";
import { AnimatedSection, PostCard, LanguageFilter } from "@/components";
import { Globe } from "lucide-react";

// ------------------------------------
// Polyglot Page Component
// Uses client-side filtering for language selection
// ------------------------------------
export default function PolyglotPage() {
  // State to track the currently selected language
  // "all" means show all languages
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  // Sort posts by date (newest first)
  const sortedPosts = allPolyglotPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter posts based on selected language
  // If "all" is selected, show all posts
  // Otherwise, only show posts matching the selected language
  const filteredPosts =
    selectedLanguage === "all"
      ? sortedPosts
      : sortedPosts.filter((post) => post.language === selectedLanguage);

  // Count posts by language for the stats section
  // reduce() iterates through all posts and builds a count object
  const languageCounts = sortedPosts.reduce(
    (acc, post) => {
      // acc is the accumulator (the object we're building)
      // For each post, increment the count for its language
      acc[post.language] = (acc[post.language] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
    // Starting value: empty object
    // Record<string, number> is TypeScript for {[key: string]: number}
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ====================================
          PAGE HEADER
          ==================================== */}
      <AnimatedSection className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Polyglot Notes
        </h1>
        <p className="text-xl text-muted max-w-2xl">
          Random thoughts and daily observations written in different languages.
          A way to practice Japanese, Korean, English, and Spanish without
          forgetting them!
        </p>
      </AnimatedSection>

      {/* ====================================
          LANGUAGE FILTER
          ==================================== */}
      <AnimatedSection className="mb-8" delay={0.1}>
        <div className="p-4 bg-card rounded-xl border border-border">
          <LanguageFilter
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            // When user clicks a language, setSelectedLanguage is called
            // This updates the state and React re-renders with filtered posts
          />
        </div>
      </AnimatedSection>

      {/* ====================================
          RESULTS COUNT
          Shows how many posts match the current filter
          ==================================== */}
      <AnimatedSection className="mb-6" delay={0.15}>
        <p className="text-sm text-muted">
          Showing{" "}
          <span className="text-foreground font-medium">
            {filteredPosts.length}
          </span>{" "}
          {filteredPosts.length === 1 ? "post" : "posts"}
          {selectedLanguage !== "all" && (
            <span>
              {" "}
              in{" "}
              <span className="text-accent">
                {selectedLanguage === "jp" && "Japanese 🇯🇵"}
                {selectedLanguage === "kr" && "Korean 🇰🇷"}
                {selectedLanguage === "en" && "English 🇺🇸"}
                {selectedLanguage === "es" && "Spanish 🇪🇸"}
              </span>
            </span>
          )}
        </p>
      </AnimatedSection>

      {/* ====================================
          POSTS GRID
          ==================================== */}
      <AnimatedSection delay={0.2}>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                language={post.language}
                href={post.url}
                index={index}
              />
            ))}
          </div>
        ) : (
          // Empty state - no posts match the filter
          <div className="text-center py-16">
            <Globe size={64} className="mx-auto text-muted/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {sortedPosts.length === 0
                ? "No posts yet"
                : "No posts in this language"}
            </h3>
            <p className="text-muted max-w-md mx-auto">
              {sortedPosts.length === 0 ? (
                <>
                  Polyglot notes will appear here once you add MDX files to the{" "}
                  <code className="px-2 py-1 bg-card rounded text-accent">
                    content/polyglot/
                  </code>{" "}
                  folder.
                </>
              ) : (
                "Try selecting a different language or view all posts."
              )}
            </p>
          </div>
        )}
      </AnimatedSection>

      {/* ====================================
          LANGUAGE STATS
          Shows post count per language
          ==================================== */}
      {sortedPosts.length > 0 && (
        <AnimatedSection className="mt-16" delay={0.3}>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Posts by Language
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Japanese Stats */}
            <div className="p-4 bg-card rounded-xl border border-border text-center">
              <div className="text-2xl mb-1">🇯🇵</div>
              <div className="text-2xl font-bold text-accent">
                {languageCounts["jp"] || 0}
              </div>
              <div className="text-xs text-muted">Japanese</div>
            </div>

            {/* Korean Stats */}
            <div className="p-4 bg-card rounded-xl border border-border text-center">
              <div className="text-2xl mb-1">🇰🇷</div>
              <div className="text-2xl font-bold text-accent">
                {languageCounts["kr"] || 0}
              </div>
              <div className="text-xs text-muted">Korean</div>
            </div>

            {/* English Stats */}
            <div className="p-4 bg-card rounded-xl border border-border text-center">
              <div className="text-2xl mb-1">🇺🇸</div>
              <div className="text-2xl font-bold text-accent">
                {languageCounts["en"] || 0}
              </div>
              <div className="text-xs text-muted">English</div>
            </div>

            {/* Spanish Stats */}
            <div className="p-4 bg-card rounded-xl border border-border text-center">
              <div className="text-2xl mb-1">🇪🇸</div>
              <div className="text-2xl font-bold text-accent">
                {languageCounts["es"] || 0}
              </div>
              <div className="text-xs text-muted">Spanish</div>
            </div>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
