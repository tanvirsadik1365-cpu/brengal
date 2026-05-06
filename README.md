# Jamal's Restaurant Site

A Next.js site for Jamal's Indian Restaurant in Oxford. It includes a public
landing page, menu ordering interface, gallery, booking page, reviews, FAQs,
contact page, sitemap, and robots metadata.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

From the repository root, you can run the same app through the forwarding
scripts:

```bash
npm run install:frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app` - App Router pages and SEO metadata.
- `src/components` - Shared UI such as the header, footer, intro, and menu client.
- `src/lib/restaurant.ts` - Restaurant content, menu data, offers, reviews, and FAQs.
- `public/jamals` - Local restaurant brand imagery.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
```

## Configuration

Set `NEXT_PUBLIC_SITE_URL` for production sitemap, robots, and metadata URLs.
If unset, the app defaults to `https://jamals-saffron.co.uk`.

Order checkout requires Supabase and Stripe environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESTAURANT_ID=jamals-restaurant
MERCHANT_DASHBOARD_TOKEN=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Cash orders are saved directly to Supabase. Online card orders are created in
Supabase first, then Stripe confirms payment through `/api/stripe/webhook`.
Table reservations are saved through `/api/reservations` and can be viewed at
`/merchant/reservations?token=MERCHANT_DASHBOARD_TOKEN`.

Run `supabase/customer_orders_and_store_status.sql` in the Supabase SQL editor
to create or update the ordering, account history, reservations, order tracking,
and store status schema. It is safe to run more than once.

## Brand

- Font: Satoshi, loaded from Fontshare with system fallbacks.
- Primary color: `#893E3D`.
- Cream color: `#F1EBDA`.
- Supporting neutrals are limited to white and near-black for readability.

## Deploy

This app can be deployed on Vercel or any platform that supports Next.js.
