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
RESTAURANT_TIME_ZONE=Europe/London
MERCHANT_DASHBOARD_TOKEN=
RESEND_API_KEY=
ORDER_EMAIL_FROM=Jamal's Indian Restaurant <orders@your-verified-domain.co.uk>
ORDER_EMAIL_REPLY_TO=info@jamals-saffron.co.uk
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Cash orders are saved directly to Supabase. Online card orders are created in
Supabase first, then Stripe confirms payment through `/api/stripe/webhook`.
Table reservations are saved through `/api/reservations` and can be viewed at
`/merchant/reservations?token=MERCHANT_DASHBOARD_TOKEN`. Website orders can be
viewed in the merchant app at `/merchant/orders?token=MERCHANT_DASHBOARD_TOKEN`,
including placed date/time, ready estimates, order items, and date filtering.
Online card orders are saved as awaiting payment until Stripe confirms payment;
only paid online orders and cash orders appear in the merchant app. Orders are
accepted manually from the merchant app.
The merchant app also controls live ordering status, prep time, and the support
phone stored in `restaurant_operations`.
When the merchant marks an order ready, customer tracking changes to the ready
message for collection or delivery, and a ready/on-the-way email is sent if the
Resend email variables are configured.

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
