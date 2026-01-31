// ===========================================
// polyglot/[slug]/page.tsx - Individual Polyglot Post Page
// Dynamic route for viewing a single polyglot note
// Similar to writing/[slug]/page.tsx but with language badge
// ===========================================

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allPolyglotPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Globe } from "lucide-react";

import { AnimatedSection, MDXContent } from "@/components";

// ------------------------------------
// Language Display Configuration
// Maps language codes to full names with flags
// ------------------------------------
const languageDisplay: Record<string, { name: string; flag: string }> = {
  jp: { name: "Japanese", flag: "🇯🇵" },
  kr: { name: "Korean", flag: "🇰🇷" },
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Spanish", flag: "🇪🇸" },
};

// ------------------------------------
// Type Definition for Page Props
// ------------------------------------
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ------------------------------------
// generateStaticParams
// Pre-builds all polyglot post pages at build time
// ------------------------------------
export async function generateStaticParams() {
  return allPolyglotPosts.map((post) => ({
    slug: post.slug,
  }));
}

// ------------------------------------
// generateMetadata
// Dynamic metadata for each polyglot post
// ------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPolyglotPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const lang = languageDisplay[post.language];

  return {
    title: `${post.title} ${lang?.flag || ""}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

// ------------------------------------
// Polyglot Post Page Component
// ------------------------------------
export default async function PolyglotPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = allPolyglotPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.date), "MMMM dd, yyyy");
  const lang = languageDisplay[post.language];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ====================================
          BACK NAVIGATION
          ==================================== */}
      <AnimatedSection>
        <Link
          href="/polyglot"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Polyglot Notes
        </Link>
      </AnimatedSection>

      {/* ====================================
          POST HEADER
          ==================================== */}
      <AnimatedSection className="mb-12" delay={0.1}>
        {/* Language Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            <Globe size={16} />
            {lang?.flag} {lang?.name}
          </span>
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
        <MDXContent code={post.body.code} />
      </AnimatedSection>

      {/* ====================================
          POST FOOTER
          ==================================== */}
      <AnimatedSection className="mt-12 pt-8 border-t border-border" delay={0.3}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/polyglot"
            className="text-muted hover:text-accent transition-colors"
          >
            ← Back to all notes
          </Link>

          <div className="text-sm text-muted flex items-center gap-2">
            Written in {lang?.name} {lang?.flag}
          </div>
        </div>
      </AnimatedSection>
    </article>
  );
}
