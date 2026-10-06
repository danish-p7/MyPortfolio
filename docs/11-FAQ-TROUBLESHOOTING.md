# 11 — FAQ, Troubleshooting & Technical Debt

## 1. Frequently Encountered Issues & Resolutions

Below is a guide to resolving errors that may surface during local development, content editing, or form submission.

### Troubleshooting Matrix

| Symptom or Error Message | Exact Code Location | Root Cause | Resolution |
|---|---|---|---|
| **`"Missing required fields."`** (HTTP 400) | [`app/api/contact/route.ts:L11`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts#L11) | One of `name`, `email`, `subject`, or `message` was empty or missing from the JSON payload sent to `/api/contact`. | Verify that client requests include all four fields in the request body. |
| **`"Invalid email address format."`** (HTTP 400) | [`app/api/contact/route.ts:L20`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts#L20) | The submitted email failed the regular expression check `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. | Provide a valid email syntax (e.g. `user@example.com`). |
| **`"Internal server error. Please try again."`** (HTTP 500) | [`app/api/contact/route.ts:L74`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts#L74) | The serverless route encountered an unhandled exception (e.g., malformed JSON payload). | Inspect your server terminal output for the stack trace logged by `console.error`. |
| **`"A network error occurred. Please try reaching out directly via email."`** | [`components/sections/ContactForm.tsx:L103`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ContactForm.tsx#L103) | The browser client was unable to connect to `/api/contact` (dev server stopped, offline, or CORS issue). | Ensure your local dev server is running on `http://localhost:3000`. |
| **Page Not Found (404) on `/projects/[slug]`** | [`app/projects/[slug]/page.tsx:L40`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/projects/[slug]/page.tsx#L40) | The slug requested does not match any `.md` or `.mdx` file in [`content/projects/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/projects). | Verify that the file name matches the URL slug exactly (e.g. `content/projects/my-project.md` for `/projects/my-project`). |
| **`node` or `npm` command not recognized on Windows** | PowerShell Console | Node binary directory is not in the active session's `$env:PATH`. | Run: `$env:PATH = "$env:LOCALAPPDATA\Programs\node\node-v20.18.0-win-x64;$env:PATH"` before running commands. |
| **Port 3000 Already in Use** | Terminal Console | Another process or background instance of Next.js is running on port 3000. | Run Next.js on an alternate port: `npm run dev -- -p 3001`, or terminate the lingering Node process in Task Manager. |

---

## 2. Visible Codebase TODOs & Integration Hooks

The following explicit `TODO` block is documented in the source code:

### Production Email Service Integration Hook
- **File**: [`app/api/contact/route.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts#L34-L62)
- **Status**: Currently, form submissions are validated and logged to stdout (`console.log`).
- **Options Outlined in Code**:
  1. **Option 1 (Resend)**: Recommended for Next.js. Requires `npm install resend` and setting `RESEND_API_KEY` in `.env.local`.
  2. **Option 2 (Formspree)**: Zero code changes required; swap the fetch URL in [`components/sections/ContactForm.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ContactForm.tsx#L83) to `https://formspree.io/f/YOUR_FORM_ID`.
  3. **Option 3 (SendGrid)**: Requires `@sendgrid/mail` and `SENDGRID_API_KEY`.

---

## 3. Known Limitations & Technical Debt Notes

1. **Dual Reading Time Implementation**:
   - In [`package.json`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/package.json#L17), the external library `reading-time` is installed.
   - However, in [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L125-L130), a custom `estimateReadingTime()` helper function is implemented directly:
     ```typescript
     function estimateReadingTime(text: string): string {
       const wordsPerMinute = 200;
       const words = text.trim().split(/\s+/).length;
       const minutes = Math.ceil(words / wordsPerMinute);
       return `${minutes} min read`;
     }
     ```
   - *Technical Debt*: The `reading-time` npm dependency is redundant and can be safely uninstalled (`npm uninstall reading-time`) without impacting functionality.

2. **Hardcoded Name / Resume Discrepancies**:
   - In [`lib/seo.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts#L4-L6), the author name is set to `"Danish Parveez"`.
   - In [`components/layout/Navbar.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/layout/Navbar.tsx#L55) and [`components/sections/Hero.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/Hero.tsx#L26), the display name is hardcoded to `"Alex Morgan"`.
   - In resume download links, the download filename is set to `"Alex_Morgan_Resume.pdf"`.
   - *Recommendation*: Refactor components to dynamically import `siteConfig.shortName` and `siteConfig.name` from [`lib/seo.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts) so that editing `siteConfig` updates all occurrences globally.

3. **Markdown Sanitization Policy**:
   - In [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L100), Remark processes HTML with `{ sanitize: false }`:
     ```typescript
     const processedContent = await remark().use(html, { sanitize: false }).process(content);
     ```
   - *Security Note*: Because markdown files reside locally within the developer's trusted repository and are not submitted by untrusted third-party web visitors, disabling sanitization allows rich formatting (like raw SVG or embedded HTML). However, if user-generated content is ever accepted in the future, sanitization via `rehype-sanitize` should be enabled.
