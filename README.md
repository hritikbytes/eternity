# Eternity Matrimony

> A full-stack matchmaking web application built to explore profile discovery, structured onboarding, secure connection workflows, and server-side authorization.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://eternity-snowy.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-B08D57?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

**Live application:** https://eternity-snowy.vercel.app/

---

## Overview

Eternity Matrimony is an independently developed full-stack project built with Next.js, TypeScript, Supabase, and PostgreSQL.

The project explores how a modern matchmaking application can handle detailed user profiles, multi-parameter discovery, authentication, authorization, and connection requests while keeping sensitive operations on the server.

It was built as a personal project to strengthen full-stack development skills and experiment with application architecture, database security, validation, and responsive UI design.

---

## 📸 Preview

| Home Page | Mobile Responsive |
|:---:|:---:|
| ![Eternity Matrimony desktop preview](./screenshots/home.png) | ![Eternity Matrimony mobile preview](./screenshots/mobile.png) |

---

## ✨ Core Features

### 👤 Profile & Onboarding

- Structured profile creation flow
- Personal, professional, and lifestyle information
- Client-side form handling with React Hook Form
- Schema validation with Zod
- Server-side validation before database mutations
- Cloudinary-based profile media management

### 🔎 Profile Discovery

Users can discover profiles using multiple search parameters:

- Location
- Age range
- Community
- Education
- Income tier
- Marital status

Search results are rendered through the Next.js application and backed by PostgreSQL queries.

### 🤝 Connection Requests

The application uses an explicit connection lifecycle:

```text
Pending
   │
   ├── Accept ──────► Accepted
   │
   ├── Reject ──────► Rejected
   │
   └── Cancel ──────► Cancelled
```

Connection state is persisted in PostgreSQL and validated server-side before mutations are performed.

### 🔐 Authentication & Authorization

- Supabase Authentication
- Server-side session verification
- Protected application routes
- Authenticated dashboard access
- Authorization checks for user actions
- PostgreSQL Row Level Security (RLS)

### 🎨 Responsive UI

- Responsive desktop and mobile layouts
- Dark and light theme support
- Tailwind CSS v4
- OKLCH-based color system
- Framer Motion animations
- Loading and shimmer states
- Toast notifications with Sonner
- Reusable UI components

---

## 🏗️ Architecture

The project uses the Next.js App Router with Supabase handling authentication and PostgreSQL providing the primary data layer.

```text
                         ┌─────────────────────┐
                         │       Browser       │
                         │   React / Next.js   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Next.js 16      │
                         │     App Router      │
                         │                     │
                         │ Server Components   │
                         │ Server Actions      │
                         │ Middleware          │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
             ┌───────────┐   ┌────────────┐   ┌─────────────┐
             │ Supabase  │   │ PostgreSQL │   │ Cloudinary  │
             │   Auth    │   │    + RLS   │   │    Media    │
             └───────────┘   └────────────┘   └─────────────┘
                                    │
                                    ▼
                             ┌────────────┐
                             │   Vercel   │
                             └────────────┘
```

### Request & Authorization Flow

```text
User Interaction
       │
       ▼
Next.js UI
       │
       ▼
Server Action / Route
       │
       ├── Verify Supabase Session
       │
       ├── Validate Request with Zod
       │
       ├── Check Authorization
       │
       ▼
PostgreSQL
       │
       ├── Row Level Security
       │
       ▼
Database Mutation
       │
       ▼
revalidatePath()
       │
       ▼
Updated Server UI
```

---

## 🔐 Security Approach

The project treats client-side validation as a user-experience feature rather than a security boundary.

### Server-Side Validation

User-submitted data is validated with Zod before database operations.

```text
Client Input
     ↓
Zod Validation
     ↓
Authenticated Session
     ↓
Authorization Check
     ↓
Database Operation
```

### Authentication

Supabase Authentication manages user identity and sessions.

Server-side operations verify the active authenticated user before allowing protected mutations.

### PostgreSQL Row Level Security

PostgreSQL RLS provides database-level access control in addition to application-level authorization.

This helps ensure that authenticated users can only access or modify records allowed by the configured database policies.

### Route Protection

Application areas such as:

```text
/dashboard
/profile
/search
/requests
```

are protected through authentication and authorization checks.

---

## 🧠 Engineering Decisions

### Server-side validation

Client-side validation can be bypassed, so important profile and connection operations are validated again on the server before reaching the database.

This creates a clear boundary between user input and database mutations.

### Supabase + PostgreSQL RLS

Supabase provides authentication and PostgreSQL infrastructure while RLS adds database-level authorization policies.

This avoids relying entirely on frontend route protection for sensitive data access.

### Server Actions for mutations

State-changing operations are handled through server-side application logic so authentication, validation, authorization, and database mutations can be performed in a controlled environment.

### Explicit connection states

Connection requests use explicit states instead of a simple boolean relationship:

```text
pending
accepted
rejected
cancelled
```

This makes the lifecycle easier to reason about and allows different actions depending on the current state.

### Cache revalidation

After relevant mutations, `revalidatePath()` is used to invalidate affected routes and ensure subsequent server renders reflect updated connection state.

This avoids depending on continuous client-side polling for basic state synchronization.

---

## 🎨 UI & Design

The interface uses a custom visual system built with Tailwind CSS v4.

### Design System

- OKLCH-based color definitions
- Dark/light theme support
- Responsive layouts
- Reusable UI primitives
- Consistent spacing and typography

### Interaction

- Framer Motion animations
- Hover and focus transitions
- Loading/shimmer states
- Toast notifications
- Responsive navigation
- Mobile-specific layout adjustments

The visual direction focuses on creating a premium matchmaking experience while keeping the interface responsive and functional across screen sizes.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** — App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React**
- **Radix UI primitives**
- **Sonner**

### Backend & Database

- **Next.js Server Actions / Route Handlers**
- **Supabase**
- **PostgreSQL**
- **PostgreSQL Row Level Security**
- **Supabase Auth / SSR**

### Forms & Validation

- **React Hook Form**
- **Zod**

### Media

- **Cloudinary**

### Development & Deployment

- **ESLint**
- **Git / GitHub**
- **Vercel**

---

## 📁 Project Structure

```text
eternity/
│
├── public/
│
├── screenshots/
│   ├── home.png
│   └── mobile.png
│
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── search/
│   │   ├── requests/
│   │   └── ...
│   │
│   ├── components/
│   ├── lib/
│   └── ...
│
├── .env.example
├── next.config.*
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm
- Supabase project
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/hritikbytes/eternity.git
cd eternity
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Never commit `.env.local` or production credentials to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔧 Environment Variables

| Variable | Purpose | Required |
|---|---|:---:|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Application URL | Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud identifier | Yes |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API access | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

---

## 📋 Application Flow

```text
                         Landing Page
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
          Create Profile              Discover Profiles
                │                           │
                ▼                           ▼
          Profile Setup                Search Filters
                │                           │
                └─────────────┬─────────────┘
                              ▼
                        View Profile
                              │
                              ▼
                  Send Connection Request
                              │
                              ▼
                          Pending
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
             Accepted      Rejected      Cancelled
```

---

## 🧪 Future Improvements

The current project can be extended with:

- [ ] Automated unit and integration tests
- [ ] End-to-end testing with Playwright
- [ ] Connection notifications
- [ ] Messaging between accepted connections
- [ ] Saved searches and profiles
- [ ] Advanced compatibility matching
- [ ] Improved profile verification
- [ ] Enhanced admin moderation
- [ ] Search and database query optimization
- [ ] CI checks for linting, testing, and production builds
- [ ] Error monitoring and observability

These items represent future development rather than functionality currently claimed as implemented.

---

## 📊 Project Status

**Status:** Personal project / deployed demo

Eternity Matrimony is an independently developed project created to explore full-stack web application development using Next.js, TypeScript, Supabase, PostgreSQL, and Cloudinary.

The application is deployed on Vercel for demonstration purposes.

---

## 👨‍💻 Developer

**Hritik Sharma**

Web Developer focused on React, Next.js, TypeScript, and modern full-stack web applications.

- **GitHub:** [@hritikbytes](https://github.com/hritikbytes)
- **LinkedIn:** [linkedin.com/in/hritiksharma0608](https://www.linkedin.com/in/hritiksharma0608/)
- **Email:** [hritiksharma.0608@gmail.com](mailto:hritiksharma.0608@gmail.com)

---

<div align="center">

**Built by Hritik Sharma**

[Live Demo](https://eternity-snowy.vercel.app/) · [GitHub Repository](https://github.com/hritikbytes/eternity)

</div>
