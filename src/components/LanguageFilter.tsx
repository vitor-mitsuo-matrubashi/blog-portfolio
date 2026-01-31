// ===========================================
// LanguageFilter.tsx - Language Selection Component
// Allows users to filter Polyglot Notes by language
// Displays flag buttons that the user can click to filter posts
// ===========================================

"use client";

import { motion } from "framer-motion";

// ------------------------------------
// Props Interface
// ------------------------------------
interface LanguageFilterProps {
  // Currently selected language (or "all")
  selectedLanguage: string;
  // Function to call when user selects a language
  // This is passed from the parent component
  onSelectLanguage: (language: string) => void;
}

// ------------------------------------
// Language Options
// Each object represents a language filter button
// ------------------------------------
const languages = [
  { code: "all", label: "All", flag: "🌐" },      // Show all posts
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "jp", label: "日本語", flag: "🇯🇵" },   // Japanese
  { code: "kr", label: "한국어", flag: "🇰🇷" },   // Korean
  { code: "es", label: "Español", flag: "🇪🇸" },  // Spanish
];

// ------------------------------------
// LanguageFilter Component
// ------------------------------------
export default function LanguageFilter({
  selectedLanguage,
  onSelectLanguage,
}: LanguageFilterProps) {
  return (
    // Container with flexbox and gap between buttons
    <div className="flex flex-wrap items-center gap-2">
      {/* Label for the filter */}
      <span className="text-sm text-muted mr-2">Filter by language:</span>

      {/* Map through languages to create filter buttons */}
      {languages.map((lang) => {
        // Check if this button is the currently selected one
        const isSelected = selectedLanguage === lang.code;

        return (
          // motion.button for animated button
          <motion.button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            // When clicked, calls the parent's function with this language code
            // This is how child components communicate with parents in React
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // whileTap: animation when button is clicked/pressed
            className={`
              relative px-4 py-2 rounded-lg text-sm font-medium
              transition-colors duration-200
              ${
                isSelected
                  ? // Selected button styles
                    "text-accent"
                  : // Unselected button styles
                    "text-muted hover:text-foreground"
              }
            `}
          >
            {/* Animated background for selected state */}
            {isSelected && (
              <motion.div
                layoutId="activeLanguage"
                // 'layoutId' creates smooth transition when selection changes
                // Framer Motion automatically animates between elements with same layoutId
                className="absolute inset-0 bg-accent/20 rounded-lg"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Button content - flag emoji and label */}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg">{lang.flag}</span>
              {/* Hide label on very small screens to save space */}
              <span className="hidden sm:inline">{lang.label}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
