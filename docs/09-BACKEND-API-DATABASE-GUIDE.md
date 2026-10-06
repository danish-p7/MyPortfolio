# 09 — Backend API & Database Integration Guide

## 1. Current API Surface

The backend surface of this application is implemented using Next.js 14 **Route Handlers** located under [`app/api/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api). These endpoints execute in a secure, serverless Node.js / Edge environment.

### API Endpoint Matrix

| Path | Method | Auth Required | Content-Type | Request Body Shape | Response Status & Shape |
|---|---|---|---|---|---|
| **`/api/contact`** | `POST` | None (Public) | `application/json` | `{ name: string, email: string, subject: string, message: string }` | **200 OK**: `{ success: true, message: string }`<br/>**400 Bad Request**: `{ success: false, error: string }`<br/>**500 Internal Error**: `{ success: false, error: string }` |

---

## 2. Deep Dive: The `/api/contact` Route Handler

The contact endpoint source code is located at [`app/api/contact/route.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts).

```typescript
// From app/api/contact/route.ts (lines 3-33)
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address format." },
        { status: 400 }
      );
    }

    // Server log stub for review during development
    console.log("------------------------------------------");
    console.log("[Portfolio Contact Form Submission Received]");
    console.log("Timestamp:", new Date().toISOString());
    console.log("From:", name, `<${email}>`);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("------------------------------------------");

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully. Thank you for reaching out!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
```

---

## 3. How to Add a New API Endpoint

To create a new backend endpoint following the project's established conventions (for example, a newsletter subscription route at `POST /api/newsletter`):

### Step 1: Create the Directory and File
Create `app/api/newsletter/route.ts`:

```typescript
// app/api/newsletter/route.ts
import { NextResponse } from "next/server";

interface NewsletterPayload {
  email?: string;
}

export async function POST(request: Request) {
  try {
    const body: NewsletterPayload = await request.json();

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Process subscription logic (e.g., Mailchimp, ConvertKit, database insert)
    console.log("[Newsletter Signup]:", body.email);

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
```

### Step 2: Prevent Crawlers from Indexing the API
[`app/robots.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/robots.ts#L9) already disallows `/api/` globally:
```typescript
disallow: ["/api/"]
```
All new sub-routes created under `app/api/` are automatically protected from search bot indexing.

---

## 4. How to Connect an External Database (Prisma ORM & PostgreSQL)

If your architecture evolves to require persistent database storage (for example, saving contact inquiries, project views, or interactive comments):

### Step 1: Install Prisma ORM
```bash
npm install @prisma/client
npm install -D prisma
```

### Step 2: Initialize Prisma Schema
```bash
npx prisma init
```
This creates a `prisma/schema.prisma` file and a `.env` template.

### Step 3: Define the Data Model (`prisma/schema.prisma`)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Inquiry {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  createdAt DateTime @default(now())
}
```

### Step 4: Create a Singleton Database Client (`lib/db.ts`)
In Next.js development, hot-reloading can instantiate redundant database connections. Create a cached client:

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

### Step 5: Save Inquiries Inside the Route Handler
In [`app/api/contact/route.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts):
```typescript
import { db } from "@/lib/db";

// Inside POST handler:
await db.inquiry.create({
  data: { name, email, subject, message },
});
```

---

## 5. Authentication, Sessions & Permissions Strategy

### Current Status
There is **no authentication or session management system currently implemented** in this codebase.
- **Why (Explicit/Inferred)**: *Inferred*: Because this is an open public developer portfolio, all case studies, blog articles, and skill grids are intended to be globally readable and indexable by search engines. The only write operation is the public contact form, which requires no authentication.

### How to Add Authentication (e.g. NextAuth.js or Clerk)
If you build a private administrative dashboard (e.g. `/admin`) to edit Markdown files or view received inquiries:
1. Install NextAuth.js: `npm install next-auth`
2. Create `app/api/auth/[...nextauth]/route.ts` configuring GitHub OAuth or credentials.
3. Protect private paths using standard Next.js middleware in `middleware.ts`:
   ```typescript
   export { default } from "next-auth/middleware";
   export const config = { matcher: ["/admin/:path*"] };
   ```
