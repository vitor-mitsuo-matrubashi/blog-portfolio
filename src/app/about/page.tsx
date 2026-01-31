// ===========================================
// about/page.tsx - About Me Page
// This page tells visitors about you, your career, and hobbies
// Uses timeline format for career history
// ===========================================

import { Metadata } from "next";
import { AnimatedSection } from "@/components";
import { Briefcase, GraduationCap, Heart, MapPin, Mail } from "lucide-react";
// Icons for different sections:
// - Briefcase: work experience
// - GraduationCap: education
// - Heart: hobbies
// - MapPin: location
// - Mail: contact

// ------------------------------------
// Page Metadata
// Overrides the default metadata from layout.tsx
// ------------------------------------
export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about my background, career journey, and interests in programming, data, and finance.",
};

// ------------------------------------
// Timeline Data - Career/Education History
// Add your own experiences here!
// ------------------------------------
const timelineItems = [
  {
    year: "May 2025 - Present",
    title: "IT Engineering Analyst",
    company: "Itau Unibanco",
    description:
      "Worked on the development and maintenance of financial systems for FX operations (derivatives, NDFs), integrated with trade capture and booking systems. Responsible for integration platforms orchestrating event-driven architecture. Contributed to event models and data contracts design, ensuring standardization and scalability. Collaborated with technology and business teams on data flows and financial processes.",
    type: "work", // 'work' or 'education'
  },
  {
    year: "Nov 2017 - May 2025",
    title: "Product Manager - Market Risk",
    company: "Itau Unibanco",
    description:
      "Over 7 years in Market Risk, delivering end-to-end solutions ensuring stakeholder alignment and regulatory compliance. Implemented data management solutions and risk calculation frameworks. Developed pricing and risk calculators for products outside standard pipelines. Monitored GCP/ALM desk exposure. Built automations with Python and SQL. Experience in Banking and Trading risk analysis. Produced risk reports for Latin America units.",
    type: "work",
  },
  {
    year: "2014 - 2018",
    title: "Bachelor's Degree  in Applied and Computational Mathematics",
    company: "University of São Paulo (USP)",
    description:
      "Studied mathematical modeling, numerical methods, statistics, and programming. Strong foundation in quantitative analysis and problem-solving applied to real-world challenges.",
    type: "education",
  },
];

// ------------------------------------
// Hobbies/Interests Data
// Personalize with your actual interests
// ------------------------------------
const hobbies = [
  {
    name: "Programming",
    description: "Building side projects and learning new technologies",
    emoji: "💻",
  },
  {
    name: "Languages",
    description: "Studying Japanese, Korean, Spanish, and Libras (Brazilian Sign Language)",
    emoji: "🌍",
  },
  {
    name: "Finance",
    description: "Personal investing and financial analysis",
    emoji: "📊",
  },
  {
    name: "Reading",
    description: "Technical books, sci-fi, and a huge One Piece fan",
    emoji: "📚",
  },
  {
    name: "Music",
    description: "Playing piano and listening to BoA, my favorite singer",
    emoji: "🎹",
  },
  {
    name: "Games",
    description: "Big fan of Hideo Kojima and his storytelling masterpieces",
    emoji: "🎮",
  },
];

// ------------------------------------
// Skills Data
// List your technical skills
// ------------------------------------
const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "SQL"],
  frameworks: ["React", "Next.js", "Node.js", "Pandas"],
  tools: ["Git", "Docker", "VS Code", "Jupyter"],
  databases: ["PostgreSQL", "MongoDB", "Redis"],
  finance: ["Pricing", "Mark-to-Market (MTM)", "PnL Calculation"],
};

// ------------------------------------
// About Page Component
// ------------------------------------
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ====================================
          HERO/INTRO SECTION
          ==================================== */}
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          About Me
        </h1>

        {/* Personal Info */}
        <div className="flex flex-wrap gap-4 text-muted mb-6">
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-accent" />
            Sao Paulo, Brazil
          </span>
          <span className="inline-flex items-center gap-2">
            <Mail size={16} className="text-accent" />
            matrubashimitsuo@gmail.com
          </span>
        </div>

        {/* Bio Paragraphs */}
        <div className="space-y-4 text-muted text-lg leading-relaxed">
          <p>
            Hello! I&apos;m <span className="text-foreground font-medium">Vitor Mitsuo</span>,
            a developer passionate about building software that solves real problems.
            I specialize in <span className="text-accent">programming</span>,{" "}
            <span className="text-accent">data analysis</span>, and{" "}
            <span className="text-accent">finance</span>.
          </p>


        <p> 
            I’m currently working as an IT Engineering Analyst.
            Before that, I worked with Market Risk and Finance, combining technology
            with financial expertise.
        </p>

        <p>
            I’m also passionate about Data & Analytics (D&A) and I’m studying
            with a strong focus on this area, aiming to leverage data to deliver 
            more insights and efficiency to financial processes.
        </p>
          <p>
            I created this blog to document my learning journey, share project breakdowns,
            and practice writing in multiple languages. Whether you're a recruiter exploring
            my portfolio or a fellow developer, I hope you find something useful here.
          </p>

          <p>
            Outside of work, I enjoy studying languages, reading about finance, and building 
            personal projects. I’m also a big fan of One Piece, so much so that my daughter is
            named Nami, in honor of the Straw Hat Pirates’ navigator.
          </p>
        </div>
      </AnimatedSection>

      {/* ====================================
          SKILLS SECTION
          ==================================== */}
      <AnimatedSection className="mb-16" delay={0.1}>
        <h2 className="text-2xl font-bold text-foreground mb-6">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map through each skill category */}
          {Object.entries(skills).map(([category, items]) => (
            // Object.entries() converts {key: value} to [[key, value], ...]
            // This lets us iterate over the skills object
            <div
              key={category}
              className="p-4 bg-card rounded-xl border border-border"
            >
              {/* Category Title - capitalize first letter */}
              <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">
                {category}
              </h3>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-accent/10 text-accent rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ====================================
          CAREER TIMELINE SECTION
          ==================================== */}
      <AnimatedSection className="mb-16" delay={0.2}>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Experience & Education
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - positioned absolutely on the left */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <div key={index} className="relative pl-12">
                {/* Timeline Dot/Icon */}
                <div
                  className={`absolute left-0 p-2 rounded-full ${
                    item.type === "work" ? "bg-accent" : "bg-blue-500"
                  }`}
                >
                  {item.type === "work" ? (
                    <Briefcase size={16} className="text-white" />
                  ) : (
                    <GraduationCap size={16} className="text-white" />
                  )}
                </div>

                {/* Content Card */}
                <div className="p-5 bg-card rounded-xl border border-border">
                  {/* Year Badge */}
                  <span className="text-xs text-muted uppercase tracking-wider">
                    {item.year}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mt-1">
                    {item.title}
                  </h3>

                  {/* Company/Institution */}
                  <p className="text-accent text-sm mb-2">{item.company}</p>

                  {/* Description */}
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ====================================
          HOBBIES SECTION
          ==================================== */}
      <AnimatedSection className="mb-16" delay={0.3}>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          <Heart size={24} className="inline mr-2 text-accent" />
          Interests & Hobbies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hobbies.map((hobby) => (
            <div
              key={hobby.name}
              className="p-4 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors"
            >
              {/* Emoji Icon */}
              <span className="text-2xl mb-2 block">{hobby.emoji}</span>

              {/* Hobby Name */}
              <h3 className="text-foreground font-medium mb-1">{hobby.name}</h3>

              {/* Hobby Description */}
              <p className="text-muted text-sm">{hobby.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ====================================
          CALL TO ACTION
          ==================================== */}
      <AnimatedSection delay={0.4}>
        <div className="p-8 bg-card rounded-xl border border-border text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Let&apos;s Connect!
          </h2>
          <p className="text-muted mb-6">
            I&apos;m always open to discussing new opportunities, interesting
            projects, or just chatting about tech.
          </p>
          <a
            href="mailto:matrubashimitsuo@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
          >
            <Mail size={18} />
            Get in Touch
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
