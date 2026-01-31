// ===========================================
// PostCard.tsx - Blog Post Preview Card Component
// This reusable component displays a preview of a blog post
// Used in Writing & Learning and Polyglot Notes pages
// ===========================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
// Calendar icon for date, Clock for read time, Arrow for "read more"

import { format } from "date-fns";
// date-fns is a library for formatting dates
// format() converts Date objects to readable strings

// ------------------------------------
// Props Interface
// Defines what data this component expects to receive
// Props are like function parameters for React components
// ------------------------------------
interface PostCardProps {
  title: string;              // Post title
  description: string;        // Short summary of the post
  date: string;               // Publication date (ISO string)
  slug: string;               // URL-friendly identifier (e.g., "my-first-post")
  tags?: string[];            // Optional array of tags
  language?: string;          // Optional language code for Polyglot posts
  href: string;               // Full URL path to the post
  index?: number;             // Position in list (for stagger animation)
}

// ------------------------------------
// Language Labels Mapping
// Converts language codes to display names with flags
// ------------------------------------
const languageLabels: Record<string, string> = {
  jp: "🇯🇵 日本語",      // Japanese
  kr: "🇰🇷 한국어",      // Korean
  en: "🇺🇸 English",    // English
  es: "🇪🇸 Español",    // Spanish
};

// ------------------------------------
// Animation Variants
// Defines how the card animates when appearing
// ------------------------------------
const cardVariants = {
  // Starting state - invisible and slightly below
  hidden: {
    opacity: 0,
    y: 20,
  },
  // Final state - visible and in place
  visible: (index: number) => ({
    // 'custom' prop passes the index to calculate delay
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1, // Each card appears 0.1s after the previous
      ease: "easeOut",
    },
  }),
};

// ------------------------------------
// PostCard Component
// Receives data through props (destructured in function parameters)
// ------------------------------------
export default function PostCard({
  title,
  description,
  date,
  slug,
  tags,
  language,
  href,
  index = 0,
}: PostCardProps) {
  // Format the date from ISO string to readable format
  // "MMM dd, yyyy" = "Jan 15, 2026"
  const formattedDate = format(new Date(date), "MMM dd, yyyy");

  return (
    // motion.article for animated semantic HTML article element
    // 'custom' prop passes index to the animation variants
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      // whileHover adds animation when mouse hovers over card
      whileHover={{ y: -4 }}
      // Card lifts up 4px on hover
      className="group"
      // 'group' class lets child elements react to parent hover
      // Example: group-hover:text-accent changes color when card is hovered
    >
      {/* Link wrapper - entire card is clickable */}
      <Link href={href}>
        {/* 
          Card container with styling
          - bg-card: background color from our theme
          - rounded-xl: large border radius (12px)
          - p-6: padding of 1.5rem
          - border: 1px border
          - hover:border-accent/50: border becomes red on hover
          - transition-all: smooth transition for all changes
        */}
        <div className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300">
          {/* ------------------------------------
              Header Section (Tags/Language + Date)
              flex-wrap allows items to wrap on small screens
              ------------------------------------ */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Show language badge if this is a Polyglot post */}
            {language && (
              <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent font-medium">
                {languageLabels[language] || language}
                {/* Use mapping if exists, otherwise show raw code */}
              </span>
            )}

            {/* Show tags if provided */}
            {tags &&
              tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-card-hover text-muted"
                >
                  {tag}
                </span>
              ))}

            {/* Date with calendar icon */}
            <div className="flex items-center gap-1 text-xs text-muted ml-auto">
              {/* ml-auto pushes this to the right side */}
              <Calendar size={12} />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* ------------------------------------
              Title
              group-hover:text-accent changes color when card is hovered
              ------------------------------------ */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
            {title}
          </h3>

          {/* ------------------------------------
              Description
              line-clamp-2 limits text to 2 lines with ellipsis (...)
              ------------------------------------ */}
          <p className="text-muted text-sm line-clamp-2 mb-4">{description}</p>

          {/* ------------------------------------
              Read More Link
              Shows arrow that slides right on hover
              ------------------------------------ */}
          <div className="flex items-center gap-2 text-accent text-sm font-medium">
            <span>Read more</span>
            {/* Arrow icon that moves right on card hover */}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              // translate-x-1 moves the arrow 4px to the right
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
