-- =============================================================================
-- Emergency Electric — Initial Schema Migration
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Extensions
-- ---------------------------------------------------------------------------
create extension if not exists moddatetime schema extensions;

-- ---------------------------------------------------------------------------
-- 2. Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name  text not null default '',
  phone      text not null default '',
  address    text not null default '',
  city       text not null default '',
  state      text not null default '',
  zip        text not null default '',
  role       text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.employment (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  company     text not null default '',
  position    text not null default '',
  start_date  date,
  end_date    date,
  description text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.education (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  institution    text not null default '',
  degree         text not null default '',
  field_of_study text not null default '',
  start_date     date,
  end_date       date,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table public.references (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  name         text not null default '',
  relationship text not null default '',
  phone        text not null default '',
  email        text not null default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name  text not null,
  contact    text not null,
  subject    text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. Indexes
-- ---------------------------------------------------------------------------
create index idx_employment_user_id on public.employment(user_id);
create index idx_education_user_id on public.education(user_id);
create index idx_references_user_id on public.references(user_id);
create index idx_contact_messages_read on public.contact_messages(read);

-- ---------------------------------------------------------------------------
-- 4. moddatetime triggers
-- ---------------------------------------------------------------------------
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure moddatetime(updated_at);

create trigger handle_employment_updated_at
  before update on public.employment
  for each row execute procedure moddatetime(updated_at);

create trigger handle_education_updated_at
  before update on public.education
  for each row execute procedure moddatetime(updated_at);

create trigger handle_references_updated_at
  before update on public.references
  for each row execute procedure moddatetime(updated_at);

-- ---------------------------------------------------------------------------
-- 5. Auto-create profile on user signup
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 6. Custom JWT hook
-- ---------------------------------------------------------------------------
-- NOTE: After running this migration, enable this hook in Supabase Dashboard:
-- Auth > Hooks > Customize Access Token (JWT Claims) > select public.custom_access_token_hook
-- ---------------------------------------------------------------------------
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  user_role text;
begin
  select role into user_role
  from public.profiles
  where id = (event->>'user_id')::uuid;

  event := jsonb_set(
    event,
    '{claims,user_role}',
    to_jsonb(coalesce(user_role, 'user'))
  );

  return event;
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
grant select on table public.profiles to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;

-- ---------------------------------------------------------------------------
-- 7. Enable Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.employment enable row level security;
alter table public.education enable row level security;
alter table public.references enable row level security;
alter table public.contact_messages enable row level security;

-- ---------------------------------------------------------------------------
-- 8. RLS Policies — profiles
-- ---------------------------------------------------------------------------
create policy "Users can read own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id and (auth.jwt()->>'user_role') = 'user')
  with check (auth.uid() = id and role = 'user');

create policy "Admins can read all profiles"
  on public.profiles for select
  to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- ---------------------------------------------------------------------------
-- 9. RLS Policies — employment
-- ---------------------------------------------------------------------------
create policy "Users can read own employment"
  on public.employment for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own employment"
  on public.employment for insert to authenticated
  with check (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Users can update own employment"
  on public.employment for update to authenticated
  using (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Users can delete own employment"
  on public.employment for delete to authenticated
  using (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Admins can read all employment"
  on public.employment for select to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- ---------------------------------------------------------------------------
-- 10. RLS Policies — education
-- ---------------------------------------------------------------------------
create policy "Users can read own education"
  on public.education for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own education"
  on public.education for insert to authenticated
  with check (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Users can update own education"
  on public.education for update to authenticated
  using (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Users can delete own education"
  on public.education for delete to authenticated
  using (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Admins can read all education"
  on public.education for select to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- ---------------------------------------------------------------------------
-- 11. RLS Policies — references
-- ---------------------------------------------------------------------------
create policy "Users can read own references"
  on public.references for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own references"
  on public.references for insert to authenticated
  with check (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Users can update own references"
  on public.references for update to authenticated
  using (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Users can delete own references"
  on public.references for delete to authenticated
  using (auth.uid() = user_id and (auth.jwt()->>'user_role') = 'user');

create policy "Admins can read all references"
  on public.references for select to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- ---------------------------------------------------------------------------
-- 12. RLS Policies — contact_messages
-- ---------------------------------------------------------------------------
create policy "Anyone can insert contact messages"
  on public.contact_messages for insert to anon, authenticated
  with check (true);

create policy "Admins can read contact messages"
  on public.contact_messages for select to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

create policy "Admins can update contact messages"
  on public.contact_messages for update to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

create policy "Admins can delete contact messages"
  on public.contact_messages for delete to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');
