-- Criar tabela de perfis de usuários
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

-- Políticas para profiles
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Criar tabela de artigos
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  image_url text,
  category text not null,
  author_name text not null default 'Equipe Lúmen',
  reading_time text not null default '5 min',
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references auth.users(id) on delete set null
);

alter table public.articles enable row level security;

-- Políticas para artigos (público pode ler, apenas admins podem modificar)
create policy "articles_select_all"
  on public.articles for select
  using (published = true or auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

create policy "articles_insert_admin"
  on public.articles for insert
  with check (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

create policy "articles_update_admin"
  on public.articles for update
  using (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

create policy "articles_delete_admin"
  on public.articles for delete
  using (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

-- Criar tabela de webinars
create table if not exists public.webinars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  date text not null,
  time text not null,
  duration text not null,
  spots_available integer not null,
  instructor_name text not null,
  instructor_role text not null,
  topics text[] not null,
  is_featured boolean default false,
  is_past boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references auth.users(id) on delete set null
);

alter table public.webinars enable row level security;

-- Políticas para webinars
create policy "webinars_select_all"
  on public.webinars for select
  using (true);

create policy "webinars_insert_admin"
  on public.webinars for insert
  with check (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

create policy "webinars_update_admin"
  on public.webinars for update
  using (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

create policy "webinars_delete_admin"
  on public.webinars for delete
  using (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

-- Criar tabela de guias
create table if not exists public.guides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  pages integer not null,
  file_url text,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references auth.users(id) on delete set null
);

alter table public.guides enable row level security;

-- Políticas para guias
create policy "guides_select_all"
  on public.guides for select
  using (true);

create policy "guides_insert_admin"
  on public.guides for insert
  with check (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

create policy "guides_update_admin"
  on public.guides for update
  using (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

create policy "guides_delete_admin"
  on public.guides for delete
  using (auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));

-- Trigger para atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger articles_updated_at
  before update on public.articles
  for each row
  execute function public.handle_updated_at();

create trigger webinars_updated_at
  before update on public.webinars
  for each row
  execute function public.handle_updated_at();

create trigger guides_updated_at
  before update on public.guides
  for each row
  execute function public.handle_updated_at();

-- Trigger para criar perfil automaticamente ao criar usuário
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
