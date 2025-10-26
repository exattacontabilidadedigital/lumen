-- Adicionar novos campos à tabela de artigos para melhorar SEO e organização
alter table public.articles
  add column if not exists meta_description text,
  add column if not exists tags text[] default '{}',
  add column if not exists featured_image_alt text,
  add column if not exists publish_date timestamp with time zone,
  add column if not exists status text default 'draft' check (status in ('draft', 'published', 'scheduled'));

-- Atualizar artigos existentes para usar o novo campo status
update public.articles
set status = case
  when published = true then 'published'
  else 'draft'
end
where status is null;

-- Criar índices para melhorar performance de busca
create index if not exists articles_status_idx on public.articles(status);
create index if not exists articles_tags_idx on public.articles using gin(tags);
create index if not exists articles_category_idx on public.articles(category);
create index if not exists articles_publish_date_idx on public.articles(publish_date);

-- Atualizar política de seleção para considerar o novo campo status
drop policy if exists "articles_select_all" on public.articles;

create policy "articles_select_all"
  on public.articles for select
  using (
    status = 'published' 
    or auth.uid() in (select id from public.profiles where role = 'admin')
  );
