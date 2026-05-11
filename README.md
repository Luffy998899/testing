# Formula 19 - All About Tires

Premium automotive eCommerce storefront and admin dashboard built with Next.js 15, TypeScript, Tailwind, Framer Motion, GSAP, Three.js/R3F, Supabase, and Cloudinary-ready integrations.

## Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS + custom premium design system
- Framer Motion + GSAP + Lenis smooth scrolling
- Three.js with React Three Fiber for hero wheel
- Swiper sliders
- React Hook Form + Zod
- Supabase auth/data architecture + SQL schema
- API routes for products, bookings, inquiries, and CMS settings

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Fill Supabase and Cloudinary keys in .env.local.

4. Run dev server:

```bash
npm run dev
```

## Supabase Setup

1. Create a Supabase project.
2. Run [supabase/schema.sql](supabase/schema.sql) in SQL editor.
3. In Supabase Auth, create admin users.
4. Insert matching rows into admin_profiles with role admin/manager/editor.

## Vercel Deployment

1. Push repository to GitHub.
2. Import project into Vercel.
3. Set environment variables from .env.example.
4. Build command: npm run build
5. Output: Next.js default

## Feature Coverage

- Cinematic homepage and 3D hero wheel experience
- Sticky glass navbar and floating contact actions
- Product cards with WhatsApp deep link prefill
- Advanced product filter UX
- Services, stats, gallery lightbox, testimonials carousel
- Booking and lead capture forms
- Admin dashboard with analytics, product management, CMS settings editor
- API routes and schema-driven validation
- Local SEO pages, metadata, sitemap, robots, and schema markup

## Important Notes

- The repository uses in-memory fallback data layer in src/lib/db.ts for quick preview.
- Replace fallback calls with Supabase queries for persistent production data.
- Add real logo asset under public and replace text placeholder branding.
