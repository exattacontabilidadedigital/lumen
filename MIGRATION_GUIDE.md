# 🚀 Como Executar a Migração da Tabela de Inscrições

## ❌ Problema Atual
O erro `"Could not find the table 'public.webinar_registrations'"` ocorre porque a tabela ainda não existe no banco de dados Supabase.

## ✅ Solução: Executar SQL no Supabase Dashboard

### Passo 1: Acesse o Supabase Dashboard
Abra este link no navegador:
👉 **https://supabase.com/dashboard/project/ejyqtpgmqeddxhzednuq/editor/sql**

### Passo 2: Cole o SQL
Copie TODO o conteúdo abaixo e cole no editor SQL do Supabase:

```sql
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
```

### Passo 3: Execute o SQL
- Clique no botão **"RUN"** (ou pressione `Ctrl+Enter`)
- Aguarde a confirmação de sucesso

### Passo 4: Verifique
Execute esta query para confirmar:
```sql
SELECT * FROM webinar_registrations LIMIT 1;
```

### Passo 5: Teste o Formulário
- Volte ao site: http://localhost:3000/webinars
- Clique em "Inscrever-se" em qualquer webinar
- Preencha o formulário
- Clique em "Confirmar Inscrição"

## 📊 O que foi criado?

### Tabela: `webinar_registrations`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| webinar_id | UUID | FK para webinars |
| name | TEXT | Nome do inscrito |
| email | TEXT | Email do inscrito |
| phone | TEXT | Telefone (opcional) |
| company | TEXT | Empresa (opcional) |
| position | TEXT | Cargo (opcional) |
| registered_at | TIMESTAMPTZ | Data/hora da inscrição |
| attended | BOOLEAN | Se compareceu |
| created_at | TIMESTAMPTZ | Data de criação |
| updated_at | TIMESTAMPTZ | Data de atualização |

### Políticas de Segurança (RLS)
- ✅ **INSERT público**: Qualquer pessoa pode se inscrever
- ✅ **SELECT autenticado**: Apenas admins veem as inscrições
- ✅ **UPDATE autenticado**: Apenas admins podem atualizar

### Índices (Performance)
- `idx_webinar_registrations_webinar_id` - Busca por webinar
- `idx_webinar_registrations_email` - Busca por email (duplicate check)
- `idx_webinar_registrations_registered_at` - Ordenação por data

## 🎉 Após executar
1. O formulário de inscrição vai funcionar ✅
2. As inscrições aparecerão no painel admin em `/admin/inscricoes` ✅
3. Você poderá exportar os dados para CSV ✅

## 🆘 Problemas?
Se ainda não funcionar:
1. Verifique se você está logado no Supabase Dashboard
2. Confirme que está no projeto correto (ejyqtpgmqeddxhzednuq)
3. Rode novamente o script de teste:
   ```bash
   node scripts\test-webinar-registration.js
   ```
