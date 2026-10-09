-- FortniteTools community UGC (full / upgrade script)
-- Supabase → SQL Editor → Run all
-- Public feed = status 'approved'. Hide spam with status = 'hidden'.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.community_submission_kind as enum (
    'guide',
    'loadout',
    'drop_spot',
    'map_code',
    'xp_map',
    'settings',
    'keybinds',
    'fps_preset',
    'tip',
    'weapon_take',
    'clip',
    'combo'
  );
exception
  when duplicate_object then null;
end $$;

-- Add any missing enum values (safe if already present; Postgres 15+)
alter type public.community_submission_kind add value if not exists 'guide';
alter type public.community_submission_kind add value if not exists 'xp_map';
alter type public.community_submission_kind add value if not exists 'keybinds';
alter type public.community_submission_kind add value if not exists 'fps_preset';

create table if not exists public.community_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete set null,
  creator_name text not null,
  kind public.community_submission_kind not null,
  title text not null,
  body text not null default '',
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'hidden')),
  constraint community_submissions_creator_len
    check (char_length(creator_name) between 2 and 40),
  constraint community_submissions_title_len
    check (char_length(title) between 3 and 120),
  constraint community_submissions_body_len
    check (char_length(body) <= 12000)
);

alter table public.community_submissions
  drop constraint if exists community_submissions_body_len;
alter table public.community_submissions
  add constraint community_submissions_body_len
  check (char_length(body) <= 12000);

create index if not exists community_submissions_feed_idx
  on public.community_submissions (status, created_at desc);
create index if not exists community_submissions_kind_feed_idx
  on public.community_submissions (kind, status, created_at desc);
create index if not exists community_submissions_user_idx
  on public.community_submissions (user_id, created_at desc);

create or replace function public.set_community_submissions_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists community_submissions_set_updated_at on public.community_submissions;
create trigger community_submissions_set_updated_at
  before update on public.community_submissions
  for each row execute function public.set_community_submissions_updated_at();

alter table public.community_submissions enable row level security;

drop policy if exists "Public read approved submissions" on public.community_submissions;
create policy "Public read approved submissions"
  on public.community_submissions for select
  using (status = 'approved');

drop policy if exists "Users read own submissions" on public.community_submissions;
create policy "Users read own submissions"
  on public.community_submissions for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users insert own submissions" on public.community_submissions;
create policy "Users insert own submissions"
  on public.community_submissions for insert to authenticated
  with check (auth.uid() = user_id and status = 'pending');

-- If table already exists with default 'approved', flip inbox default:
-- alter table public.community_submissions alter column status set default 'pending';

-- Showcase / fake loadouts are HARDCODED in the Next.js app (lib/community-seed.ts).
-- Do NOT store them in this table. If you inserted older seed rows, delete them:
delete from public.community_submissions
where id in (
  'a1000000-0000-4000-8000-000000000001',
  'a1000000-0000-4000-8000-000000000002',
  'a1000000-0000-4000-8000-000000000003',
  'a1000000-0000-4000-8000-000000000004',
  'a1000000-0000-4000-8000-000000000005'
)
or (payload->>'seeded') = 'true';

-- Workflow:
-- 1) Site forms INSERT status='pending' (inbox only — public pages do NOT SELECT this table)
-- 2) You review in Table Editor
-- 3) Paste verified rows into lib/community-verified.ts to publish on the site
--
-- kind values (jsonb payload holds type-specific fields, including full guides):
--   guide, loadout, drop_spot, map_code, xp_map, settings, keybinds,
--   fps_preset, tip, weapon_take, clip, combo
-- status: pending | approved | rejected | hidden  (site only cares about your verified.ts paste)
