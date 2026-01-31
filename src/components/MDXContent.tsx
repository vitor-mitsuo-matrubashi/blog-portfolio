// ===========================================
// MDXContent.tsx - MDX Renderer Component
// Renders MDX content with proper styling
// Used to display the body of blog posts
// ===========================================

"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
// useMDXComponent is a hook that converts MDX code string into React components
// Contentlayer provides the MDX code, this hook makes it renderable

// ------------------------------------
// Props Interface
// ------------------------------------
interface MDXContentProps {
  code: string;
  // The compiled MDX code from Contentlayer
  // This is accessed via post.body.code
}

// ------------------------------------
// Custom Components for MDX
// You can override default HTML elements with custom React components
// This allows you to add special styling or functionality
// ------------------------------------
const mdxComponents = {
  // Example: Custom heading with anchor link
  // h2: ({ children, ...props }) => (
  //   <h2 {...props} className="group">
  //     {children}
  //   </h2>
  // ),

  // Example: Custom code block with syntax highlighting
  // pre: ({ children }) => (
  //   <pre className="custom-code-block">{children}</pre>
  // ),
};

// ------------------------------------
// MDXContent Component
// ------------------------------------
export default function MDXContent({ code }: MDXContentProps) {
  // useMDXComponent hook converts the MDX code string to a React component
  // 'Component' is now a renderable React component containing the post content
  const Component = useMDXComponent(code);

  return (
    // The 'prose' class applies our custom MDX styles from globals.css
    // max-w-none removes the default max-width restriction
    <div className="prose max-w-none">
      {/* Render the MDX content with custom components */}
      <Component components={mdxComponents} />
    </div>
  );
}
