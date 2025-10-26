-- Adicionar campos de meta dados para redes sociais (Open Graph e Twitter Cards)
alter table public.articles
  add column if not exists og_title text,
  add column if not exists og_description text,
  add column if not exists og_image text,
  add column if not exists twitter_title text,
  add column if not exists twitter_description text,
  add column if not exists twitter_image text,
  add column if not exists twitter_card_type text default 'summary_large_image' check (twitter_card_type in ('summary', 'summary_large_image', 'app', 'player'));

-- Comentários para documentação
comment on column public.articles.og_title is 'Título personalizado para Open Graph (Facebook, LinkedIn)';
comment on column public.articles.og_description is 'Descrição personalizada para Open Graph';
comment on column public.articles.og_image is 'Imagem personalizada para Open Graph';
comment on column public.articles.twitter_title is 'Título personalizado para Twitter Card';
comment on column public.articles.twitter_description is 'Descrição personalizada para Twitter Card';
comment on column public.articles.twitter_image is 'Imagem personalizada para Twitter Card';
