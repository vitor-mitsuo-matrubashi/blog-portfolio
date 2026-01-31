// ===========================================
// AnimatedSection.tsx - Reusable Animation Wrapper
// Wraps content to add fade-in animation when scrolling
// Uses Framer Motion's viewport detection feature
// ===========================================

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
// ReactNode is a TypeScript type that represents any valid React child
// This includes: strings, numbers, elements, arrays, fragments, etc.

// ------------------------------------
// Props Interface
// ------------------------------------
interface AnimatedSectionProps {
  children: ReactNode;
  // 'children' is a special React prop
  // It contains whatever is placed between the component's opening and closing tags
  // Example: <AnimatedSection>This is children</AnimatedSection>

  className?: string;
  // Optional additional CSS classes to apply

  delay?: number;
  // Optional delay before animation starts (in seconds)
}

// ------------------------------------
// Animation Variants
// Defines the animation states
// ------------------------------------
const sectionVariants = {
  // Initial state - invisible and below final position
  hidden: {
    opacity: 0,
    y: 30,
  },
  // Final state - visible and in place
  visible: {
    opacity: 1,
    y: 0,
  },
};

// ------------------------------------
// AnimatedSection Component
// ------------------------------------
export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      // 'whileInView' triggers animation when element enters viewport
      // This creates the "reveal on scroll" effect
      whileInView="visible"
      // 'viewport' configures when the animation triggers
      viewport={{
        once: true,
        // once: true = animate only the first time it enters view
        // once: false = animate every time it enters/exits view
        margin: "-100px",
        // Start animation 100px before element is fully visible
        // This makes the animation feel more natural
      }}
      variants={sectionVariants}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      }}
      className={className}
      // Passes through any additional classes from props
    >
      {children}
      {/* Renders whatever content was passed between the tags */}
    </motion.section>
  );
}
