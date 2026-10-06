# 10 — Project & Technical Glossary

This glossary defines every project-specific, architectural, and Next.js domain term used across this documentation in a single sentence each.

---

### Terminology Reference

- **App Router**: The file-system-based routing architecture introduced in Next.js 13+ (located in `app/`) that supports React Server Components, nested layouts, and serverless Route Handlers.
- **BFF (Backend-for-Frontend)**: An architectural design pattern where a frontend application communicates with dedicated backend endpoints (such as `app/api/contact/route.ts`) that orchestrate, sanitize, and validate data for the UI.
- **Client Component**: A React component marked with the `"use client"` directive that executes and hydrates in the user's browser to provide interactive features, event listeners, or hooks like `useState`.
- **Decoupled Content Layer**: An architectural pattern where content (Markdown case studies and articles) is stored independently of the database or rendering engine, accessed via a standardized programmatic library (`lib/content.ts`).
- **Frontmatter**: A block of YAML metadata located at the very top of a Markdown file bounded by three hyphens (`---`) used to define structured attributes like title, date, and technology tags.
- **`generateStaticParams`**: A Next.js API function exported from dynamic route files (`[slug]/page.tsx`) that tells the compiler which parameter values to pre-render into static HTML during `next build`.
- **`gray-matter`**: A Node.js library used in `lib/content.ts` to separate YAML frontmatter metadata from the raw Markdown document body.
- **Hydration**: The client-side React process where JavaScript loads in the browser and attaches event listeners to pre-rendered static HTML received from the server.
- **Lucide React**: An open-source, tree-shakeable SVG icon package providing crisp, scalable vector icons across all UI components.
- **OpenGraph**: A protocol created by Facebook and adopted across the web that specifies how web pages should display preview titles, descriptions, and images when shared on social networks or messaging apps.
- **Prose Utility**: A styling feature provided by `@tailwindcss/typography` that automatically applies responsive, typographic styles to raw HTML generated from Markdown.
- **`reading-time`**: An algorithmic estimation utility that calculates how long an article will take to read based on an average reading speed of 200 words per minute.
- **`remark`**: An extensible JavaScript compiler ecosystem used in `lib/content.ts` to parse Markdown text into an Abstract Syntax Tree (AST) and compile it into sanitized HTML.
- **Route Handler**: A serverless HTTP endpoint defined in an `app/**/route.ts` file that accepts web requests and returns JSON or streamed responses via `NextResponse`.
- **Server Component (RSC)**: A React component that executes exclusively on the server or during the build phase, generating pure HTML without sending JavaScript to the browser.
- **Slug**: The URL-friendly identifier portion of a web address (e.g. `enterprise-analytics-platform`) used to locate a specific case study or blog post.
- **SSG (Static Site Generation)**: The process of compiling dynamic web pages into pre-rendered static HTML files at build time for optimal performance, caching, and SEO.
- **Tailwind Tokens**: Semantic color and spacing variables configured in `tailwind.config.ts` (e.g. `corporate` and `accent`) that enforce visual consistency across all components.
- **Tree Shaking**: A compiler optimization step that eliminates unused code from the final production JavaScript bundle to reduce download times.
- **TypeScript Path Alias**: A compiler configuration in `tsconfig.json` that maps `@/*` to the workspace root, eliminating messy relative import chains like `../../components`.
