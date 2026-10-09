-- Run this if you already applied community-submissions.sql
-- Adds player guides + longer body text for full write-ups.

alter type public.community_submission_kind add value if not exists 'guide';

alter table public.community_submissions
  drop constraint if exists community_submissions_body_len;

alter table public.community_submissions
  add constraint community_submissions_body_len
  check (char_length(body) <= 12000);
