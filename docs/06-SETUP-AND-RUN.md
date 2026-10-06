# 06 — Setup, Local Development & Deployment Runbook

## 1. System Prerequisites

To run, build, and deploy this project locally or in CI/CD environments, ensure your environment meets the following specifications:

| Requirement | Minimum Supported | Recommended / Verified in Repo |
|---|---|---|
| **Operating System** | Windows 10/11, macOS 12+, or Ubuntu 20.04+ | Windows 11 64-bit |
| **Node.js Runtime** | Node.js `>= 18.17.0` | **Node.js `v20.18.0`** (LTS) |
| **Package Manager** | npm `>= 9.0.0` | **npm `v10.8.2`** |
| **Hardware** | 2 CPU Cores, 4GB RAM | 4+ CPU Cores, 8GB RAM |

> [!NOTE]
> On Windows machines where Node is installed in user application data, you can prepend the local Node binary path to your current PowerShell session before executing commands:
> ```powershell
> $env:PATH = "$env:LOCALAPPDATA\Programs\node\node-v20.18.0-win-x64;$env:PATH"
> ```

---

## 2. Installation & Initial Setup

1. **Clone or Navigate to the Repository Root**:
   ```bash
   cd MyPortfolio
   ```

2. **Install Node Dependencies**:
   Execute a clean dependency installation:
   ```bash
   npm install
   ```
   *This reads [`package.json`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/package.json) and resolves the frozen dependency tree in `package-lock.json`.*

3. **Configure Environment Variables (Optional)**:
   The application works 100% out-of-the-box without any `.env` file for local static content browsing and development.
   If you wish to enable production email delivery via **Resend** instead of logging contact inquiries to stdout:
   
   Create a `.env.local` file in the project root:
   ```env
   # Optional: For transactional emails via Resend in app/api/contact/route.ts
   RESEND_API_KEY=re_your_api_key_here
   ```

---

## 3. Local Development

Start the Next.js local development server with hot module reloading (HMR):

### On Windows (PowerShell):
```powershell
$env:PATH = "$env:LOCALAPPDATA\Programs\node\node-v20.18.0-win-x64;$env:PATH"
npm run dev
```

### On macOS / Linux / Bash:
```bash
npm run dev
```

Once initialized, open your browser and navigate to:
```
http://localhost:3000
```

- Any edits made in [`content/projects/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/projects) or [`content/blog/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/blog) will hot-reload in the browser immediately upon saving the file.
- Contact form submissions will print formatted debug logs to your active terminal window.

---

## 4. Code Quality, Type Verification & Linting

Before pushing commits or publishing changes, verify that the project is free of syntax errors, broken imports, or missing frontmatter attributes:

### 1. Run ESLint
Runs Next.js and React ESLint rules defined in [`package.json`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/package.json#L9):
```bash
npm run lint
```

### 2. Run TypeScript Static Type Checking
Compiles the entire codebase in strict mode without emitting JavaScript to guarantee no broken types:
```powershell
$env:PATH = "$env:LOCALAPPDATA\Programs\node\node-v20.18.0-win-x64;$env:PATH"
npx tsc --noEmit
```

---

## 5. Production Compilation & Verification

To verify that all Markdown case studies, dynamic slugs, and static routes compile properly without runtime exceptions:

### 1. Build the Production Bundle
```powershell
$env:PATH = "$env:LOCALAPPDATA\Programs\node\node-v20.18.0-win-x64;$env:PATH"
npm run build
```

The Next.js build output will display the route tree, confirming static generation (SSG) for all paths:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    ... kB         ... kB
├ ○ /_not-found                          ... kB         ... kB
├ ƒ /api/contact                         ... kB         ... kB
├ ○ /blog                                ... kB         ... kB
├ ● /blog/[slug]                         ... kB         ... kB
│ ├ /blog/building-scalable-web-applications
│ └ /blog/clean-architecture-in-typescript
├ ○ /contact                             ... kB         ... kB
├ ○ /projects                            ... kB         ... kB
├ ● /projects/[slug]                     ... kB         ... kB
│ ├ /projects/cloud-orchestration-tool
│ ├ /projects/developer-portfolio-template
│ └ /projects/enterprise-analytics-platform
├ ○ /robots.txt                          ... kB         ... kB
└ ○ /sitemap.xml                         ... kB         ... kB
+ First Load JS shared by all            ... kB
```
*Legend: `○` (Static route rendered as HTML), `●` (SSG route generated via `generateStaticParams`), `ƒ` (Dynamic serverless Route Handler).*

### 2. Run the Production Build Locally
```bash
npm run start
```
Spins up the optimized server on `http://localhost:3000` to inspect production performance and asset caching.

---

## 6. Zero-Config Production Deployment

### Option A: Deploying to Vercel (Recommended)
Because this application is constructed using standard Next.js 14 conventions:
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Vercel automatically detects Next.js, sets the build command to `npm run build`, and configures output caching.
4. If you use Resend, add `RESEND_API_KEY` under **Environment Variables**.
5. Click **Deploy**. Your site will be live worldwide with automated HTTPS and edge caching in under 60 seconds.

### Option B: Deploying to Netlify
1. Connect your repository in [netlify.com](https://netlify.com).
2. Netlify detects the Next.js framework and installs the `@netlify/plugin-nextjs`.
3. Build command: `npm run build`, Publish directory: `.next`.
4. Deploy the site.
