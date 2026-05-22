create table if not exists profiles (
  id uuid primary key,
  email text unique not null,
  full_name text,
  phone text,
  role text not null default 'student',
  created_at timestamptz not null default now()
);

create table if not exists demo_bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  target_band text not null,
  status text not null default 'new',
  source text default 'landing-page',
  created_at timestamptz not null default now()
);

create table if not exists tests (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  section text not null,
  level text,
  duration_minutes integer not null default 60,
  question_count integer not null default 0,
  description text,
  audio_path text,
  audio_url text,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid references tests(id) on delete cascade,
  type text not null,
  prompt text not null,
  options jsonb,
  correct_answer text,
  explanation text,
  sort_order integer not null default 0
);

create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  test_id uuid references tests(id) on delete cascade,
  section text not null,
  band_score numeric(3,1),
  correct_count integer default 0,
  total_objective integer default 0,
  result_payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references attempts(id) on delete cascade,
  question_id uuid references questions(id) on delete cascade,
  submitted_answer text,
  is_correct boolean,
  explanation text
);

create table if not exists seo_pages (
  id uuid primary key default gen_random_uuid(),
  page_key text unique not null,
  title text not null,
  description text not null,
  slug text not null,
  keywords text[] default '{}',
  og_image text,
  updated_at timestamptz not null default now()
);

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

alter table tests add column if not exists audio_path text;
alter table tests add column if not exists audio_url text;
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
