# 📸 Configuração do Supabase Storage para Upload de Imagens

## 🎯 Objetivo
Criar e configurar o bucket `article-images` no Supabase Storage para permitir upload de imagens nos artigos.

---

## 📋 Passo a Passo

### 1️⃣ Acessar o Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto **Lumen**

---

### 2️⃣ Criar o Bucket

1. No menu lateral, clique em **Storage**
2. Clique no botão **"New bucket"** (verde, no canto superior direito)
3. Preencha os campos:
   - **Name**: `article-images` (exatamente este nome, sem espaços)
   - **Public bucket**: ✅ **MARCAR** (permitir acesso público às imagens)
   - **File size limit**: Deixe o padrão ou defina `10 MB`
   - **Allowed MIME types**: Deixe vazio ou adicione: `image/jpeg, image/png, image/webp, image/gif`

4. Clique em **"Create bucket"**

---

### 3️⃣ Configurar Políticas de Acesso (RLS Policies)

Após criar o bucket, você precisa configurar as políticas de segurança:

#### 📖 Política 1: Leitura Pública (PUBLIC READ)

Permite que qualquer pessoa veja as imagens nos artigos.

1. Clique no bucket **article-images**
2. Vá na aba **Policies**
3. Clique em **"New Policy"**
4. Selecione **"For full customization"** (ou "Custom policy")
5. Preencha:
   - **Policy name**: `Public Read Access`
   - **Allowed operation**: `SELECT` (apenas leitura)
   - **Target roles**: `public`
   - **USING expression**: 
     ```sql
     true
     ```
   - **WITH CHECK expression**: (deixe vazio)

6. Clique em **"Review"** e depois **"Save policy"**

#### ✍️ Política 2: Upload Autenticado (AUTHENTICATED INSERT)

Permite que apenas usuários autenticados (admins) façam upload.

1. Clique em **"New Policy"** novamente
2. Preencha:
   - **Policy name**: `Authenticated Upload`
   - **Allowed operation**: `INSERT` (permitir upload)
   - **Target roles**: `authenticated`
   - **USING expression**: (deixe vazio)
   - **WITH CHECK expression**:
     ```sql
     (bucket_id = 'article-images')
     ```

3. Clique em **"Review"** e depois **"Save policy"**

#### 🗑️ Política 3: Delete Autenticado (AUTHENTICATED DELETE)

Permite que admins possam deletar imagens antigas.

1. Clique em **"New Policy"** novamente
2. Preencha:
   - **Policy name**: `Authenticated Delete`
   - **Allowed operation**: `DELETE`
   - **Target roles**: `authenticated`
   - **USING expression**:
     ```sql
     (bucket_id = 'article-images')
     ```
   - **WITH CHECK expression**: (deixe vazio)

3. Clique em **"Review"** e depois **"Save policy"**

---

### 4️⃣ Verificar a Estrutura de Pastas

O sistema está configurado para criar pastas automaticamente:

```
article-images/
└── articles/
    ├── 1730000000-abc123.jpg
    ├── 1730000001-def456.png
    └── 1730000002-ghi789.webp
```

**Não é necessário criar a pasta `articles/` manualmente** - ela será criada automaticamente no primeiro upload.

---

## ✅ Testar o Upload

Após configurar tudo:

1. Acesse sua aplicação: http://localhost:3000/admin/articles/new
2. Faça login como admin
3. No editor de texto, clique no botão **"Imagem"** 📷
4. Na aba **"Upload"**:
   - Clique em **"Escolher arquivo"**
   - Selecione uma imagem (JPG, PNG, WebP, GIF)
   - Adicione uma legenda (opcional)
   - Clique em **"Inserir"**

5. Verifique se:
   - ✅ Aparece uma mensagem de sucesso
   - ✅ A imagem aparece no editor
   - ✅ A imagem está centralizada
   - ✅ No Supabase Storage, aparece em `article-images/articles/`

---

## 🔍 Verificar Políticas no Dashboard

Para confirmar que as políticas estão corretas:

1. Vá em **Storage** → **article-images**
2. Clique na aba **Policies**
3. Você deve ver **3 políticas ativas**:
   - ✅ **Public Read Access** (SELECT, public)
   - ✅ **Authenticated Upload** (INSERT, authenticated)
   - ✅ **Authenticated Delete** (DELETE, authenticated)

---

## 🐛 Troubleshooting (Resolução de Problemas)

### ❌ Erro: "new row violates row-level security policy"

**Causa**: Falta política de INSERT para usuários autenticados.

**Solução**: Crie a política "Authenticated Upload" conforme descrito acima.

---

### ❌ Erro: "The resource already exists"

**Causa**: Você está tentando fazer upload de um arquivo que já existe.

**Solução**: O código já está configurado para gerar nomes únicos automaticamente. Se o erro persistir, delete o arquivo antigo no Storage.

---

### ❌ Erro: "Bucket not found"

**Causa**: O bucket `article-images` não existe ou o nome está errado.

**Solução**: 
1. Verifique se o bucket foi criado
2. Confirme que o nome é exatamente `article-images` (com hífen, sem espaços)

---

### ❌ Imagens não aparecem na página pública

**Causa**: Falta a política de leitura pública (SELECT).

**Solução**: Crie a política "Public Read Access" conforme descrito acima.

---

### ❌ Erro: "User is not authenticated"

**Causa**: Você não está logado como admin.

**Solução**: 
1. Faça logout: http://localhost:3000/auth/logout
2. Faça login novamente: http://localhost:3000/auth/login

---

## 📊 Formato das URLs Geradas

As imagens ficam acessíveis publicamente através de URLs como:

```
https://[seu-projeto].supabase.co/storage/v1/object/public/article-images/articles/1730000000-abc123.jpg
```

Estas URLs podem ser:
- ✅ Compartilhadas publicamente
- ✅ Usadas em redes sociais (Open Graph)
- ✅ Indexadas pelo Google
- ✅ Servidas via CDN do Supabase (rápido e global)

---

## 🎨 Recursos do Editor de Imagens

O editor já suporta:

### 1. Upload de Arquivo
- Selecione imagens do seu computador
- Formatos aceitos: JPG, PNG, WebP, GIF
- Tamanho máximo: 10 MB (configurável)
- Nome único gerado automaticamente

### 2. URL Externa
- Cole URLs de imagens hospedadas em outros lugares
- Útil para imagens de bancos de imagens (Unsplash, Pexels, etc.)

### 3. Legendas (Captions)
- Adicione descrições às imagens
- Texto aparece centralizado abaixo da imagem
- Melhora acessibilidade (SEO e leitores de tela)

### 4. Alinhamento
- Todas as imagens são centralizadas automaticamente
- Estilo responsivo (adapta ao tamanho da tela)
- Classes Tailwind customizadas aplicadas

---

## 🔐 Segurança

### O que está protegido:
- ✅ Apenas usuários autenticados podem fazer upload
- ✅ Apenas admins têm acesso ao editor
- ✅ Nomes de arquivos são randomizados (evita sobrescrever)
- ✅ Timestamps garantem unicidade
- ✅ Políticas RLS protegem operações sensíveis

### O que é público:
- ✅ Leitura das imagens (necessário para exibir nos artigos)
- ✅ URLs diretas (qualquer pessoa com o link pode acessar)

---

## 📈 Monitoramento

Para acompanhar o uso do Storage:

1. Vá em **Storage** no Supabase Dashboard
2. Veja as métricas:
   - Total de arquivos
   - Espaço usado (MB/GB)
   - Transferência (bandwidth)

### Limites do Plano Free:
- **Armazenamento**: 1 GB
- **Transferência**: 2 GB/mês
- **Uploads**: Ilimitados

Se ultrapassar, considere upgrade ou otimização de imagens.

---

## 🎯 Próximos Passos

Após configurar o Storage:

1. ✅ Teste fazer upload de algumas imagens
2. ✅ Crie um artigo com várias imagens
3. ✅ Verifique se as imagens aparecem na página pública
4. ✅ Teste as legendas
5. ✅ Verifique responsividade mobile

---

## 📝 Checklist de Configuração

- [ ] Bucket `article-images` criado
- [ ] Bucket marcado como **Public**
- [ ] Política "Public Read Access" criada (SELECT)
- [ ] Política "Authenticated Upload" criada (INSERT)
- [ ] Política "Authenticated Delete" criada (DELETE)
- [ ] Testei upload via admin
- [ ] Imagem aparece no editor
- [ ] Imagem aparece na página pública
- [ ] Legendas funcionando
- [ ] URLs acessíveis publicamente

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs no console do navegador (F12)
2. Verifique o terminal do Next.js
3. Confirme que está logado como admin
4. Teste com imagens pequenas primeiro (< 1MB)
5. Verifique as políticas no Supabase Dashboard

---

## ✨ Funcionalidade Completa!

Depois de configurar, você terá:

- ✅ Upload de imagens direto do dispositivo
- ✅ Suporte a URLs externas
- ✅ Legendas e alt text para acessibilidade
- ✅ Imagens centralizadas e responsivas
- ✅ Armazenamento seguro no Supabase
- ✅ CDN global (rápido em qualquer lugar do mundo)
- ✅ URLs permanentes e compartilháveis

**Pronto para criar artigos ricos em conteúdo visual! 🎉**
