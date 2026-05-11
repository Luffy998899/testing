-- Formula 19 production schema (Supabase PostgreSQL)

create extension if not exists "uuid-ossp";

create type product_category as enum ('Tires', 'Custom Rims', 'Packages', 'Seasonal Deals');
create type vehicle_type as enum ('Car', 'SUV', 'Truck');
create type seasonal_type as enum ('All Season', 'Summer', 'Winter');

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category product_category not null,
  brand text not null,
  size text not null,
  specs text not null,
  price numeric(10,2) not null,
  in_stock boolean default true,
  featured boolean default false,
  on_sale boolean default false,
  image text not null,
  vehicle_type vehicle_type not null,
  seasonal seasonal_type not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  vehicle text not null,
  tire_size text not null,
  appointment_date date not null,
  notes text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  contact text not null,
  message text not null,
  source text default 'website',
  created_at timestamptz default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default uuid_generate_v4(),
  image text not null,
  title text not null,
  caption text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  rating int not null check (rating between 1 and 5),
  quote text not null,
  vehicle text,
  approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  hero_headline text not null,
  hero_subheadline text not null,
  phone text not null,
  whatsapp text not null,
  email text not null,
  address text not null,
  instagram text,
  facebook text,
  twitter text,
  seo_title text,
  seo_description text,
  updated_at timestamptz default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key,
  full_name text,
  role text not null check (role in ('admin', 'manager', 'editor')),
  created_at timestamptz default now()
);

alter table public.products enable row level security;
alter table public.bookings enable row level security;
alter table public.inquiries enable row level security;
alter table public.gallery_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_profiles enable row level security;

create policy "Public read products" on public.products for select using (true);
create policy "Public insert bookings" on public.bookings for insert with check (true);
create policy "Public insert inquiries" on public.inquiries for insert with check (true);

create policy "Admin full products" on public.products for all using (
  exists (
    select 1 from public.admin_profiles p
    where p.id = auth.uid() and p.role in ('admin', 'manager')
  )
) with check (
  exists (
    select 1 from public.admin_profiles p
    where p.id = auth.uid() and p.role in ('admin', 'manager')
  )
);

create policy "Admin manage content" on public.gallery_items for all using (
  exists (
    select 1 from public.admin_profiles p
    where p.id = auth.uid() and p.role in ('admin', 'manager', 'editor')
  )
) with check (
  exists (
    select 1 from public.admin_profiles p
    where p.id = auth.uid() and p.role in ('admin', 'manager', 'editor')
  )
);

create policy "Admin read bookings" on public.bookings for select using (
  exists (
    select 1 from public.admin_profiles p
    where p.id = auth.uid() and p.role in ('admin', 'manager', 'editor')
  )
);

create policy "Admin read inquiries" on public.inquiries for select using (
  exists (
    select 1 from public.admin_profiles p
    where p.id = auth.uid() and p.role in ('admin', 'manager', 'editor')
  )
);

create policy "Admin settings" on public.site_settings for all using (
  exists (
    select 1 from public.admin_profiles p
    where p.id = auth.uid() and p.role in ('admin', 'manager')
  )
) with check (
  exists (
    select 1 from public.admin_profiles p
    where p.id = auth.uid() and p.role in ('admin', 'manager')
  )
);
