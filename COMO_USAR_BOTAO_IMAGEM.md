# 🖼️ Como Usar o Botão de Upload de Imagem

## 📍 Localização do Botão

### Passo 1: Acesse o Editor de Artigos

1. **Vá para o painel admin:**
   ```
   http://localhost:3000/admin/articles
   ```

2. **Escolha uma opção:**
   - **Criar novo:** Clique no botão verde **"Novo Artigo"** (canto superior direito)
   - **Editar existente:** Clique no ícone de lápis ✏️ ao lado de qualquer artigo

### Passo 2: Encontre a Barra de Ferramentas

Role a página até encontrar o campo **"Conteúdo"**. Logo acima da área de texto, você verá uma **barra de ferramentas** com vários ícones:

```
┌─────────────────────────────────────────────────────────────────┐
│  [B] [I] [S] [</>] │ [H2] [H3] │ [•] [1.] ["] [<code>] │        │
│  [↶] [↷] │ [🔗] [📷] [—] │ [≡] [≡] [≡] [≡]                      │
└─────────────────────────────────────────────────────────────────┘
```

### Passo 3: Identifique o Botão de Imagem

O **botão de imagem** é o ícone **📷** (ImageIcon) na barra de ferramentas.

**Posição exata:**
- Está no **meio** da barra de ferramentas
- **Depois** dos botões de Desfazer/Refazer (↶ ↷)
- **Depois** do botão de Link (🔗)
- **Antes** do botão de Linha Horizontal (—)

## 🎯 Como Usar o Botão

### 1️⃣ Clique no Botão 📷

Quando você clicar no botão de imagem, uma **janela modal** será aberta com o título:

```
┌──────────────────────────────────────┐
│  Inserir Imagem                   ✕  │
├──────────────────────────────────────┤
│                                      │
│  [Upload]  [URL]                     │
│  ▔▔▔▔▔▔▔                             │
│                                      │
```

### 2️⃣ Escolha o Método

Você tem **2 opções** para inserir imagens:

#### 📤 Opção A: Upload de Arquivo (Recomendada)

**Quando usar:**
- Imagens no seu computador
- Fotos que você tirou
- Imagens que você criou

**Como usar:**
1. Clique na aba **"Upload"**
2. Clique em **"Escolher arquivo"**
3. Selecione uma imagem (JPG, PNG, WebP, GIF)
4. Adicione uma **legenda** (opcional, mas recomendado)
5. Clique em **"Inserir"**

**O que acontece:**
- 🚀 Imagem é enviada para o Supabase Storage
- ⏱️ Aparece um spinner de loading
- ✅ Mensagem de sucesso: "Upload concluído!"
- 🖼️ Imagem aparece no editor

#### 🔗 Opção B: URL Externa

**Quando usar:**
- Imagens já hospedadas online
- Imagens de bancos gratuitos (Unsplash, Pexels)
- Imagens de CDNs

**Como usar:**
1. Clique na aba **"URL"**
2. Cole a URL completa da imagem
   - Exemplo: `https://images.unsplash.com/photo-...`
3. Adicione uma **legenda** (opcional)
4. Clique em **"Inserir"**

**O que acontece:**
- 🖼️ Imagem é inserida diretamente no editor
- ⚡ Sem upload (mais rápido)
- ⚠️ Depende do site externo estar online

### 3️⃣ A Imagem Aparece no Editor

Após inserir, a imagem será:
- ✅ Centralizada automaticamente
- ✅ Responsiva (adapta ao tamanho da tela)
- ✅ Com legenda abaixo (se você adicionou)
- ✅ Editável (pode deletar e inserir outra)

## 🖼️ Visual da Interface

### Barra de Ferramentas Completa:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Negrito │ Itálico │ Riscado │ Código │ Título 2 │ Título 3 │            │
│    [B]  │   [I]   │   [S]   │  [</>] │   [H2]   │   [H3]   │            │
├─────────────────────────────────────────────────────────────────────────┤
│ Lista • │ Lista 1 │ Citação │ Bloco de código │                         │
│   [•]   │   [1.]  │   ["]   │     [<code>]    │                         │
├─────────────────────────────────────────────────────────────────────────┤
│ Desfazer │ Refazer │ Link │ IMAGEM │ Linha │                            │
│   [↶]    │   [↷]   │ [🔗] │  [📷]  │  [—]  │                            │
├─────────────────────────────────────────────────────────────────────────┤
│ Alinhar Esquerda │ Centro │ Direita │ Justificar │                      │
│       [≡←]       │  [≡]   │  [≡→]   │    [≡≡]    │                      │
└─────────────────────────────────────────────────────────────────────────┘
```

**O botão de IMAGEM [📷] está destacado acima!**

### Modal de Upload:

```
┌─────────────────────────────────────────────────┐
│  Inserir Imagem                              ✕  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────┬─────────┐                         │
│  │ Upload  │   URL   │   ← Abas               │
│  └─────────┴─────────┘                         │
│                                                 │
│  ┌─────────────────────────────────────────┐  │
│  │  [Escolher arquivo]                     │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│  Legenda / Alt Text                            │
│  ┌─────────────────────────────────────────┐  │
│  │ Descrição da imagem...                  │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│           [Cancelar]  [Inserir]                │
│                                                 │
└─────────────────────────────────────────────────┘
```

## ⚙️ Estados do Botão

### 🟢 Normal (Pronto para usar)
- Cor: Cinza padrão
- Tooltip: "Inserir imagem" (ao passar o mouse)
- Clicável: ✅ Sim

### 🟡 Loading (Fazendo upload)
- Aparece um spinner: ⏳
- Botão "Inserir" desabilitado
- Mensagem: "Enviando imagem..."

### 🟢 Sucesso
- Toast verde: "Upload concluído! ✅"
- Imagem aparece no editor
- Modal fecha automaticamente

### 🔴 Erro
- Toast vermelho: "Erro no upload ❌"
- Mensagem de erro específica
- Modal permanece aberto (pode tentar novamente)

## 🎨 Dicas de Uso

### ✅ Boas Práticas:

1. **Use imagens otimizadas:**
   - Tamanho recomendado: < 1 MB
   - Formatos: WebP (melhor), JPG, PNG
   - Resolução: 1200-1600px de largura

2. **Sempre adicione legendas:**
   - Melhora acessibilidade
   - Ajuda no SEO
   - Facilita compreensão

3. **Nomeie arquivos antes:**
   - ❌ Evite: `IMG_20241026.jpg`
   - ✅ Use: `reforma-tributaria-grafico.jpg`

4. **Teste antes de publicar:**
   - Visualize o artigo
   - Verifique no mobile
   - Teste velocidade de carregamento

### ⚠️ Atenção:

- **Bucket precisa estar configurado** primeiro (veja CONFIGURACAO_STORAGE.md)
- **Você precisa estar logado** como admin
- **Conexão com internet** é necessária
- **Limites do Supabase Free:** 1 GB de storage

## 🐛 Problemas Comuns

### ❌ Botão não aparece?
**Causa:** Página não carregou completamente  
**Solução:** Recarregue a página (F5)

### ❌ Modal não abre?
**Causa:** Erro no JavaScript  
**Solução:** Abra o console (F12) e verifique erros

### ❌ Erro ao fazer upload?
**Causa:** Bucket não configurado  
**Solução:** Siga o guia CONFIGURACAO_STORAGE.md

### ❌ Imagem não aparece depois?
**Causa:** Erro na URL ou permissões  
**Solução:** Verifique políticas RLS no Supabase

## 🎬 Fluxo Completo

```
1. Acesse /admin/articles/new
         ↓
2. Role até "Conteúdo"
         ↓
3. Clique no botão 📷
         ↓
4. Modal abre com abas
         ↓
5. Escolha Upload ou URL
         ↓
6. [Se Upload] Selecione arquivo
         ↓
7. Adicione legenda (opcional)
         ↓
8. Clique "Inserir"
         ↓
9. Aguarde upload ⏳
         ↓
10. Imagem aparece! ✅
```

## 📸 Exemplo Prático

**Cenário:** Você quer adicionar uma imagem de gráfico ao artigo.

1. **Posicione o cursor** onde quer inserir a imagem
2. **Clique** no botão 📷 na barra de ferramentas
3. **Selecione** a aba "Upload"
4. **Clique** em "Escolher arquivo"
5. **Selecione** o arquivo `grafico-reforma.png`
6. **Digite** a legenda: "Gráfico mostrando impacto da reforma tributária"
7. **Clique** em "Inserir"
8. **Aguarde** a mensagem de sucesso
9. **Veja** a imagem aparecer no editor!

## ✨ Resultado Final

Depois de inserir, você verá no editor:

```
[Texto do artigo...]

┌─────────────────────────────────────┐
│                                     │
│         [Sua Imagem Aqui]           │
│                                     │
└─────────────────────────────────────┘
  Gráfico mostrando impacto da
      reforma tributária

[Mais texto do artigo...]
```

---

## 🚀 Pronto para Usar!

Agora você já sabe:
- ✅ Onde fica o botão (📷 na barra de ferramentas)
- ✅ Como usar (Upload ou URL)
- ✅ O que esperar (modal, upload, sucesso)
- ✅ Como resolver problemas

**Basta configurar o Storage e começar a usar!** 🎉
