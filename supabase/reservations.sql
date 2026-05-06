create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  restaurant_id text not null default 'jamals-restaurant',
  customer_id uuid references public.customers(id) on delete set null,
  customer_auth_user_id uuid references auth.users(id) on delete set null,
  reservation_reference text not null unique,
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  reservation_date date not null,
  reservation_time text not null,
  guests integer not null check (guests between 1 and 200),
  occasion text,
  special_requests text,
  status text not null default 'new',
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reservations_restaurant_date_idx
  on public.reservations (restaurant_id, reservation_date, reservation_time);

create index if not exists reservations_customer_auth_user_idx
  on public.reservations (customer_auth_user_id);

create index if not exists reservations_guest_email_idx
  on public.reservations (guest_email);

alter table public.reservations enable row level security;

drop policy if exists "Customers can read their reservations" on public.reservations;
create policy "Customers can read their reservations"
  on public.reservations
  for select
  using (auth.uid() = customer_auth_user_id);

drop policy if exists "Customers can create their reservations" on public.reservations;
create policy "Customers can create their reservations"
  on public.reservations
  for insert
  with check (auth.uid() = customer_auth_user_id);
