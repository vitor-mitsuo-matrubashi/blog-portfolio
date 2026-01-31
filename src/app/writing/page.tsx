// ===========================================
// writing/page.tsx - Writing & Learning Blog Page
// Lists all blog posts with optional tag filtering
// Posts are loaded from MDX files in content/writing/
// ===========================================

import { Metadata } from "next";
import { allWritingPosts } from "contentlayer/generated";
// Import all writing posts processed by Contentlayer

import { AnimatedSection, PostCard } from "@/components";
import { FileText } from "lucide-react";

// ------------------------------------
// Page Metadata
// ------------------------------------
export const metadata: Metadata = {
  title: "Writing & Learning",
  description:
    "Blog posts about programming, data science, and finance. Step-by-step project breakdowns and tutorials.",
};

// ------------------------------------
// Writing Page Component
// ------------------------------------
export default function WritingPage() {
  // Sort posts by date (newest first)
  // new Date().getTime() converts date to milliseconds for comparison
  const sortedPosts = allWritingPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Extract all unique tags from all posts
  // This creates a list of all tags used across all posts
  const allTags = Array.from(
    // Array.from() creates an array from an iterable (like Set)
    new Set(
      // Set automatically removes duplicates
      sortedPosts.flatMap((post) => post.tags)
      // flatMap combines all tags arrays into one flat array
      // Example: [["react", "js"], ["python"]] becomes ["react", "js", "python"]
    )
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ====================================
          PAGE HEADER
          ==================================== */}
      <AnimatedSection className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Writing & Learning
        </h1>
        <p className="text-xl text-muted max-w-2xl">
          Step-by-step breakdowns of projects I&apos;ve built, tutorials, and
          lessons learned along the way. My goal is to document my learning
          journey and help others.
        </p>
      </AnimatedSection>

      {/* ====================================
          TAGS FILTER (Display Only)
          Shows all available tags
          Note: Full filtering would require client-side state (useState)
          For now, this just shows the tags that exist
          ==================================== */}
      {allTags.length > 0 && (
        <AnimatedSection className="mb-8" delay={0.1}>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted mr-2 py-1">Tags:</span>
            {allTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-card border border-border rounded-lg text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* ====================================
          POSTS GRID
          ==================================== */}
      <AnimatedSection delay={0.2}>
        {sortedPosts.length > 0 ? (
          // If there are posts, display them in a grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post, index) => (
              <PostCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                tags={post.tags}
                href={post.url}
                index={index}
              />
            ))}
          </div>
        ) : (
          // If no posts yet, show placeholder message
          <div className="text-center py-16">
            <FileText size={64} className="mx-auto text-muted/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No posts yet
            </h3>
            <p className="text-muted max-w-md mx-auto">
              Blog posts will appear here once you add MDX files to the{" "}
              <code className="px-2 py-1 bg-card rounded text-accent">
                content/writing/
              </code>{" "}
              folder.
            </p>
          </div>
        )}
      </AnimatedSection>

      {/* ====================================
          BLOG STATS (when posts exist)
          ==================================== */}
      {sortedPosts.length > 0 && (
        <AnimatedSection className="mt-16" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Posts */}
            <div className="p-4 bg-card rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-accent mb-1">
                {sortedPosts.length}
              </div>
              <div className="text-sm text-muted">Total Posts</div>
            </div>

            {/* Total Tags */}
            <div className="p-4 bg-card rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-accent mb-1">
                {allTags.length}
              </div>
              <div className="text-sm text-muted">Topics</div>
            </div>

            {/* Latest Post Year */}
            <div className="p-4 bg-card rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-accent mb-1">
                {new Date(sortedPosts[0].date).getFullYear()}
              </div>
              <div className="text-sm text-muted">Latest Year</div>
            </div>

            {/* First Post Year */}
            <div className="p-4 bg-card rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-accent mb-1">
                {new Date(sortedPosts[sortedPosts.length - 1].date).getFullYear()}
              </div>
              <div className="text-sm text-muted">Started</div>
            </div>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
