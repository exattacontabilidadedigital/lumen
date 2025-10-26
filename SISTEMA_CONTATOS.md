# Sistema de Contatos - Instruções de Instalação

## 📋 Visão Geral

Sistema completo para gerenciar contatos recebidos através do formulário do site, com:

- ✅ Formulário de contato funcional
- ✅ Salvamento no Supabase
- ✅ Área administrativa para visualizar contatos
- ✅ Exportação CSV
- ✅ Sistema de status (novo, em_andamento, respondido, arquivado)
- ✅ Estatísticas e métricas

## 🚀 Instalação

### Passo 1: Executar Script SQL no Supabase

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto: **lumen-consultoria**
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New Query**
5. Copie e cole o conteúdo do arquivo `scripts/004_create_contacts_table.sql`
6. Clique em **Run** (ou pressione Ctrl+Enter)

### Passo 2: Verificar Tabela Criada

No menu lateral, vá em **Table Editor** e verifique se a tabela `contacts` foi criada com as colunas:

- `id` (UUID)
- `nome` (TEXT)
- `email` (TEXT)
- `telefone` (TEXT)
- `empresa` (TEXT)
- `porte` (TEXT)
- `mensagem` (TEXT)
- `status` (TEXT) - valores: novo, em_andamento, respondido, arquivado
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### Passo 3: Deploy do Código

O código já está commitado. Para aplicar:

```bash
git pull origin main
```

Se estiver na Hostinger, o deploy automático já aplicará as mudanças.

## 📱 Como Usar

### Para Usuários (Site)

1. Acessar a página de contato: `/contato`
2. Preencher o formulário com os dados
3. Clicar em "Enviar mensagem"
4. Receber confirmação via toast notification

### Para Administradores

1. Fazer login na área admin: `/auth/login`
2. Acessar **Contatos** no menu de navegação
3. Visualizar todos os contatos recebidos
4. Ver estatísticas de contatos (total, novos, em andamento, respondidos)
5. Exportar para CSV clicando em "Exportar CSV"

## 🔒 Segurança (RLS)

A tabela `contacts` possui políticas de segurança (Row Level Security):

- **INSERT público**: Qualquer pessoa pode inserir (formulário público)
- **SELECT admin**: Apenas administradores podem visualizar
- **UPDATE admin**: Apenas administradores podem atualizar status
- **DELETE admin**: Apenas administradores podem deletar

## 📊 Campos do Formulário

| Campo      | Tipo     | Obrigatório | Validação             |
| ---------- | -------- | ----------- | --------------------- |
| Nome       | TEXT     | Sim         | Não vazio             |
| Email      | TEXT     | Sim         | Formato de email      |
| Telefone   | TEXT     | Sim         | Não vazio             |
| Empresa    | TEXT     | Sim         | Não vazio             |
| Porte      | SELECT   | Sim         | mei, micro, pequena, media, grande |
| Mensagem   | TEXTAREA | Sim         | Não vazio             |

## 🎯 Status dos Contatos

- **novo**: Contato recém-recebido (azul)
- **em_andamento**: Contato sendo tratado (amarelo)
- **respondido**: Contato já respondido (verde)
- **arquivado**: Contato arquivado (vermelho)

## 🧪 Testar

### 1. Testar Formulário de Contato

1. Acessar: http://localhost:3000/contato (ou URL de produção)
2. Preencher todos os campos
3. Clicar em "Enviar mensagem"
4. Verificar toast de sucesso

### 2. Testar Área Admin

1. Fazer login: http://localhost:3000/auth/login
2. Acessar: http://localhost:3000/admin/contatos
3. Verificar se o contato aparece na lista
4. Testar exportação CSV

### 3. Verificar no Supabase

1. Acessar Table Editor → contacts
2. Verificar se o registro foi inserido
3. Verificar valores dos campos

## 📝 Arquivos Criados/Modificados

### Novos Arquivos

- ✅ `scripts/004_create_contacts_table.sql` - Script SQL
- ✅ `app/api/contacts/route.ts` - API para salvar contatos
- ✅ `app/api/contacts/export/route.ts` - API para exportar CSV
- ✅ `app/admin/contatos/page.tsx` - Página admin de contatos

### Arquivos Modificados

- ✅ `app/contato/page.tsx` - Integração com API
- ✅ `components/admin-nav.tsx` - Adicionado link "Contatos"

## 🐛 Troubleshooting

### Erro: "Error: relation 'contacts' does not exist"

**Solução**: Execute o script SQL no Supabase (Passo 1)

### Erro: "Não autorizado" ao tentar visualizar contatos

**Solução**: Certifique-se de estar logado como administrador (tabela `admin_users`)

### Formulário não envia / Fica em "Enviando..."

**Soluções**:
1. Verificar console do navegador (F12) para ver erros
2. Verificar se a API `/api/contacts` está respondendo
3. Verificar credenciais do Supabase em `.env.local`

### CSV exportado não abre corretamente no Excel

**Solução**: O arquivo já possui BOM (Byte Order Mark) UTF-8. Tente abrir com:
- Excel → Dados → Obter Dados → De Arquivo → De Texto/CSV
- Google Sheets (importa automaticamente)

## ✅ Checklist de Verificação

- [ ] Script SQL executado no Supabase
- [ ] Tabela `contacts` criada e visível no Table Editor
- [ ] Código atualizado (git pull)
- [ ] Formulário de contato funciona
- [ ] Toast de sucesso aparece após envio
- [ ] Contato aparece na área admin
- [ ] Exportação CSV funciona
- [ ] Estatísticas aparecem corretamente

## 📞 Contato

Em caso de dúvidas ou problemas, verifique os logs:

- **Browser Console**: F12 → Console
- **Supabase Logs**: Dashboard → Logs
- **Server Logs**: Terminal onde o Next.js está rodando

---

**Status**: ✅ Sistema pronto para uso
**Versão**: 1.0.0
**Data**: 26/10/2025
