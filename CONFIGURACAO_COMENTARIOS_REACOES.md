# 📋 INSTRUÇÕES DE CONFIGURAÇÃO - Sistema de Comentários, Reações e Upload de Imagens

## 🎯 Funcionalidades Implementadas

✅ Upload de imagens para Supabase Storage
✅ Sistema de comentários com aprovação
✅ Sistema de reações (curtir/não curtir)
✅ Painel admin para gerenciar comentários
✅ Analytics de engajamento dos artigos

---

## 📦 1. CONFIGURAR SUPABASE STORAGE

### Passo 1.1: Criar Bucket de Imagens

1. Acesse: **https://supabase.com/dashboard**
2. Selecione seu projeto
3. Vá em: **Storage** → **New bucket**
4. Configure:
   - **Name:** `article-images`
   - **Public bucket:** ✅ MARCAR (imagens serão públicas)
   - **Allowed MIME types:** `image/*`
   - **File size limit:** 10 MB

### Passo 1.2: Configurar Políticas do Storage

Vá em **Storage** → **article-images** → **Policies**

**Política 1: Leitura Pública**
```sql
-- Nome: Public read access
-- Allowed operation: SELECT
-- Policy definition:
true
```

**Política 2: Upload Autenticado**
```sql
-- Nome: Authenticated users can upload
-- Allowed operation: INSERT
-- Policy definition:
(SELECT auth.role()) = 'authenticated'::text
```

**Política 3: Deletar Apenas Admin**
```sql
-- Nome: Only authenticated can delete
-- Allowed operation: DELETE
-- Policy definition:
(SELECT auth.role()) = 'authenticated'::text
```

---

## 📊 2. EXECUTAR SCRIPT SQL

1. Acesse: **SQL Editor** no Supabase Dashboard
2. Copie TODO o conteúdo do arquivo: `scripts/007_create_comments_and_reactions.sql`
3. Cole no editor
4. Clique em **RUN**

✅ Isso criará:
- Tabela `articles_comments` (comentários)
- Tabela `articles_reactions` (likes/dislikes)
- Índices para performance
- Políticas RLS (Row Level Security)
- View `articles_stats` (estatísticas agregadas)
- Triggers automáticos

---

## 🔑 3. VARIÁVEIS DE AMBIENTE (Opcional)

As credenciais já estão configuradas em `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
```

**Não precisa alterar nada!** ✅

---

## 🎨 4. COMPONENTES CRIADOS

### Frontend (Público)

1. **`components/article-reactions.tsx`**
   - Botões de Curtir/Não Curtir
   - Contadores em tempo real
   - Previne votos duplicados (por IP)
   - Feedback visual quando usuário vota

2. **`components/article-comments.tsx`**
   - Formulário de envio de comentário
   - Lista de comentários aprovados
   - Validações (nome, email, conteúdo)
   - Status: "Aguardando aprovação"

### Admin (Privado)

3. **`components/comments-table.tsx`**
   - Tabela com abas: Pendentes, Aprovados, Rejeitados
   - Ações: Aprovar, Rejeitar, Deletar
   - Link direto para o artigo
   - Confirmação antes de deletar

4. **`app/admin/comments/page.tsx`**
   - Página admin para gerenciar comentários
   - Protegida por autenticação
   - Interface completa de moderação

---

## 🔌 5. APIs CRIADAS

### API de Comentários: `/api/articles/[id]/comments`

**GET** - Listar comentários aprovados
```typescript
// Público, não precisa autenticação
fetch(`/api/articles/${articleId}/comments`)
```

**POST** - Enviar novo comentário
```typescript
fetch(`/api/articles/${articleId}/comments`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    author_name: 'João Silva',
    author_email: 'joao@example.com',
    content: 'Excelente artigo!'
  })
})
```

**PATCH** - Aprovar/Rejeitar (ADMIN)
```typescript
// Requer autenticação
fetch(`/api/articles/${articleId}/comments`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    comment_id: '123',
    status: 'approved' // ou 'rejected'
  })
})
```

**DELETE** - Deletar comentário (ADMIN)
```typescript
// Requer autenticação
fetch(`/api/articles/${articleId}/comments?comment_id=123`, {
  method: 'DELETE'
})
```

### API de Reações: `/api/articles/[id]/reactions`

**GET** - Obter contadores
```typescript
fetch(`/api/articles/${articleId}/reactions`)
// Retorna: { likes: 10, dislikes: 2, userReaction: 'like' }
```

**POST** - Registrar reação
```typescript
fetch(`/api/articles/${articleId}/reactions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    reaction_type: 'like' // ou 'dislike'
  })
})
```

---

## 📝 6. COMO USAR

### Upload de Imagem no Editor

1. Abra o **editor de artigo** (criar/editar)
2. Clique no botão **Inserir Imagem** (ícone 🖼️)
3. Modal abrirá com 2 abas:
   - **Upload:** Selecione arquivo do computador
   - **URL:** Cole link de imagem externa
4. Preencha **Texto Alternativo / Legenda** (opcional)
5. Clique em **Inserir Imagem**
6. ✅ Imagem enviada para Supabase Storage automaticamente!

### Comentários (Usuário)

1. Acesse qualquer artigo publicado
2. Role até o final da página
3. Preencha: Nome, Email, Comentário
4. Clique em **Enviar Comentário**
5. Mensagem: "Aguardando aprovação"
6. ⏳ Aguarde admin aprovar

### Comentários (Admin)

1. Login: **https://seu-site.com/auth/login**
2. Acesse: **Admin → Comentários**
3. Veja abas:
   - **Pendentes:** Comentários aguardando
   - **Aprovados:** Visíveis no site
   - **Rejeitados:** Bloqueados
4. Ações por comentário:
   - ✅ Aprovar (publica no artigo)
   - ❌ Rejeitar (bloqueia)
   - 🗑️ Deletar (remove permanentemente)

### Reações (Usuário)

1. Acesse qualquer artigo
2. Após o conteúdo: "Este conteúdo foi útil?"
3. Clique em:
   - **👍 Sim (Curtir)**
   - **👎 Não (Não Curtir)**
4. ✅ Reação registrada!
5. Contadores atualizam em tempo real
6. Clicar novamente = remover voto

---

## 📊 7. ESTRUTURA DO BANCO DE DADOS

### Tabela: `articles_comments`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único |
| article_id | UUID | ID do artigo (FK) |
| author_name | VARCHAR(255) | Nome do autor |
| author_email | VARCHAR(255) | Email do autor |
| content | TEXT | Texto do comentário |
| status | VARCHAR(20) | pending, approved, rejected |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

### Tabela: `articles_reactions`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único |
| article_id | UUID | ID do artigo (FK) |
| user_ip | VARCHAR(45) | IP do usuário |
| user_fingerprint | VARCHAR(255) | Fingerprint (opcional) |
| reaction_type | VARCHAR(10) | like, dislike |
| created_at | TIMESTAMP | Data de criação |

**Constraint:** `UNIQUE(article_id, user_ip)` - Um voto por IP

### View: `articles_stats`

Estatísticas agregadas por artigo:

```sql
SELECT * FROM articles_stats;
```

Retorna:
- `likes_count`: Total de curtidas
- `dislikes_count`: Total de não curtidas
- `comments_approved_count`: Comentários aprovados
- `comments_pending_count`: Comentários pendentes
- `comments_total_count`: Total de comentários
- `engagement_score`: Score de engajamento

---

## 🎨 8. CUSTOMIZAÇÕES

### Alterar Limite de Caracteres do Comentário

**Arquivo:** `app/api/articles/[id]/comments/route.ts`

```typescript
// Linha ~60
if (content.length < 10 || content.length > 5000) {
  // Altere 10 (mínimo) e 5000 (máximo)
}
```

### Alterar Texto dos Botões de Reação

**Arquivo:** `components/article-reactions.tsx`

```typescript
// Linha ~100
<span>Sim</span>  // Altere para "Útil", "Gostei", etc
<span>Não</span>  // Altere para "Não útil", etc
```

### Adicionar Campo "Site" no Formulário

**Arquivo:** `components/article-comments.tsx`

Adicione após o campo email:

```typescript
<div className="space-y-2">
  <Label htmlFor="author-website">Site (opcional)</Label>
  <Input
    id="author-website"
    type="url"
    value={authorWebsite}
    onChange={(e) => setAuthorWebsite(e.target.value)}
    placeholder="https://seusite.com"
  />
</div>
```

---

## 🔒 9. SEGURANÇA

### Políticas RLS Ativas

✅ **Comentários:**
- Qualquer pessoa pode criar (status: pending)
- Somente approved são visíveis publicamente
- Somente admin atualiza/deleta

✅ **Reações:**
- Qualquer pessoa pode votar
- Contadores públicos
- IP armazenado para evitar duplicatas

✅ **Storage:**
- Leitura pública (imagens visíveis)
- Upload apenas autenticados
- Delete apenas autenticados

### Proteção contra Spam

1. **Validação no Frontend:**
   - Mínimo 10 caracteres
   - Máximo 5000 caracteres
   - Email válido obrigatório

2. **Validação na API:**
   - Regex de email
   - Limite de caracteres
   - Sanitização automática

3. **Sistema de Aprovação:**
   - Todos começam como "pending"
   - Admin revisa antes de publicar

4. **IP Tracking:**
   - Um voto por IP por artigo
   - Previne bots simples

---

## 🚀 10. PRÓXIMOS PASSOS

### Melhorias Futuras (Opcionais)

1. **Notificações por Email:**
   - Email ao admin quando novo comentário
   - Email ao autor quando aprovado

2. **Sistema de Resposta:**
   - Admin responder comentários
   - Thread de conversas

3. **Captcha:**
   - Google reCAPTCHA
   - Prevenir spam avançado

4. **Analytics Avançado:**
   - Dashboard com gráficos
   - Taxa de aprovação
   - Artigos mais engajados

5. **Moderação Automática:**
   - IA para detectar spam
   - Filtro de palavrões
   - Auto-aprovar usuários confiáveis

---

## ✅ 11. CHECKLIST DE CONFIGURAÇÃO

Marque conforme concluir:

- [ ] Criar bucket `article-images` no Supabase Storage
- [ ] Configurar políticas do Storage (leitura pública)
- [ ] Executar script `007_create_comments_and_reactions.sql`
- [ ] Verificar tabelas criadas no Database
- [ ] Testar upload de imagem no editor
- [ ] Testar envio de comentário (frontend)
- [ ] Testar aprovação de comentário (admin)
- [ ] Testar reações (curtir/não curtir)
- [ ] Verificar contadores atualizando
- [ ] Testar página admin de comentários
- [ ] Verificar email nas notificações
- [ ] Testar em produção

---

## 🆘 12. TROUBLESHOOTING

### Erro: "Cannot find module 'lucide-react'"

**Solução:** Reinstalar dependências

```bash
pnpm install
```

### Erro: "Bucket article-images not found"

**Solução:** Criar bucket no Supabase Dashboard
- Nome exato: `article-images`
- Marcar como público

### Comentários não aparecem

**Checklist:**
1. Script SQL foi executado?
2. Comentário está aprovado? (status = 'approved')
3. Políticas RLS configuradas?
4. Cache do navegador? (Ctrl+F5)

### Reações não funcionam

**Checklist:**
1. Tabela `articles_reactions` existe?
2. API `/api/articles/[id]/reactions` responde?
3. Console do navegador tem erros?
4. Verificar Network tab no DevTools

### Upload de imagem falha

**Checklist:**
1. Bucket criado?
2. Políticas de upload configuradas?
3. Arquivo < 10MB?
4. Formato válido (jpg, png, webp)?
5. Storage do Supabase tem espaço?

---

## 📞 13. SUPORTE

Em caso de dúvidas:

1. **Logs do Supabase:**
   - Dashboard → Logs → Functions
   - Verificar erros de API

2. **Console do Navegador:**
   - F12 → Console
   - Verificar erros JavaScript

3. **Network Tab:**
   - F12 → Network
   - Ver requisições falhando

4. **SQL Editor:**
   - Testar queries manualmente
   - Verificar dados inseridos

---

**✅ TUDO PRONTO!**

Agora você tem:
- 📤 Upload de imagens
- 💬 Sistema de comentários
- 👍 Reações (likes/dislikes)
- 🎛️ Painel admin completo
- 📊 Analytics de engajamento

**Boa sorte com seu blog! 🚀**
