-- Multi-tenant hardening for shared Supabase project
-- Run this once in your shared database.
-- Safe to run multiple times.

-- 1) Ensure tenant-scoped uniqueness for orders
-- Some databases have a UNIQUE CONSTRAINT named orders_order_number_key
-- (which owns an index with the same name). In that case, drop constraint first.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.orders'::regclass
      AND conname = 'orders_order_number_key'
  ) THEN
    ALTER TABLE public.orders DROP CONSTRAINT orders_order_number_key;
  END IF;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND indexname = 'orders_order_number_key'
  ) THEN
    DROP INDEX public.orders_order_number_key;
  END IF;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS orders_restaurant_order_number_key
  ON public.orders (restaurant_id, order_number);

-- 2) Ensure tenant-scoped uniqueness for reservations
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.reservations'::regclass
      AND conname = 'reservations_reference_key'
  ) THEN
    ALTER TABLE public.reservations DROP CONSTRAINT reservations_reference_key;
  END IF;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND indexname = 'reservations_reference_key'
  ) THEN
    DROP INDEX public.reservations_reference_key;
  END IF;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS reservations_restaurant_reference_key
  ON public.reservations (restaurant_id, reservation_reference);

-- 3) Helpful tenant indexes (safe if already exists)
CREATE INDEX IF NOT EXISTS orders_restaurant_status_created_idx
  ON public.orders (restaurant_id, order_status, created_at DESC);

CREATE INDEX IF NOT EXISTS reservations_restaurant_status_date_idx
  ON public.reservations (restaurant_id, status, reservation_date, reservation_time);

-- 4) Seed operations rows for known restaurants
INSERT INTO public.restaurant_operations (
  restaurant_id,
  store_status,
  prep_time_minutes,
  support_phone
)
VALUES
  ('jamals', 'open', 20, '01234 567890'),
  ('bengal-restaurant', 'open', 20, '01296 712222')
ON CONFLICT (restaurant_id) DO UPDATE
SET
  prep_time_minutes = EXCLUDED.prep_time_minutes,
  support_phone = EXCLUDED.support_phone,
  updated_at = now();

-- 5) Validation checks you can run after migration
-- SELECT restaurant_id, count(*) FROM public.orders GROUP BY restaurant_id ORDER BY restaurant_id;
-- SELECT restaurant_id, count(*) FROM public.reservations GROUP BY restaurant_id ORDER BY restaurant_id;

NOTIFY pgrst, 'reload schema';
