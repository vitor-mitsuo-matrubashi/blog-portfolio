// ===========================================
// Footer.tsx - Site Footer Component
// This component renders the bottom section of every page
// Contains social media links (LinkedIn, GitHub) and copyright
// ===========================================

"use client";
// Required for Framer Motion animations

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
// Importing icons from Lucide React
// - Github: GitHub logo icon
// - Linkedin: LinkedIn logo icon
// - Mail: Email envelope icon
// - Heart: Heart icon for the footer message

// ------------------------------------
// Social Media Links Configuration
// Edit these URLs with your actual profiles!
// ------------------------------------
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/vitor-mitsuo-matrubashi", // Replace with your GitHub URL
    icon: Github,
    // 'icon' stores the component itself (not <Github />)
    // We'll render it later as <link.icon />
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vitomit/", // Replace with your LinkedIn URL
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:matrubashimitsuo@gmail.com", // Replace with your email
    icon: Mail,
  },
];

// ------------------------------------
// Animation Variants for Social Icons
// Each icon will have a hover animation
// ------------------------------------
const iconVariants = {
  // Rest state
  rest: { scale: 1 },
  // Hover state - icon grows slightly
  hover: {
    scale: 1.2,
    transition: {
      type: "spring" as const, // Spring physics animation
      stiffness: 400,          // How "tight" the spring is
      damping: 10,             // How quickly it settles
    },
  },
};

// ------------------------------------
// Footer Component
// ------------------------------------
export default function Footer() {
  // Get current year for copyright notice
  // new Date().getFullYear() returns the current year (e.g., 2026)
  const currentYear = new Date().getFullYear();

  return (
    // <footer> is a semantic HTML element for page footers
    // border-t: top border to separate from content
    // mt-auto: pushes footer to bottom when content is short
    <footer className="border-t border-border mt-auto">
      {/* Container with max width matching header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
          Flex container with column on mobile, row on desktop
          - flex-col: stack items vertically (mobile)
          - md:flex-row: side by side on medium+ screens
          - py-8: vertical padding
        */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-4">
          {/* ------------------------------------
              Social Media Links Section
              ------------------------------------ */}
          <div className="flex items-center gap-4">
            {/* Map through social links to create icons */}
            {socialLinks.map((link) => (
              // motion.a is an animated anchor tag
              // whileHover triggers the "hover" variant
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                // target="_blank" opens link in new tab
                rel="noopener noreferrer"
                // Security: prevents new tab from accessing our page
                variants={iconVariants}
                initial="rest"
                whileHover="hover"
                className="p-2 rounded-lg text-muted hover:text-accent hover:bg-card transition-colors"
                aria-label={link.name}
                // aria-label tells screen readers what this link is
              >
                {/* 
                  Render the icon component
                  link.icon is the component (e.g., Github)
                  <link.icon /> creates an instance of that component
                  size={20} sets the icon size in pixels
                */}
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* ------------------------------------
              Copyright Notice
              ------------------------------------ */}
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>© {currentYear}</span>
            {/* 
              {currentYear} inserts the JavaScript variable into the JSX
              Curly braces {} are used to embed JavaScript in JSX
            */}
            <span>•</span>
            <span className="flex items-center gap-1">
              Built with
              {/* Heart icon with accent color */}
              <Heart size={14} className="text-accent fill-accent" />
              {/* fill-accent fills the heart with color (not just outline) */}
            </span>
          </div>

          {/* ------------------------------------
              Quick Navigation Links
              ------------------------------------ */}
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/about"
              className="text-muted hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-muted hover:text-accent transition-colors"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
