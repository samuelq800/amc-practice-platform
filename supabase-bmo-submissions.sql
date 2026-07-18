-- Run once in the Supabase SQL Editor for the project used by this site.
-- Students can submit their own BMO proofs. Only admins can set scores or feedback.

create extension if not exists pgcrypto;

create table if not exists public.bmo_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  problem_id text not null,
  year integer,
  year_label text,
  number integer,
  topic text,
  difficulty text,
  response_text text not null check (char_length(response_text) between 1 and 12000),
  review_status text not null default 'submitted' check (review_status in ('submitted', 'reviewed')),
  score numeric(4,1) check (score is null or score between 0 and 10),
  max_score numeric(4,1) not null default 10 check (max_score = 10),
  teacher_feedback text check (teacher_feedback is null or char_length(teacher_feedback) <= 4000),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, problem_id)
);

create index if not exists bmo_submissions_user_updated_idx
  on public.bmo_submissions (user_id, updated_at desc);

create index if not exists bmo_submissions_review_idx
  on public.bmo_submissions (review_status, updated_at desc);

create or replace function public.is_platform_admin(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = check_user_id and role = 'admin'
  );
$$;

revoke all on function public.is_platform_admin(uuid) from public;
grant execute on function public.is_platform_admin(uuid) to authenticated;

create or replace function public.guard_bmo_submission_review()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_platform_admin(auth.uid()) then
    new.updated_at := now();
    return new;
  end if;

  new.user_id := auth.uid();
  new.review_status := 'submitted';
  new.score := null;
  new.max_score := 10;
  new.teacher_feedback := null;
  new.updated_at := now();
  if tg_op = 'UPDATE' then
    new.submitted_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists guard_bmo_submission_review_trigger on public.bmo_submissions;
create trigger guard_bmo_submission_review_trigger
before insert or update on public.bmo_submissions
for each row execute function public.guard_bmo_submission_review();

alter table public.bmo_submissions enable row level security;

drop policy if exists "bmo submissions select own or admin" on public.bmo_submissions;
create policy "bmo submissions select own or admin"
on public.bmo_submissions
for select
to authenticated
using (auth.uid() = user_id or public.is_platform_admin(auth.uid()));

drop policy if exists "bmo submissions insert own" on public.bmo_submissions;
create policy "bmo submissions insert own"
on public.bmo_submissions
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "bmo submissions update own or admin" on public.bmo_submissions;
create policy "bmo submissions update own or admin"
on public.bmo_submissions
for update
to authenticated
using (auth.uid() = user_id or public.is_platform_admin(auth.uid()))
with check (auth.uid() = user_id or public.is_platform_admin(auth.uid()));

grant select, insert, update on public.bmo_submissions to authenticated;

