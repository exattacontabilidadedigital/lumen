# Sistema de Artigos Relacionados

## 📋 Visão Geral

Sistema para vincular artigos relacionados e sugerir leitura adicional aos usuários. Permite que o administrador selecione até 6 artigos relacionados para cada artigo publicado.

## 🗄️ Configuração do Banco de Dados

### 1. Executar Migration no Supabase

Acesse o Supabase SQL Editor e execute o script:

```bash
scripts/006_add_related_articles.sql
```

**O que este script faz:**
- Adiciona coluna `related_articles` (UUID[]) na tabela `articles`
- Cria índice GIN para consultas eficientes em arrays
- Define valor padrão como array vazio `{}`

### 2. Verificar Instalação

Execute no SQL Editor:

```sql
-- Verificar estrutura da coluna
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'articles' 
AND column_name = 'related_articles';

-- Testar consulta de artigos por IDs
SELECT id, title, slug 
FROM articles 
WHERE id = ANY(ARRAY['uuid1', 'uuid2']::UUID[]);
```

## 🎯 Funcionalidades

### 1. Seletor de Artigos Relacionados (Admin)

**Componente:** `components/related-articles-selector.tsx`

**Features:**
- 🔍 Busca em tempo real por título ou categoria
- ✅ Seleção múltipla com checkboxes
- 🎯 Limite de 6 artigos relacionados
- 📋 Lista com scroll de artigos disponíveis
- 🏷️ Badges com categorias
- ❌ Remoção fácil de artigos selecionados
- 🚫 Exclusão automática do artigo atual

**Onde aparece:**
- Formulário de artigos: Aba "Config" → Seção "Artigos Relacionados"

**Como usar:**
1. Editar ou criar artigo no admin
2. Ir para aba "Config"
3. Rolar até "Artigos Relacionados"
4. Buscar e selecionar artigos (máximo 6)
5. Salvar/publicar artigo

### 2. Exibição de Artigos Relacionados (Frontend)

**Componente:** `components/related-articles.tsx`

**Features:**
- 📱 Grid responsivo (1 col mobile, 2 tablet, 3 desktop)
- 🖼️ Imagens com hover effect
- 🏷️ Badge de categoria
- ⏱️ Tempo de leitura
- ➡️ Ícone animado no hover
- 🎨 Cards com sombra e hover

**Onde aparece:**
- Página de artigo: Final do conteúdo, antes do footer

**Comportamento:**
- Exibe até 3 artigos relacionados
- Mostra apenas artigos publicados
- Não exibe seção se não houver artigos

## 📁 Arquivos Criados/Modificados

### Novos Arquivos
```
components/
  related-articles.tsx              # Display de artigos relacionados
  related-articles-selector.tsx     # Seletor para admin

scripts/
  006_add_related_articles.sql      # Migration do banco de dados

ARTIGOS_RELACIONADOS.md             # Esta documentação
```

### Arquivos Modificados
```
components/
  article-form.tsx                  # Integração do seletor
    - Importação do RelatedArticlesSelector
    - Campo related_articles no formData
    - Integração na aba "Config"

app/
  conteudos/[slug]/page.tsx         # Integração do display
    - Importação do RelatedArticles
    - Query para buscar artigos por IDs
    - Substituição da seção de relacionados
```

## 🔧 Como Funciona

### Fluxo de Dados

1. **Admin seleciona artigos:**
   ```typescript
   // Array de UUIDs é salvo no banco
   related_articles: ['uuid1', 'uuid2', 'uuid3']
   ```

2. **Frontend busca artigos:**
   ```typescript
   // Query Supabase com .in() operator
   const { data } = await supabase
     .from("articles")
     .select("id, slug, title, excerpt, category, reading_time, image_url")
     .in("id", article.related_articles)
     .eq("status", "published")
     .limit(3)
   ```

3. **Componente exibe cards:**
   ```typescript
   <RelatedArticles articles={relatedArticles} />
   ```

### Validações

- ✅ Máximo de 6 artigos selecionados
- ✅ Apenas artigos publicados são exibidos
- ✅ Artigo atual é excluído automaticamente da lista
- ✅ Seção não aparece se não houver artigos
- ✅ Busca funciona sem artigos selecionados

## 🎨 Interface do Admin

### Seletor de Artigos

```
┌─────────────────────────────────────────┐
│ Artigos Relacionados (máximo 6)        │
│ Selecione artigos para sugerir como    │
│ leitura adicional                       │
├─────────────────────────────────────────┤
│ Selecionados (2/6)                      │
│ [Artigo 1 ✕] [Artigo 2 ✕]              │
├─────────────────────────────────────────┤
│ 🔍 Buscar artigos...                    │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────┐    │
│ │ ☐ Artigo Título 1                │   │
│ │   [Categoria]                     │   │
│ │                                    │   │
│ │ ☑ Artigo Título 2 (selecionado)   │   │
│ │   [Categoria]                     │   │
│ │                                    │   │
│ │ ☐ Artigo Título 3                │   │
│ │   [Categoria]                     │   │
│ └─────────────────────────────────┘    │
│ ↕ Scroll                                │
└─────────────────────────────────────────┘
```

## 🌐 Interface do Frontend

### Cards de Artigos Relacionados

```
┌───────────────────────────────────────────────────────┐
│              Artigos Relacionados                     │
├─────────────┬─────────────┬─────────────┐            │
│ ┌─────────┐ │ ┌─────────┐ │ ┌─────────┐ │           │
│ │ Imagem  │ │ │ Imagem  │ │ │ Imagem  │ │           │
│ └─────────┘ │ └─────────┘ │ └─────────┘ │           │
│ [Categoria] │ [Categoria] │ [Categoria] │           │
│ ⏱ 5 min     │ ⏱ 8 min     │ ⏱ 3 min     │           │
│                                                       │
│ Título 1    │ Título 2    │ Título 3    │           │
│                                                       │
│ Excerpt...  │ Excerpt...  │ Excerpt...  │           │
│                                                       │
│ Ler artigo→ │ Ler artigo→ │ Ler artigo→ │           │
└─────────────┴─────────────┴─────────────┘            │
```

## 📊 Exemplo de Uso

### 1. Criar Migration

```bash
# O arquivo já existe em:
scripts/006_add_related_articles.sql
```

### 2. Executar no Supabase

```sql
-- Copie e cole todo o conteúdo do arquivo no SQL Editor
-- Execute o script
```

### 3. Vincular Artigos (Admin)

1. Acesse `/admin/articles`
2. Clique em "Editar" em um artigo
3. Vá para aba "Config"
4. Role até "Artigos Relacionados"
5. Busque e selecione até 6 artigos
6. Clique em "Publicar Artigo" ou "Salvar Rascunho"

### 4. Visualizar no Frontend

1. Acesse `/conteudos/[slug-do-artigo]`
2. Role até o final do conteúdo
3. Veja a seção "Artigos Relacionados" com os artigos vinculados

## 🔍 Queries Úteis

### Ver artigos com relacionados definidos
```sql
SELECT id, title, array_length(related_articles, 1) as quantidade
FROM articles 
WHERE related_articles IS NOT NULL 
  AND array_length(related_articles, 1) > 0
ORDER BY created_at DESC;
```

### Ver relacionamentos específicos
```sql
SELECT 
  a1.title as artigo_principal,
  a2.title as artigo_relacionado
FROM articles a1
CROSS JOIN LATERAL unnest(a1.related_articles) as rel_id
JOIN articles a2 ON a2.id = rel_id
WHERE a1.id = 'uuid-do-artigo';
```

### Limpar relacionamentos
```sql
-- Remover todos os relacionamentos de um artigo
UPDATE articles 
SET related_articles = '{}' 
WHERE id = 'uuid-do-artigo';
```

## 🚀 Deploy

Após executar o SQL no Supabase, o sistema já estará funcional. Não há necessidade de reiniciar a aplicação.

**Checklist de Deploy:**
- [ ] Executar script SQL no Supabase
- [ ] Verificar coluna `related_articles` na tabela
- [ ] Testar seleção de artigos no admin
- [ ] Verificar exibição no frontend
- [ ] Testar busca no seletor
- [ ] Validar limite de 6 artigos

## 🐛 Troubleshooting

### Seletor não carrega artigos
- Verificar se o endpoint `/api/articles` está funcionando
- Verificar console do navegador para erros
- Confirmar que existem artigos publicados

### Artigos relacionados não aparecem
- Confirmar que o artigo tem IDs no campo `related_articles`
- Verificar se os artigos relacionados estão publicados (status='published')
- Checar limite de 3 artigos na query

### Erro ao salvar artigos relacionados
- Verificar se a coluna `related_articles` existe na tabela
- Confirmar tipo do campo: UUID[]
- Verificar permissões RLS da tabela

## 📝 Notas Técnicas

- **Tipo de dados:** PostgreSQL UUID[] (array de UUIDs)
- **Índice:** GIN index para performance em queries
- **Limite:** 6 artigos podem ser selecionados, 3 são exibidos
- **Ordenação:** Mantém a ordem de seleção do admin
- **Performance:** Índice GIN otimiza queries `.in()` do Supabase

## ✅ Status

- [x] Migration criada
- [x] Componente de seleção (admin)
- [x] Componente de exibição (frontend)
- [x] Integração no formulário de artigos
- [x] Integração na página de detalhes
- [x] Documentação completa
- [ ] SQL executado no Supabase (aguardando execução)
