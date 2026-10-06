# Developer Portfolio — Technical & Architectural Documentation Index

This project is a modern, high-performance, production-ready personal portfolio and technical publication platform engineered with Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS. Built specifically for senior software engineers, architects, and technical consultants, the system showcases engineering case studies, structured technical proficiencies, long-form technical articles, and prospective client/employer contact inquiries through a decoupled, file-based headless content architecture that eliminates the need for external databases or third-party CMS subscriptions while maintaining optimal Lighthouse scores, strict type safety, and instant static pre-rendering.

---

## Complete Documentation Directory

Below is the complete navigational index of architectural, design, maintenance, and operational guides for this repository. Every document is written for a layered audience—starting with non-technical executive summaries followed by rigorous technical breakdowns, code citations, and native Mermaid diagrams.

| # | Document | Target Audience | Primary Scope & Focus |
|---|---|---|---|
| **01** | [01-EXECUTIVE-OVERVIEW.md](./01-EXECUTIVE-OVERVIEW.md) | Stakeholders, Recruiters, Engineering Managers | Plain-English summary of capabilities, target audience, business problem solved, and 5-box high-level system boundary diagram. |
| **02** | [02-ARCHITECTURE-HIGH-LEVEL.md](./02-ARCHITECTURE-HIGH-LEVEL.md) | System Architects, Tech Leads | End-to-end component topology diagram, component responsibilities, and complete dependency stack with explicit vs. inferred rationale. |
| **03** | [03-ARCHITECTURE-DETAILED.md](./03-ARCHITECTURE-DETAILED.md) | Software Engineers, Code Reviewers | Comprehensive directory structure breakdown, key functions and classes with line references, architectural patterns (BFF, decoupled content layer, compound components), and repository coding conventions. |
| **04** | [04-DATA-LAYER.md](./04-DATA-LAYER.md) | Backend & Full-Stack Developers | Full TypeScript schema definitions (`ProjectMetadata`, `BlogPostMetadata`, `SkillCategory`), Markdown YAML frontmatter validation rules, and structural entity relationships. |
| **05** | [05-DATA-FLOW.md](./05-DATA-FLOW.md) | Full-Stack Engineers, DevOps | Detailed step-by-step execution traces and Mermaid sequence diagrams for critical paths (SSG page rendering, dynamic slug retrieval, contact form submission), and state lifecycle analysis. |
| **06** | [06-SETUP-AND-RUN.md](./06-SETUP-AND-RUN.md) | Developers, DevOps, CI/CD Engineers | Local development prerequisites, Node.js environment paths on Windows, installation, execution commands, linting, and production builds. |
| **07** | [07-HOW-TO-EDIT.md](./07-HOW-TO-EDIT.md) | Content Owners, Maintaining Engineers | Concrete step-by-step workflows for editing UI components, modifying personal bio/social metadata, adding skills, and publishing projects/articles. |
| **08** | [08-HOW-TO-EXTEND.md](./08-HOW-TO-EXTEND.md) | Core Contributors, Feature Developers | Guidelines for adding new route groups, creating reusable UI primitives, safely adding external dependencies, built-in extension points, and antipatterns to avoid. |
| **09** | [09-BACKEND-API-DATABASE-GUIDE.md](./09-BACKEND-API-DATABASE-GUIDE.md) | Backend Engineers, Integrators | Complete REST API specification (`/api/contact`), instructions for adding new Route Handlers, database integration guide (Prisma / PostgreSQL / Supabase), and authentication/session strategy. |
| **10** | [10-GLOSSARY.md](./10-GLOSSARY.md) | All Readers | One-sentence definitions of project-specific, Next.js, TypeScript, and architectural terminology used throughout the documentation. |
| **11** | [11-FAQ-TROUBLESHOOTING.md](./11-FAQ-TROUBLESHOOTING.md) | Support, Onboarding Engineers | Troubleshooting table for runtime/build errors (Node path resolution, frontmatter validation, MDX rendering), plus documented codebase TODOs and technical debt notes. |

---

## Quick Reference: Core System Metadata

- **Application Name**: `developer-portfolio` (from [`package.json`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/package.json#L2))
- **Framework**: Next.js 14.2.15 (App Router with Server Components)
- **Runtime**: Node.js v20.18.0+ (ESNext, Bundler module resolution)
- **Primary Configuration**: [`next.config.mjs`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/next.config.mjs), [`tailwind.config.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/tailwind.config.ts), [`tsconfig.json`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/tsconfig.json)
- **Content Engine**: File-based headless Markdown parser in [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts) powered by `gray-matter` and `remark`
- **Contact API Endpoint**: HTTP `POST` [`/api/contact`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts)
