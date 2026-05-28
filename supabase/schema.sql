-- JournAI Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES
-- ============================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  avatar_url text,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- JOURNAL ENTRIES
-- ============================================
create table if not exists public.journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default '',
  content text not null default '',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  mood_score integer check (mood_score >= 1 and mood_score <= 100),
  ai_summary text,
  ai_tags text[] default '{}'
);

alter table public.journal_entries enable row level security;

create policy "Users can view own entries"
  on public.journal_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own entries"
  on public.journal_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own entries"
  on public.journal_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own entries"
  on public.journal_entries for delete
  using (auth.uid() = user_id);

create index idx_journal_entries_user_id on public.journal_entries(user_id);
create index idx_journal_entries_created_at on public.journal_entries(created_at desc);

-- ============================================
-- USER AI PROFILE
-- ============================================
create table if not exists public.user_ai_profile (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  personality_summary text,
  recurring_topics text[] default '{}',
  emotional_patterns text[] default '{}',
  goals text[] default '{}',
  stressors text[] default '{}',
  positive_patterns text[] default '{}',
  updated_at timestamptz default now() not null
);

alter table public.user_ai_profile enable row level security;

create policy "Users can view own AI profile"
  on public.user_ai_profile for select
  using (auth.uid() = user_id);

create policy "Users can upsert own AI profile"
  on public.user_ai_profile for insert
  with check (auth.uid() = user_id);

create policy "Users can update own AI profile"
  on public.user_ai_profile for update
  using (auth.uid() = user_id);

-- ============================================
-- AI ENTRY ANALYSIS
-- ============================================
create table if not exists public.ai_entry_analysis (
  id uuid default uuid_generate_v4() primary key,
  entry_id uuid references public.journal_entries(id) on delete cascade not null,
  mood_score integer not null check (mood_score >= 1 and mood_score <= 100),
  stress_score integer not null check (stress_score >= 1 and stress_score <= 100),
  motivation_score integer not null check (motivation_score >= 1 and motivation_score <= 100),
  confidence_score integer not null check (confidence_score >= 1 and confidence_score <= 100),
  social_energy_score integer not null check (social_energy_score >= 1 and social_energy_score <= 100),
  detected_topics text[] default '{}',
  biggest_win text,
  concerns text[] default '{}',
  summary text not null,
  created_at timestamptz default now() not null
);

alter table public.ai_entry_analysis enable row level security;

create policy "Users can view own analyses"
  on public.ai_entry_analysis for select
  using (
    exists (
      select 1 from public.journal_entries
      where journal_entries.id = ai_entry_analysis.entry_id
      and journal_entries.user_id = auth.uid()
    )
  );

create policy "Service can insert analyses"
  on public.ai_entry_analysis for insert
  with check (
    exists (
      select 1 from public.journal_entries
      where journal_entries.id = ai_entry_analysis.entry_id
      and journal_entries.user_id = auth.uid()
    )
  );

create index idx_ai_entry_analysis_entry_id on public.ai_entry_analysis(entry_id);

-- ============================================
-- MOOD HISTORY
-- ============================================
create table if not exists public.mood_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  mood_score integer not null check (mood_score >= 1 and mood_score <= 100),
  entry_id uuid references public.journal_entries(id) on delete set null,
  created_at timestamptz default now() not null
);

alter table public.mood_history enable row level security;

create policy "Users can view own mood history"
  on public.mood_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own mood history"
  on public.mood_history for insert
  with check (auth.uid() = user_id);

create index idx_mood_history_user_date on public.mood_history(user_id, date desc);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger journal_entries_updated_at
  before update on public.journal_entries
  for each row execute procedure public.update_updated_at();

create trigger user_ai_profile_updated_at
  before update on public.user_ai_profile
  for each row execute procedure public.update_updated_at();
