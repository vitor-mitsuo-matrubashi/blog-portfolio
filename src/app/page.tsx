// ===========================================
// page.tsx - Home Page Component
// This is the landing page of your portfolio
// Shows hero section, social links, and recent posts
// ===========================================

import Link from "next/link";
import { Github, Linkedin, ArrowRight, FileText, Code, Globe } from "lucide-react";
// Import icons for social links and feature cards

// Import Contentlayer generated data
// This will be available after running the dev server
// Contentlayer processes MDX files and generates typed data
import { allWritingPosts, allPolyglotPosts } from "contentlayer/generated";

import { AnimatedSection, PostCard } from "@/components";
// Import our reusable components

// ------------------------------------
// Feature Cards Data
// Highlights the main sections of the portfolio
// ------------------------------------
const features = [
  {
    title: "Writing & Learning",
    description: "Step-by-step tutorials and project breakdowns",
    icon: FileText,
    href: "/writing",
    color: "text-blue-500",
  },
  {
    title: "Projects",
    description: "Showcasing my technical work and experiments",
    icon: Code,
    href: "/projects",
    color: "text-green-500",
  },
  {
    title: "Polyglot Notes",
    description: "Language practice in Japanese, Korean, English & Spanish",
    icon: Globe,
    href: "/polyglot",
    color: "text-purple-500",
  },
];

// ------------------------------------
// Social Links Configuration
// Replace with your actual profile URLs
// ------------------------------------
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/vitor-mitsuo-matrubashi",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vitomit/",
    icon: Linkedin,
  },
];

// ------------------------------------
// Home Page Component
// This is a Server Component (no "use client")
// Server Components can directly access data and are faster
// ------------------------------------
export default function Home() {
  // Get the 3 most recent posts from each category
  // .sort() sorts by date (newest first)
  // .slice(0, 3) takes only the first 3 items
  const recentWritingPosts = allWritingPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const recentPolyglotPosts = allPolyglotPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    // Main container with max width and padding
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ====================================
          HERO SECTION
          The first thing visitors see
          ==================================== */}
      <AnimatedSection className="text-center py-16 md:py-24">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Hi, I&apos;m{" "}
          <span className="text-accent">Vitor Mitsuo</span>
          {/* 
            &apos; is the HTML entity for apostrophe (')
            Required in JSX to avoid parsing issues
            Replace "Your Name" with your actual name
          */}
        </h1>

        {/* Subtitle/Tagline */}
        <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-8">
          Developer passionate about{" "}
          <span className="text-foreground font-medium">programming</span>,{" "}
          <span className="text-foreground font-medium">data</span>, and{" "}
          <span className="text-foreground font-medium">finance</span>.
          Building things and sharing knowledge.
        </p>

        {/* ------------------------------------
            Social Links
            Clickable icons for GitHub and LinkedIn
            ------------------------------------ */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-card border border-border hover:border-accent hover:text-accent transition-all duration-200"
              aria-label={link.name}
            >
              <link.icon size={24} />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors inline-flex items-center justify-center gap-2"
          >
            View My Projects
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:border-accent transition-colors inline-flex items-center justify-center"
          >
            About Me
          </Link>
        </div>
      </AnimatedSection>

      {/* ====================================
          FEATURE CARDS SECTION
          Quick links to main sections
          ==================================== */}
      <AnimatedSection className="py-12" delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group p-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300"
            >
              {/* Feature Icon */}
              <feature.icon
                size={32}
                className={`${feature.color} mb-4 transition-transform group-hover:scale-110`}
              />

              {/* Feature Title */}
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-sm text-muted">{feature.description}</p>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      {/* ====================================
          RECENT WRITING POSTS
          Shows latest blog posts
          ==================================== */}
      {recentWritingPosts.length > 0 && (
        <AnimatedSection className="py-12" delay={0.3}>
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Recent Writing
            </h2>
            <Link
              href="/writing"
              className="text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentWritingPosts.map((post, index) => (
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
        </AnimatedSection>
      )}

      {/* ====================================
          RECENT POLYGLOT POSTS
          Shows latest language practice posts
          ==================================== */}
      {recentPolyglotPosts.length > 0 && (
        <AnimatedSection className="py-12" delay={0.4}>
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Recent Polyglot Notes
            </h2>
            <Link
              href="/polyglot"
              className="text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPolyglotPosts.map((post, index) => (
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
        </AnimatedSection>
      )}
    </div>
  );
}
