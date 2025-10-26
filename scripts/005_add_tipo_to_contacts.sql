-- Adicionar coluna 'tipo' na tabela contacts
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS tipo TEXT DEFAULT 'contato' CHECK (tipo IN ('contato', 'diagnostico'));

-- Criar índice para o campo tipo
CREATE INDEX IF NOT EXISTS idx_contacts_tipo ON public.contacts(tipo);

-- Atualizar contatos existentes que têm "DIAGNÓSTICO TRIBUTÁRIO" na mensagem
UPDATE public.contacts 
SET tipo = 'diagnostico' 
WHERE mensagem LIKE 'DIAGNÓSTICO TRIBUTÁRIO%' OR mensagem LIKE '%Regime Tributário%';

-- Comentário na coluna
COMMENT ON COLUMN public.contacts.tipo IS 'Tipo do contato: contato (formulário padrão) ou diagnostico (diagnóstico tributário)';
