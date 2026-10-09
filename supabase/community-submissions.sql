-- FortniteTools community UGC
-- Paste into Supabase → SQL Editor → Run
-- Public /upload feed reads status = 'approved'. Hide spam with status = 'hidden'.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.community_submission_kind as enum (
    'guide',
    'loadout',
    'drop_spot',
    'map_code',
    'settings',
    'tip',
    'weapon_take',
    'clip',
    'combo'
  );
exception
  when duplicate_object then null;
end $$;

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
  status text not null default 'approved'
    check (status in ('pending', 'approved', 'rejected', 'hidden')),
  constraint community_submissions_creator_len
    check (char_length(creator_name) between 2 and 40),
  constraint community_submissions_title_len
    check (char_length(title) between 3 and 120),
  constraint community_submissions_body_len
    check (char_length(body) <= 12000)
);

-- If the type already existed without 'guide', add it (Postgres 15+)
alter type public.community_submission_kind add value if not exists 'guide';

create index if not exists community_submissions_feed_idx
  on public.community_submissions (status, created_at desc);

create index if not exists community_submissions_kind_feed_idx
  on public.community_submissions (kind, status, created_at desc);

create index if not exists community_submissions_user_idx
  on public.community_submissions (user_id, created_at desc);

create or replace function public.set_community_submissions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists community_submissions_set_updated_at on public.community_submissions;
create trigger community_submissions_set_updated_at
  before update on public.community_submissions
  for each row
  execute function public.set_community_submissions_updated_at();

alter table public.community_submissions enable row level security;

drop policy if exists "Public read approved submissions" on public.community_submissions;
create policy "Public read approved submissions"
  on public.community_submissions
  for select
  using (status = 'approved');

drop policy if exists "Users read own submissions" on public.community_submissions;
create policy "Users read own submissions"
  on public.community_submissions
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users insert own submissions" on public.community_submissions;
create policy "Users insert own submissions"
  on public.community_submissions
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and status in ('pending', 'approved')
  );

-- Optional migrate from loadout_submissions (only if that table exists)
do $$
begin
  if to_regclass('public.loadout_submissions') is not null then
    insert into public.community_submissions (
      user_id,
      creator_name,
      kind,
      title,
      body,
      payload,
      status,
      created_at
    )
    select
      ls.user_id,
      ls.creator_name,
      'loadout'::public.community_submission_kind,
      ls.loadout_name,
      'Community loadout from the loadout builder.',
      jsonb_build_object('loadout_url', ls.loadout_url),
      'approved',
      coalesce(ls.created_at, now())
    from public.loadout_submissions ls
    where not exists (
      select 1
      from public.community_submissions cs
      where cs.kind = 'loadout'
        and cs.title = ls.loadout_name
        and cs.creator_name = ls.creator_name
        and cs.payload->>'loadout_url' = ls.loadout_url
    );
  end if;
end $$;

-- Table Editor tips:
-- status = 'approved'  → live on /upload
-- status = 'hidden'    → remove from public feed without deleting
-- kind = 'map_code'    → Creative codes only
