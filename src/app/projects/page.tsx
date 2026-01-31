// ===========================================
// projects/page.tsx - Projects Showcase Page
// Displays all your projects in a grid layout
// Projects are loaded from MDX files in content/projects/
// ===========================================

import { Metadata } from "next";
import { allProjects } from "contentlayer/generated";
// Import all projects processed by Contentlayer

import { AnimatedSection, ProjectCard } from "@/components";
import { Folder } from "lucide-react";

// ------------------------------------
// Page Metadata
// ------------------------------------
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of projects in programming, data science, and finance.",
};

// ------------------------------------
// Projects Page Component
// ------------------------------------
export default function ProjectsPage() {
  // Sort projects by order field (if provided) or keep original order
  // Projects with lower 'order' values appear first
  const sortedProjects = allProjects.sort((a, b) => {
    // If both have order, sort by order
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    // If only one has order, that one comes first
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    // If neither has order, keep original order
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ====================================
          PAGE HEADER
          ==================================== */}
      <AnimatedSection className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Projects
        </h1>
        <p className="text-xl text-muted max-w-2xl">
          A collection of my work in programming, data analysis, and finance.
          Each project includes details about the technologies used and links
          to the source code.
        </p>
      </AnimatedSection>

      {/* ====================================
          PROJECTS GRID
          ==================================== */}
      <AnimatedSection delay={0.2}>
        {sortedProjects.length > 0 ? (
          // If there are projects, display them in a grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                github={project.github}
                liveUrl={project.liveUrl}
                image={project.image}
                index={index}
                status={project.status}
                relatedPost={project.relatedPost}
              />
            ))}
          </div>
        ) : (
          // If no projects yet, show placeholder message
          <div className="text-center py-16">
            <Folder size={64} className="mx-auto text-muted/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No projects yet
            </h3>
            <p className="text-muted max-w-md mx-auto">
              Projects will appear here once you add MDX files to the{" "}
              <code className="px-2 py-1 bg-card rounded text-accent">
                content/projects/
              </code>{" "}
              folder.
            </p>
          </div>
        )}
      </AnimatedSection>

      {/* ====================================
          ADDITIONAL INFO SECTION
          ==================================== */}
      <AnimatedSection className="mt-16" delay={0.3}>
        <div className="p-8 bg-card rounded-xl border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Want to see more?
          </h2>
          <p className="text-muted mb-4">
            Check out my GitHub profile for more projects, contributions, and
            experiments that aren&apos;t listed here.
          </p>
          <a
            href="https://github.com/vitor-mitsuo-matrubashi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
          >
            View my GitHub →
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
