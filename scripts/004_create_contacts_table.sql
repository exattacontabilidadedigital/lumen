-- Tabela de contatos do site
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  empresa TEXT NOT NULL,
  porte TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'em_andamento', 'respondido', 'arquivado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode inserir (formulário público)
CREATE POLICY "Permitir insert público" ON public.contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Política: Apenas admin pode visualizar
CREATE POLICY "Admin pode visualizar tudo" ON public.contacts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Política: Apenas admin pode atualizar
CREATE POLICY "Admin pode atualizar" ON public.contacts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Política: Apenas admin pode deletar
CREATE POLICY "Admin pode deletar" ON public.contacts
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentários na tabela
COMMENT ON TABLE public.contacts IS 'Contatos recebidos através do formulário do site';
COMMENT ON COLUMN public.contacts.status IS 'Status do contato: novo, em_andamento, respondido, arquivado';
