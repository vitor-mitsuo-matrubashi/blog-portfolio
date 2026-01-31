// ===========================================
// ProjectCard.tsx - Project Showcase Card Component
// Displays a project with image, description, technologies, and links
// Used on the Projects page to showcase your work
// ===========================================

"use client";

import Link from "next/link";
import Image from "next/image";
// Next.js Image component optimizes images automatically
// - Lazy loading: images load as they enter viewport
// - Responsive: serves different sizes for different screens
// - Modern formats: converts to WebP when supported

import { motion } from "framer-motion";
import { Github, ExternalLink, Folder, FileText } from "lucide-react";
// Github: link to repository
// ExternalLink: link to live demo
// Folder: fallback icon when no image
// FileText: link to related blog post

// ------------------------------------
// Props Interface
// ------------------------------------
interface ProjectCardProps {
  title: string;              // Project name
  description: string;        // What the project does
  technologies: string[];     // Tech stack used (React, Python, etc.)
  github?: string;            // Optional GitHub repository URL
  liveUrl?: string;           // Optional live demo URL
  image?: string;             // Optional project screenshot/thumbnail
  index?: number;             // Position for stagger animation
  status?: "completed" | "wip"; // Project status - "wip" shows Work In Progress badge
  relatedPost?: string;       // Optional slug of related blog post
}

// ------------------------------------
// Animation Variants
// ------------------------------------
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.15, // Stagger effect
      ease: [0.25, 0.1, 0.25, 1], // Custom easing curve
    },
  }),
};

// Overlay animation for the hover effect
const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

// ------------------------------------
// ProjectCard Component
// ------------------------------------
export default function ProjectCard({
  title,
  description,
  technologies,
  github,
  liveUrl,
  image,
  index = 0,
  status = "completed",
  relatedPost,
}: ProjectCardProps) {
  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover="hover"
      // Sets variant to "hover" when mouse enters, "rest" when leaves
      className="group relative"
    >
      {/* Work In Progress Badge - shown when status is "wip" */}
      {status === "wip" && (
        <div className="absolute -top-3 -right-3 z-10">
          <span className="px-4 py-2 text-sm font-bold rounded-lg bg-yellow-500 text-black shadow-lg border-2 border-yellow-600">
            🚧 Work In Progress
          </span>
        </div>
      )}

      {/* Card container */}
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300">
        {/* ------------------------------------
            Image Section
            Uses aspect-video for 16:9 ratio
            ------------------------------------ */}
        <div className="relative aspect-video bg-card-hover overflow-hidden">
          {image ? (
            // If image URL provided, show the image
            <>
              <Image
                src={image}
                alt={title}
                fill
                // 'fill' makes image fill the parent container
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                // object-cover: image covers area without distortion
                // group-hover:scale-105: zooms in 5% on card hover
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // 'sizes' helps Next.js choose the right image size
                // - Mobile: 100% viewport width
                // - Tablet: 50% viewport width
                // - Desktop: 33% viewport width
              />

              {/* Hover overlay with gradient */}
              <motion.div
                variants={overlayVariants}
                initial="rest"
                className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"
                // Gradient: solid at bottom, fading to transparent at top
              />
            </>
          ) : (
            // If no image, show a placeholder with folder icon
            <div className="absolute inset-0 flex items-center justify-center">
              <Folder size={48} className="text-muted/30" />
            </div>
          )}

          {/* ------------------------------------
              Hover Links Overlay
              Shows GitHub and Live links on hover
              ------------------------------------ */}
          <motion.div
            variants={overlayVariants}
            className="absolute inset-0 flex items-center justify-center gap-4"
          >
            {/* GitHub Link Button */}
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/80 text-foreground hover:bg-accent hover:text-white transition-colors"
                // Stops click from triggering card click
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </Link>
            )}

            {/* Live Demo Link Button */}
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/80 text-foreground hover:bg-accent hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </Link>
            )}

            {/* Related Blog Post Link Button */}
            {relatedPost && (
              <Link
                href={`/writing/${relatedPost}`}
                className="p-3 rounded-full bg-background/80 text-foreground hover:bg-accent hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FileText size={20} />
              </Link>
            )}
          </motion.div>
        </div>

        {/* ------------------------------------
            Content Section
            ------------------------------------ */}
        <div className="p-5">
          {/* Project Title */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
            {title}
          </h3>

          {/* Project Description */}
          <p className="text-muted text-sm line-clamp-2 mb-4">{description}</p>

          {/* ------------------------------------
              Technologies Tags
              flex-wrap allows tags to wrap to next line
              ------------------------------------ */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-accent/10 text-accent font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Related Blog Post Link */}
          {relatedPost && (
            <Link
              href={`/writing/${relatedPost}`}
              className="mt-4 flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              <FileText size={16} />
              <span>Read about this project</span>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
