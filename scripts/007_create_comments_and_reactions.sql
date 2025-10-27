-- =============================================
-- Script: 007_create_comments_and_reactions.sql
-- Descrição: Cria tabelas de comentários e reações (likes/dislikes) para artigos
-- Data: 2025-10-26
-- =============================================

-- Tabela de comentários dos artigos
CREATE TABLE IF NOT EXISTS public.articles_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tabela de reações (curtir/não gostei) dos artigos
CREATE TABLE IF NOT EXISTS public.articles_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    user_ip VARCHAR(45) NOT NULL, -- Suporta IPv4 e IPv6
    user_fingerprint VARCHAR(255), -- Opcional: fingerprint do navegador
    reaction_type VARCHAR(10) NOT NULL CHECK (reaction_type IN ('like', 'dislike')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(article_id, user_ip) -- Um usuário (IP) pode ter apenas uma reação por artigo
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_articles_comments_article_id ON public.articles_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_articles_comments_status ON public.articles_comments(status);
CREATE INDEX IF NOT EXISTS idx_articles_comments_created_at ON public.articles_comments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_articles_reactions_article_id ON public.articles_reactions(article_id);
CREATE INDEX IF NOT EXISTS idx_articles_reactions_type ON public.articles_reactions(reaction_type);

-- Comentários sobre as tabelas
COMMENT ON TABLE public.articles_comments IS 'Comentários dos leitores em artigos';
COMMENT ON COLUMN public.articles_comments.status IS 'Status do comentário: pending (aguardando aprovação), approved (publicado), rejected (rejeitado)';
COMMENT ON TABLE public.articles_reactions IS 'Reações (likes/dislikes) dos usuários em artigos';
COMMENT ON COLUMN public.articles_reactions.user_ip IS 'Endereço IP do usuário para prevenir duplicatas';
COMMENT ON COLUMN public.articles_reactions.reaction_type IS 'Tipo de reação: like (gostei) ou dislike (não gostei)';

-- =============================================
-- Políticas RLS (Row Level Security)
-- =============================================

-- Ativar RLS nas tabelas
ALTER TABLE public.articles_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles_reactions ENABLE ROW LEVEL SECURITY;

-- Políticas para articles_comments
-- Qualquer pessoa pode criar comentários (serão pendentes de aprovação)
CREATE POLICY "Qualquer pessoa pode criar comentários"
    ON public.articles_comments
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Qualquer pessoa pode ler comentários aprovados
CREATE POLICY "Qualquer pessoa pode ler comentários aprovados"
    ON public.articles_comments
    FOR SELECT
    TO public
    USING (status = 'approved');

-- Apenas autenticados podem ver todos os comentários (admin)
CREATE POLICY "Usuários autenticados podem ver todos os comentários"
    ON public.articles_comments
    FOR SELECT
    TO authenticated
    USING (true);

-- Apenas autenticados podem atualizar comentários (aprovar/rejeitar)
CREATE POLICY "Usuários autenticados podem atualizar comentários"
    ON public.articles_comments
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Apenas autenticados podem deletar comentários
CREATE POLICY "Usuários autenticados podem deletar comentários"
    ON public.articles_comments
    FOR DELETE
    TO authenticated
    USING (true);

-- Políticas para articles_reactions
-- Qualquer pessoa pode criar reações
CREATE POLICY "Qualquer pessoa pode criar reações"
    ON public.articles_reactions
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Qualquer pessoa pode ler reações (para contadores)
CREATE POLICY "Qualquer pessoa pode ler reações"
    ON public.articles_reactions
    FOR SELECT
    TO public
    USING (true);

-- Qualquer pessoa pode atualizar sua própria reação
CREATE POLICY "Qualquer pessoa pode atualizar reações"
    ON public.articles_reactions
    FOR UPDATE
    TO public
    USING (true)
    WITH CHECK (true);

-- Apenas autenticados podem deletar reações (admin)
CREATE POLICY "Usuários autenticados podem deletar reações"
    ON public.articles_reactions
    FOR DELETE
    TO authenticated
    USING (true);

-- =============================================
-- Views úteis para o dashboard admin
-- =============================================

-- View com estatísticas de cada artigo
CREATE OR REPLACE VIEW public.articles_stats AS
SELECT 
    a.id,
    a.title,
    a.slug,
    a.status,
    -- Contadores de reações
    COUNT(DISTINCT CASE WHEN ar.reaction_type = 'like' THEN ar.id END) as likes_count,
    COUNT(DISTINCT CASE WHEN ar.reaction_type = 'dislike' THEN ar.id END) as dislikes_count,
    -- Contadores de comentários
    COUNT(DISTINCT CASE WHEN ac.status = 'approved' THEN ac.id END) as comments_approved_count,
    COUNT(DISTINCT CASE WHEN ac.status = 'pending' THEN ac.id END) as comments_pending_count,
    COUNT(DISTINCT ac.id) as comments_total_count,
    -- Score de engajamento (likes - dislikes + comentários aprovados)
    (
        COUNT(DISTINCT CASE WHEN ar.reaction_type = 'like' THEN ar.id END) - 
        COUNT(DISTINCT CASE WHEN ar.reaction_type = 'dislike' THEN ar.id END) +
        COUNT(DISTINCT CASE WHEN ac.status = 'approved' THEN ac.id END) * 2
    ) as engagement_score
FROM public.articles a
LEFT JOIN public.articles_reactions ar ON a.id = ar.article_id
LEFT JOIN public.articles_comments ac ON a.id = ac.article_id
GROUP BY a.id, a.title, a.slug, a.status;

COMMENT ON VIEW public.articles_stats IS 'Estatísticas agregadas de reações e comentários por artigo';

-- =============================================
-- Funções úteis
-- =============================================

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at em articles_comments
DROP TRIGGER IF EXISTS update_articles_comments_updated_at ON public.articles_comments;
CREATE TRIGGER update_articles_comments_updated_at
    BEFORE UPDATE ON public.articles_comments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- Dados de exemplo (opcional - comentar em produção)
-- =============================================

-- Exemplo de comentário aprovado
-- INSERT INTO public.articles_comments (article_id, author_name, author_email, content, status)
-- SELECT id, 'João Silva', 'joao@example.com', 'Excelente artigo! Muito esclarecedor sobre o tema.', 'approved'
-- FROM public.articles
-- WHERE slug = 'o-impacto-da-reforma-no-fluxo-de-caixa'
-- LIMIT 1;

-- Exemplo de reações
-- INSERT INTO public.articles_reactions (article_id, user_ip, reaction_type)
-- SELECT id, '192.168.1.1', 'like'
-- FROM public.articles
-- WHERE slug = 'o-impacto-da-reforma-no-fluxo-de-caixa'
-- LIMIT 1;

-- =============================================
-- FIM DO SCRIPT
-- =============================================
