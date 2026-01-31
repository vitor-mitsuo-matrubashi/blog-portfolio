// ===========================================
// writing/[slug]/page.tsx - Individual Writing Post Page
// Dynamic route that displays a single blog post
// [slug] is a dynamic segment - matches any URL like /writing/my-post
// ===========================================

import { Metadata } from "next";
import { notFound } from "next/navigation";
// notFound() shows the 404 page when a post doesn't exist

import Link from "next/link";
import { allWritingPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

import { AnimatedSection, MDXContent } from "@/components";

// ------------------------------------
// Type Definition for Page Props
// Next.js passes route parameters through props
// ------------------------------------
interface PageProps {
  params: Promise<{
    slug: string;
    // 'slug' matches the [slug] folder name
    // For /writing/my-first-post, slug = "my-first-post"
  }>;
}

// ------------------------------------
// generateStaticParams
// This function tells Next.js which pages to pre-build at build time
// Called "Static Site Generation" (SSG) - makes pages super fast
// ------------------------------------
export async function generateStaticParams() {
  // Return an array of all possible slug values
  // Next.js will pre-render a page for each one
  return allWritingPosts.map((post) => ({
    slug: post.slug,
  }));
}

// ------------------------------------
// generateMetadata
// Dynamically generates page metadata based on the post
// This runs at build time for each page
// ------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await the params since it's a Promise in Next.js 15
  const { slug } = await params;
  
  // Find the post matching this slug
  const post = allWritingPosts.find((p) => p.slug === slug);

  // If post doesn't exist, return basic metadata
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Return metadata based on post content
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

// ------------------------------------
// Post Page Component
// ------------------------------------
export default async function WritingPostPage({ params }: PageProps) {
  // Await params (Next.js 15 requirement)
  const { slug } = await params;
  
  // Find the post that matches the URL slug
  const post = allWritingPosts.find((p) => p.slug === slug);

  // If no matching post found, show 404 page
  if (!post) {
    notFound();
    // notFound() stops execution and renders the not-found.tsx page
  }

  // Format the publication date
  const formattedDate = format(new Date(post.date), "MMMM dd, yyyy");
  // "MMMM dd, yyyy" = "January 15, 2026"

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ====================================
          BACK NAVIGATION
          ==================================== */}
      <AnimatedSection>
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Writing
        </Link>
      </AnimatedSection>

      {/* ====================================
          POST HEADER
          ==================================== */}
      <AnimatedSection className="mb-12" delay={0.1}>
        {/* Post Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-accent/10 text-accent rounded-full"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* Post Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          {post.title}
        </h1>

        {/* Post Description */}
        <p className="text-xl text-muted mb-6">{post.description}</p>

        {/* Post Meta (Date) */}
        <div className="flex items-center gap-4 text-muted text-sm">
          <span className="inline-flex items-center gap-2">
            <Calendar size={16} className="text-accent" />
            {formattedDate}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mt-8" />
      </AnimatedSection>

      {/* ====================================
          POST CONTENT (MDX)
          ==================================== */}
      <AnimatedSection delay={0.2}>
        {/* 
          MDXContent renders the post body
          post.body.code contains the compiled MDX
        */}
        <MDXContent code={post.body.code} />
      </AnimatedSection>

      {/* ====================================
          POST FOOTER
          ==================================== */}
      <AnimatedSection className="mt-12 pt-8 border-t border-border" delay={0.3}>
        {/* Share/Navigation Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/writing"
            className="text-muted hover:text-accent transition-colors"
          >
            ← Back to all posts
          </Link>

          {/* You could add social share buttons here */}
          <div className="text-sm text-muted">
            Thanks for reading! 🙏
          </div>
        </div>
      </AnimatedSection>
    </article>
  );
}
