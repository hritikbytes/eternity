# Eternity Matrimony

A matchmaking web application built with Next.js, Supabase, and PostgreSQL.

Users can create a profile, search for matches using multiple filters, and manage connection requests.

**Live:** https://eternity-snowy.vercel.app/

## Screenshots

| Desktop | Mobile |
|:---:|:---:|
| <a href="https://eternity-snowy.vercel.app"><img src="./screenshots/home.png" alt="Eternity Matrimony desktop preview" width="100%"></a> | <a href="https://eternity-snowy.vercel.app"><img src="./screenshots/mobile.png" alt="Eternity Matrimony mobile preview" width="100%"></a> |

## What I built

- Multi-step profile setup for personal, professional, and lifestyle information
- Profile discovery with filters for age, location, education, income, religion, and community
- Connection requests with pending, accepted, rejected, and cancelled states
- Supabase authentication and PostgreSQL database
- Row-level security for database access
- Admin area for managing users and profiles
- Cloudinary image uploads
- Responsive UI for desktop and mobile

## Things worth looking at

### Connection requests

Requests are stored with an explicit status instead of treating a connection as a simple boolean.

The server-side actions check whether the current user is allowed to perform each transition. For example, the sender can cancel a pending request, while the recipient can accept or reject it.

Reverse requests are also checked so two users cannot create conflicting requests with each other.

### Search

The search filters are handled on the server and translated into Supabase queries.

Age ranges are converted into date-of-birth boundaries, and the results are paginated instead of loading every profile at once.

### Auth and access control

Supabase Auth handles authentication and sessions.

Protected routes are checked through `src/proxy.ts`, while database access is further restricted with PostgreSQL Row Level Security.

## Stack

Next.js · React · TypeScript · Tailwind CSS · Supabase · PostgreSQL · Zod · React Hook Form · Cloudinary

## Run locally

    git clone https://github.com/hritikbytes/eternity.git
    cd eternity
    npm install

Create `.env.local` from `.env.example` and add the required Supabase and Cloudinary values.

Then run:

    npm run dev

For a production build:

    npm run build
    npm run start

## Status

Personal project / deployed demo.
