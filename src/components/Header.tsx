// ===========================================
// Header.tsx - Navigation Component
// This component renders the site's top navigation bar
// It includes the logo, navigation links, and uses sticky positioning
// ===========================================

"use client";
// "use client" tells Next.js this component runs in the browser
// Required when using React hooks like useState or browser APIs
// Server components (default) can't use hooks or browser features

import Link from "next/link";
// 'Link' is Next.js's navigation component - faster than <a> tags
// It pre-loads pages in the background for instant navigation

import { usePathname } from "next/navigation";
// 'usePathname' is a Next.js hook that returns the current URL path
// We use it to highlight the active navigation link

import { motion } from "framer-motion";
// 'motion' from Framer Motion lets us animate HTML elements
// Wrap any element with motion.div, motion.nav, etc. to animate it

import { Menu, X } from "lucide-react";
// Icons from Lucide React - Menu (hamburger) and X (close) for mobile nav

import { useState } from "react";
// 'useState' is a React hook for managing component state (data that changes)
// When state changes, React automatically re-renders the component

// ------------------------------------
// Type Definition for Navigation Items
// TypeScript interfaces define the shape of our data
// This helps catch errors and enables autocomplete in VS Code
// ------------------------------------
interface NavItem {
  label: string;  // Text displayed in the menu (e.g., "Home")
  href: string;   // URL path the link goes to (e.g., "/about")
}

// ------------------------------------
// Navigation Items Array
// Each object represents one link in the navigation menu
// Adding/removing items here automatically updates the nav
// ------------------------------------
const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Polyglot", href: "/polyglot" },
];

// ------------------------------------
// Animation Variants
// Framer Motion uses "variants" to define animation states
// We can then switch between states like "hidden" and "visible"
// ------------------------------------
const headerVariants = {
  // Initial state - slightly above and invisible
  hidden: { y: -20, opacity: 0 },
  // Final state - in place and fully visible
  visible: {
    y: 0,
    opacity: 1,
    // 'transition' controls how the animation plays
    transition: {
      duration: 0.5,                // Animation takes 0.5 seconds
      ease: "easeOut" as const,    // Starts fast, ends slow (natural feel)
    },
  },
};

// Mobile menu animation - slides in from top
const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3 },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3 },
  },
};

// ------------------------------------
// Header Component
// Components are reusable pieces of UI
// 'export default' makes this the main export of the file
// ------------------------------------
export default function Header() {
  // Get the current URL path (e.g., "/about")
  const pathname = usePathname();

  // State to track if mobile menu is open
  // useState returns: [currentValue, functionToUpdateIt]
  // false = menu starts closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to check if a link is currently active
  // Used to highlight the current page in the navigation
  const isActiveLink = (href: string): boolean => {
    // For home page, exact match required
    if (href === "/") {
      return pathname === "/";
    }
    // For other pages, check if path starts with the href
    // This makes "/writing/my-post" highlight "Writing" link
    return pathname.startsWith(href);
  };

  return (
    // <motion.header> is an animated <header> element
    // - initial: starting state ("hidden")
    // - animate: ending state ("visible")
    // - variants: the animation definitions we created above
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      // Tailwind CSS classes:
      // - sticky: stays visible when scrolling
      // - top-0: sticks to the top of the viewport
      // - z-50: high z-index to stay above other content
      // - bg-background: uses our custom background color
      // - border-b: bottom border
      // - border-border: uses our custom border color
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      // backdrop-blur-md: blurs content behind (glassmorphism effect)
      // bg-background/80: 80% opacity for transparency
    >
      {/* Container with max width and padding */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
          Flexbox container for logo and navigation
          - flex: enables flexbox layout
          - justify-between: pushes items to opposite ends
          - items-center: vertically centers items
          - h-16: fixed height of 4rem (64px)
        */}
        <div className="flex justify-between items-center h-16">
          {/* ------------------------------------
              Logo / Site Name
              Links back to home page when clicked
              ------------------------------------ */}
          <Link
            href="/"
            className="text-xl font-bold text-accent hover:text-accent-hover transition-colors"
            // transition-colors: smooth color change animation
          >
            {/* You can replace this with your name or logo */}
            Portfolio
          </Link>

          {/* ------------------------------------
              Desktop Navigation Links
              hidden md:flex - hidden on mobile, visible on medium+ screens
              ------------------------------------ */}
          <nav className="hidden md:flex items-center gap-1">
            {/* 
              .map() loops through navigationItems array
              Creates a Link component for each item
              'key' is required by React for list items - helps with performance
            */}
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActiveLink(item.href)
                      ? // Active link styles - highlighted with accent color
                        "text-accent bg-accent/10"
                      : // Inactive link styles - muted color with hover effect
                        "text-muted hover:text-foreground hover:bg-card"
                  }
                `}
                // Template literals (backticks) allow dynamic class names
                // ${condition ? "class1" : "class2"} is a ternary operator
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ------------------------------------
              Mobile Menu Button
              md:hidden - only visible on small screens
              ------------------------------------ */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            // Toggle menu: if open, close it; if closed, open it
            className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Toggle menu"
            // aria-label improves accessibility for screen readers
          >
            {/* Show X icon when open, Menu icon when closed */}
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ------------------------------------
            Mobile Navigation Menu
            AnimatePresence handles enter/exit animations
            ------------------------------------ */}
        <motion.nav
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                // Close menu when a link is clicked
                className={`
                  block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActiveLink(item.href)
                      ? "text-accent bg-accent/10"
                      : "text-muted hover:text-foreground hover:bg-card"
                  }
                `}
                // 'block' makes the link take full width (easier to tap on mobile)
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}
