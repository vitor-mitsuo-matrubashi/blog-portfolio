// ===========================================
// components/index.ts - Component Barrel Export
// This file re-exports all components from a single location
// Makes imports cleaner: import { Header, Footer } from "@/components"
// Instead of multiple: import Header from "@/components/Header"
// ===========================================

export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as PostCard } from "./PostCard";
export { default as ProjectCard } from "./ProjectCard";
export { default as LanguageFilter } from "./LanguageFilter";
export { default as AnimatedSection } from "./AnimatedSection";
export { default as MDXContent } from "./MDXContent";

// 'export { default as Name }' does two things:
// 1. Imports the default export from the file
// 2. Re-exports it with the given name
