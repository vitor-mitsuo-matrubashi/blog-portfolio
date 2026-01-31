# Blog Portfolio

A personal portfolio and blog built with Next.js 14, Tailwind CSS, and MDX.

## Features

- 🎨 **Dark theme** with red accents
- 📝 **MDX Blog** for Writing & Learning posts
- 🌍 **Polyglot Notes** with language filtering (JP, KR, EN, ES)
- 💼 **Projects showcase** with GitHub/live links
- 🎭 **Smooth animations** with Framer Motion
- 📱 **Fully responsive** design
- 🔍 **SEO optimized** for discoverability

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Content**: MDX with Contentlayer
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Noto Sans (with JP/KR support)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/blog-portfolio.git
cd blog-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
blog-portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About page
│   │   ├── projects/          # Projects page
│   │   ├── writing/           # Writing & Learning blog
│   │   │   ├── page.tsx       # Posts list
│   │   │   └── [slug]/        # Individual post
│   │   └── polyglot/          # Polyglot Notes
│   │       ├── page.tsx       # Posts list with filter
│   │       └── [slug]/        # Individual post
│   └── components/            # Reusable React components
├── content/                   # MDX content files
│   ├── writing/              # Blog posts
│   ├── polyglot/             # Language practice posts
│   └── projects/             # Project descriptions
└── contentlayer.config.ts    # Contentlayer configuration
```

## Creating Content

### Writing a Blog Post

Create a new `.mdx` file in `content/writing/`:

```mdx
---
title: "Your Post Title"
date: "2026-01-15"
description: "A brief description of your post"
tags: ["programming", "data"]
---

# Your Content Here

Write your post content in Markdown...
```

### Adding a Polyglot Note

Create a new `.mdx` file in `content/polyglot/`:

```mdx
---
title: "タイトル"
date: "2026-01-15"
description: "Brief description"
language: "jp"  # Options: jp, kr, en, es
---

# Your content in the target language
```

### Adding a Project

Create a new `.mdx` file in `content/projects/`:

```mdx
---
title: "Project Name"
description: "What the project does"
technologies: ["React", "Python", "SQL"]
github: "https://github.com/user/repo"
liveUrl: "https://project-demo.com"
image: "https://example.com/screenshot.png"
order: 1  # Display order (lower = first)
---

# Project Details

Additional information about the project...
```

## Customization

### Update Personal Information

1. **Social Links**: Edit `src/components/Footer.tsx` and `src/app/page.tsx`
2. **About Page**: Edit `src/app/about/page.tsx`
3. **Metadata**: Edit `src/app/layout.tsx`

### Change Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --accent: #dc2626;        /* Main accent color */
  --accent-hover: #ef4444;  /* Hover state */
  --background: #0a0a0a;    /* Page background */
  /* ... */
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

Vercel will automatically build and deploy on every push.

### Environment Variables

No environment variables are required for basic functionality.

## License

MIT License - feel free to use this for your own portfolio!

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Contentlayer](https://contentlayer.dev/) - Content SDK
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful icons
