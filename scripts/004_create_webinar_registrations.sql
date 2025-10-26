-- Criar tabela de inscrições de webinars
CREATE TABLE IF NOT EXISTS webinar_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  webinar_id UUID REFERENCES webinars(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  position TEXT,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_webinar_id ON webinar_registrations(webinar_id);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_email ON webinar_registrations(email);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_registered_at ON webinar_registrations(registered_at DESC);

-- Habilitar RLS
ALTER TABLE webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (inscrições)
CREATE POLICY "Allow public insert for registrations" 
  ON webinar_registrations 
  FOR INSERT 
  WITH CHECK (true);

-- Política para permitir leitura apenas para usuários autenticados
CREATE POLICY "Allow authenticated read for registrations" 
  ON webinar_registrations 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Política para permitir atualização apenas para usuários autenticados
CREATE POLICY "Allow authenticated update for registrations" 
  ON webinar_registrations 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');
