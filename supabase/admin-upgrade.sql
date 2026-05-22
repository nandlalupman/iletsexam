alter table tests add column if not exists audio_path text;
alter table tests add column if not exists audio_url text;

create table if not exists site_settings (
  id text primary key default 'main',
  site_name text not null default 'IELTS.my',
  contact_email text,
  support_phone text,
  whatsapp_number text,
  currency text not null default 'EUR',
  course_price text,
  guarantee_text text,
  booking_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table site_settings add column if not exists contact_email text;
alter table site_settings add column if not exists support_phone text;
alter table site_settings add column if not exists whatsapp_number text;
alter table site_settings add column if not exists currency text not null default 'EUR';
alter table site_settings add column if not exists course_price text;
alter table site_settings add column if not exists guarantee_text text;
alter table site_settings add column if not exists booking_enabled boolean not null default true;
alter table site_settings add column if not exists updated_at timestamptz not null default now();

create table if not exists content_blocks (
  id uuid primary key default gen_random_uuid(),
  block_type text not null,
  title text not null,
  body text,
  metadata jsonb default '{}'::jsonb,
  status text not null default 'draft',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table content_blocks add column if not exists block_type text not null default 'general';
alter table content_blocks add column if not exists title text not null default '';
alter table content_blocks add column if not exists body text;
alter table content_blocks add column if not exists metadata jsonb default '{}'::jsonb;
alter table content_blocks add column if not exists status text not null default 'draft';
alter table content_blocks add column if not exists sort_order integer not null default 0;
alter table content_blocks add column if not exists updated_at timestamptz not null default now();
