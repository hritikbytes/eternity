# Eternity Matrimony

A full-stack matchmaking web application built with Next.js, Supabase, and PostgreSQL. It allows users to register, build a structured multi-step profile, discover compatible matches through granular filters, and send bi-directional connection requests.

**Live Demo:** https://eternity-snowy.vercel.app  
**Status:** Personal project / deployed demo

---

## Preview

| Desktop | Mobile |
|:---:|:---:|
| <a href="https://eternity-snowy.vercel.app"><img src="./screenshots/home.png" alt="Eternity Matrimony desktop preview" width="100%"></a> | <a href="https://eternity-snowy.vercel.app"><img src="./screenshots/mobile.png" alt="Eternity Matrimony mobile preview" width="100%"></a> |

---

## What It Does

- **Multi-Step Profile Onboarding (`/profile/setup`):** 3-stage profile setup (Personal, Professional, Lifestyle) validated with React Hook Form & Zod, supporting Cloudinary image uploads.
- **Profile Discovery & Search (`/search` & `/dashboard`):** Filter profiles by age range, religion, community, education, income bracket, and location with server-side query construction.
- **Connection Workflow (`/requests`):** State-machine lifecycle for connection requests (`pending` ➔ `accepted`, `rejected`, or `cancelled`) with mutual authorization guards.
- **Role-Based Admin Panel (`/admin`):** Overview of registered users, premium tier toggles, user search, and moderation actions restricted to admin role.
- **Auth & Route Protection:** Email/password authentication via Supabase Auth. Route guarding and cookie session synchronization handled by Next.js 16 request proxy (`src/proxy.ts`).
- **Landing & Discovery Pages:**
  - `/` — Hero banner, verified member showcase, couple testimonials, and trust indicators.
  - `/how-it-works` — 3-step walkthrough and platform verification standards.
  - `/success-stories` — Story highlights and platform statistics.

---

## Implementation Details

### 1. Bidirectional Connection Request Lifecycle
Rather than treating connections as simple boolean flags, the application models requests through explicit states:
- `pending`: Request sent; sender can cancel, receiver can accept or reject.
- `accepted`: Mutual connection established.
- `rejected` / `cancelled`: Terminal states preventing duplicate pending requests.

The server action (`updateInterestStatus`) verifies user ownership before allowing state mutations: only the original sender can cancel a request, and only the recipient can accept or reject it. Furthermore, `sendInterest` checks for reverse requests (`sender_id = receiver AND receiver_id = sender`) in PostgreSQL to prevent duplicate or conflicting invitations.

### 2. Dynamic SQL Query Construction & Pattern Sanitization
The search engine (`searchProfiles`) converts user criteria into Supabase PostgreSQL queries on the server:
- Converts human age intervals (e.g. 21–30) into exact ISO date-of-birth boundaries using `lte` and `gte`.
- Escapes special `LIKE` characters (`%`, `_`, `\`) on free-text city inputs to prevent pattern-matching injection.
- Implements server-side pagination with exact total counts to keep page payloads minimal.

### 3. Next.js 16 Request Proxy & Session Sync
Under Next.js 16, route protection and session refreshing are managed via `src/proxy.ts` using `@supabase/ssr`. Unauthenticated requests to protected prefixes (`/dashboard`, `/profile`, `/search`, `/requests`, `/admin`) are redirected to `/login?next=...` while session cookies are refreshed across response headers without client-side waterfalls or React re-renders.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions, Request Proxy)
- **Frontend:** React 19, TypeScript, Tailwind CSS v4 (OKLCH color system)
- **UI Primitives:** Base UI / Radix-compatible primitives, Framer Motion, Lucide React, Sonner
- **Forms & Validation:** React Hook Form, Zod
- **Backend & Database:** Supabase (Auth, PostgreSQL, Row Level Security)
- **Media:** Cloudinary (via `next-cloudinary`)
- **Deployment:** Vercel

---

## Project Structure

```text
├── public/                 # Static assets, hero visuals, default avatar SVG
├── screenshots/            # Desktop and mobile UI previews
├── src/
│   ├── app/
│   │   ├── (auth)/         # /login, /signup, /forgot-password
│   │   ├── (dashboard)/    # /dashboard, /profile, /search, /requests
│   │   ├── admin/          # Admin stats & user management
│   │   ├── api/auth/       # Supabase auth callback
│   │   ├── how-it-works/   # Platform process explainer
│   │   ├── success-stories/# Testimonials page
│   │   ├── globals.css     # Tailwind v4 OKLCH theme definitions
│   │   └── page.tsx        # Public landing page
│   ├── components/         # Shared navbar, footer, avatar, and UI primitives
│   ├── features/
│   │   ├── admin/          # Admin queries & user table
│   │   ├── auth/           # Auth server actions & forms
│   │   ├── dashboard/      # Matches grid & profile card
│   │   ├── interests/      # Connection request lifecycle actions & list
│   │   ├── landing/        # Hero, showcase, and social proof components
│   │   ├── profiles/       # Multi-step profile form & profile actions
│   │   └── search/         # Filter sidebar & dynamic query actions
│   ├── lib/
│   │   ├── supabase/       # Browser client, server client, and database types
│   │   └── utils.ts        # Tailwind merge utility
│   └── proxy.ts            # Next.js 16 request proxy & route protection
```

---

## Local Development

### 1. Clone & Install

```bash
git clone https://github.com/hritikbytes/eternity.git
cd eternity
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 3. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To test the production build:

```bash
npm run build
npm run start
```

---

## Author

**Hritik Sharma**
- GitHub: [@hritikbytes](https://github.com/hritikbytes)
- LinkedIn: [linkedin.com/in/hritiksharma0608](https://www.linkedin.com/in/hritiksharma0608/)
- Email: hritiksharma.0608@gmail.com
