-- =============================================
-- Script: 008_configure_storage_policies.sql
-- Descrição: Configura políticas RLS para o bucket article-images
-- Data: 2025-10-26
-- =============================================

-- IMPORTANTE: Este script deve ser executado DEPOIS de criar o bucket 'article-images'
-- através do Supabase Dashboard em Storage > New bucket
-- Nome do bucket: article-images
-- Public bucket: SIM (marcar)

-- =============================================
-- Políticas de Acesso ao Storage
-- =============================================

-- Política 1: Permitir leitura pública das imagens
-- Qualquer pessoa pode visualizar as imagens dos artigos
CREATE POLICY "Public can view article images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'article-images');

-- Política 2: Permitir upload apenas para usuários autenticados
-- Apenas admins logados podem fazer upload de imagens
CREATE POLICY "Authenticated users can upload article images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images');

-- Política 3: Permitir update apenas para usuários autenticados
-- Permite atualizar metadados das imagens
CREATE POLICY "Authenticated users can update article images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'article-images')
WITH CHECK (bucket_id = 'article-images');

-- Política 4: Permitir delete apenas para usuários autenticados
-- Permite que admins removam imagens antigas
CREATE POLICY "Authenticated users can delete article images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'article-images');

-- =============================================
-- Verificar as políticas criadas
-- =============================================

-- Execute esta query para ver todas as políticas do bucket article-images
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%article%';

-- =============================================
-- INSTRUÇÕES DE USO
-- =============================================

/*

1. CRIAR O BUCKET PRIMEIRO (via Dashboard):
   - Acesse: Supabase Dashboard > Storage
   - Clique em "New bucket"
   - Nome: article-images
   - Public bucket: MARCAR (✓)
   - Clique em "Create bucket"

2. EXECUTAR ESTE SCRIPT:
   - Acesse: Supabase Dashboard > SQL Editor
   - Cole este script completo
   - Clique em "Run" ou pressione Ctrl+Enter

3. VERIFICAR SE FUNCIONOU:
   - Vá em: Storage > article-images > Policies
   - Você deve ver 4 políticas ativas:
     ✓ Public can view article images (SELECT)
     ✓ Authenticated users can upload article images (INSERT)
     ✓ Authenticated users can update article images (UPDATE)
     ✓ Authenticated users can delete article images (DELETE)

4. TESTAR O UPLOAD:
   - Acesse: http://localhost:3000/admin/articles/new
   - Faça login como admin
   - No editor, clique no botão "Imagem"
   - Selecione uma imagem e faça upload
   - Verifique se aparece a mensagem de sucesso

*/

-- =============================================
-- TROUBLESHOOTING
-- =============================================

/*

ERRO: "policy already exists"
SOLUÇÃO: As políticas já foram criadas. Verifique no Dashboard em Storage > Policies

ERRO: "bucket 'article-images' does not exist"
SOLUÇÃO: Crie o bucket primeiro via Dashboard (veja instruções acima)

ERRO: "new row violates row-level security policy"
SOLUÇÃO: Certifique-se de estar logado como admin na aplicação

ERRO: "User is not authenticated"
SOLUÇÃO: Faça logout e login novamente em /auth/logout e /auth/login

*/

-- =============================================
-- REMOVER POLÍTICAS (SE NECESSÁRIO)
-- =============================================

/*

-- Descomente as linhas abaixo se precisar remover as políticas

DROP POLICY IF EXISTS "Public can view article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete article images" ON storage.objects;

*/

-- =============================================
-- FIM DO SCRIPT
-- =============================================

-- Após executar este script, o sistema de upload de imagens estará
-- completamente funcional e seguro! 🎉
