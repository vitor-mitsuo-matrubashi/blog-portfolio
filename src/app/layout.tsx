// ===========================================
// layout.tsx - Root Layout Component
// This is the main layout that wraps ALL pages in the application
// It includes: fonts, metadata, header, footer, and global styles
// ===========================================

import type { Metadata } from "next";
// Metadata type for TypeScript - defines the shape of page metadata

import { Noto_Sans, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
// Import fonts from Google Fonts using Next.js font optimization
// - Noto_Sans: Latin characters (English, Spanish)
// - Noto_Sans_JP: Japanese characters
// - Noto_Sans_KR: Korean characters
// Next.js automatically optimizes these fonts (no layout shift, fast loading)

import "./globals.css";
// Import global styles including Tailwind CSS

import { Header, Footer } from "@/components";
// Import our custom Header and Footer components
// "@/" is an alias for the "src" folder (configured in tsconfig.json)

// ------------------------------------
// Font Configuration
// Each font is configured with:
// - subsets: character sets to include
// - variable: CSS variable name for use in styles
// - display: how font loads (swap = show fallback first, then swap)
// ------------------------------------
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  // 'swap' shows text immediately with fallback font,
  // then swaps to the custom font when loaded
  // This prevents invisible text while fonts load
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["400", "500", "700"],
  // Japanese font with specific weights
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  weight: ["400", "500", "700"],
  // Korean font with specific weights
});

// ------------------------------------
// Metadata Configuration
// Defines SEO metadata for the entire site
// Individual pages can override these values
// ------------------------------------
export const metadata: Metadata = {
  // Default page title (shown in browser tab)
  title: {
    default: "My Portfolio | Developer Blog",
    // Template for page-specific titles
    // %s is replaced with the page's title
    template: "%s | My Portfolio",
  },

  // Site description for search engines
  description:
    "Personal portfolio and blog about programming, data science, and finance. Showcasing projects and sharing knowledge.",

  // Keywords help search engines understand your content
  keywords: [
    "portfolio",
    "developer",
    "programming",
    "data science",
    "finance",
    "blog",
    "projects",
  ],

  // Author information
  authors: [{ name: "Your Name" }],

  // Canonical URL (replace with your actual domain)
  metadataBase: new URL("https://your-domain.com"),

  // Open Graph metadata for social media sharing (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "My Portfolio",
    title: "My Portfolio | Developer Blog",
    description:
      "Personal portfolio and blog about programming, data science, and finance.",
  },

  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio | Developer Blog",
    description:
      "Personal portfolio and blog about programming, data science, and finance.",
  },

  // Robots directive - tells search engines how to index the site
  robots: {
    index: true,
    follow: true,
  },
};

// ------------------------------------
// Root Layout Component
// This function is the main layout wrapper
// 'children' represents the page content that changes between routes
// ------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html> element with language attribute for accessibility
    <html lang="en" className="scroll-smooth">
      {/* 
        scroll-smooth: enables smooth scrolling when clicking anchor links
        suppressHydrationWarning: prevents warnings from browser extensions
      */}
      <body
        className={`
          ${notoSans.variable}
          ${notoSansJP.variable}
          ${notoSansKR.variable}
          font-sans
          antialiased
          bg-background
          text-foreground
          min-h-screen
          flex
          flex-col
        `}
        // font-sans: uses our Noto Sans font
        // antialiased: smooths font rendering
        // min-h-screen: minimum height of 100vh (full viewport)
        // flex flex-col: column layout so footer stays at bottom
      >
        {/* Header appears on all pages */}
        <Header />

        {/* 
          Main content area
          flex-1: takes up all available space (pushes footer down)
        */}
        <main className="flex-1">{children}</main>

        {/* Footer appears on all pages */}
        <Footer />
      </body>
    </html>
  );
}
