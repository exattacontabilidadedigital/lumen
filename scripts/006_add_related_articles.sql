-- Adicionar campo para artigos relacionados
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS related_articles UUID[] DEFAULT '{}';

-- Comentário na coluna
COMMENT ON COLUMN public.articles.related_articles IS 'Array de IDs de artigos relacionados para sugestão de leitura';

-- Índice para melhorar performance em queries de artigos relacionados
CREATE INDEX IF NOT EXISTS idx_articles_related ON public.articles USING GIN (related_articles);
