// ===========================================
// contentlayer.config.ts - Content Configuration
// This file defines how Contentlayer processes our MDX files
// Contentlayer converts MDX files into type-safe JSON data
// ===========================================

import { defineDocumentType, makeSource } from "contentlayer2/source-files";

// ------------------------------------
// WritingPost Document Type
// Defines the structure for blog posts in "Writing & Learning"
// Each MDX file in content/writing/ will follow this schema
// ------------------------------------
export const WritingPost = defineDocumentType(() => ({
  // 'name' is used to generate TypeScript types (e.g., WritingPost type)
  name: "WritingPost",

  // 'filePathPattern' tells Contentlayer where to find these files
  // "writing/**/*.mdx" means: any .mdx file inside content/writing/ folder
  filePathPattern: "writing/**/*.mdx",

  // 'contentType' specifies we're using MDX (Markdown + JSX)
  contentType: "mdx",

  // 'fields' define the frontmatter (metadata) each post must have
  // Frontmatter is the YAML block at the top of MDX files between ---
  fields: {
    // Post title - required string
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },

    // Publication date - required for sorting posts chronologically
    date: {
      type: "date",
      description: "The date the post was published",
      required: true,
    },

    // Short description - shown in post cards/previews
    description: {
      type: "string",
      description: "A brief description of the post",
      required: true,
    },

    // Tags for categorization - array of strings like ["programming", "data"]
    tags: {
      type: "list",
      of: { type: "string" },
      description: "Tags for categorizing the post",
      required: true,
    },

    // Featured image URL - optional, used for post cards
    image: {
      type: "string",
      description: "Cover image URL for the post",
      required: false,
    },
  },

  // 'computedFields' are automatically generated from other data
  // We don't write these in MDX files - Contentlayer creates them
  computedFields: {
    // 'slug' is the URL-friendly version of the filename
    // Example: "my-first-post.mdx" becomes "my-first-post"
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("writing/", ""),
      // doc._raw.flattenedPath gives us "writing/my-first-post"
      // .replace() removes "writing/" prefix, leaving just "my-first-post"
    },

    // 'url' is the full path used for linking to this post
    url: {
      type: "string",
      resolve: (doc) => `/writing/${doc._raw.flattenedPath.replace("writing/", "")}`,
      // Creates "/writing/my-first-post" for use in <Link href={post.url}>
    },
  },
}));

// ------------------------------------
// PolyglotPost Document Type
// Defines the structure for language practice posts
// Each post has a 'language' field for filtering by language
// ------------------------------------
export const PolyglotPost = defineDocumentType(() => ({
  name: "PolyglotPost",

  // Files in content/polyglot/ folder
  filePathPattern: "polyglot/**/*.mdx",

  contentType: "mdx",

  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },

    date: {
      type: "date",
      description: "The date the post was published",
      required: true,
    },

    description: {
      type: "string",
      description: "A brief description of the post",
      required: true,
    },

    // 'language' field is unique to PolyglotPost
    // Uses enum to restrict values to specific language codes
    language: {
      type: "enum",
      options: ["jp", "kr", "en", "es"],
      // jp = Japanese, kr = Korean, en = English, es = Spanish
      description: "The language the post is written in",
      required: true,
    },
  },

  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("polyglot/", ""),
    },

    url: {
      type: "string",
      resolve: (doc) => `/polyglot/${doc._raw.flattenedPath.replace("polyglot/", "")}`,
    },
  },
}));

// ------------------------------------
// Project Document Type
// Defines the structure for project showcase entries
// ------------------------------------
export const Project = defineDocumentType(() => ({
  name: "Project",

  filePathPattern: "projects/**/*.mdx",

  contentType: "mdx",

  fields: {
    title: {
      type: "string",
      description: "The project name",
      required: true,
    },

    description: {
      type: "string",
      description: "A brief description of the project",
      required: true,
    },

    // Technologies used - displayed as badges
    technologies: {
      type: "list",
      of: { type: "string" },
      description: "Technologies and tools used in the project",
      required: true,
    },

    // Link to GitHub repository
    github: {
      type: "string",
      description: "GitHub repository URL",
      required: false,
    },

    // Link to live demo/deployed version
    liveUrl: {
      type: "string",
      description: "Live demo URL",
      required: false,
    },

    // Project thumbnail/screenshot
    image: {
      type: "string",
      description: "Project screenshot or thumbnail",
      required: false,
    },

    // Display order - lower numbers appear first
    order: {
      type: "number",
      description: "Display order (lower = first)",
      required: false,
    },

    // Project status - "completed" or "wip" (work in progress)
    status: {
      type: "enum",
      options: ["completed", "wip"],
      description: "Project status - completed or work in progress",
      required: false,
    },

    // Link to related blog post (slug only, e.g., "building-scientific-calculator")
    relatedPost: {
      type: "string",
      description: "Slug of related blog post in Writing section",
      required: false,
    },
  },

  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("projects/", ""),
    },
  },
}));

// ------------------------------------
// makeSource - Main Contentlayer Configuration
// Tells Contentlayer where content lives and what types to use
// ------------------------------------
export default makeSource({
  // 'contentDirPath' is the folder containing all our MDX files
  contentDirPath: "content",

  // 'documentTypes' lists all the document types we defined above
  // Contentlayer will process files matching each type's filePathPattern
  documentTypes: [WritingPost, PolyglotPost, Project],
});
