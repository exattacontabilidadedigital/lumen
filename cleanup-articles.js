// Script para limpar artigos de teste e verificar status
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ejyqtpgmqeddxhzednuq.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function cleanupArticles() {
  console.log('🧹 Limpando artigos de teste...\n')

  // Deletar o artigo de teste "testes testes"
  const { error: deleteError } = await supabase
    .from('articles')
    .delete()
    .eq('slug', 'testes-testes')

  if (deleteError) {
    console.log('⚠️  Erro ao deletar artigo de teste:', deleteError.message)
  } else {
    console.log('✅ Artigo de teste "testes testes" deletado')
  }

  // Listar artigos publicados
  console.log('\n📰 Artigos Publicados:\n')
  
  const { data: published, error: publishedError } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (publishedError) {
    console.log('❌ Erro ao buscar artigos:', publishedError.message)
    return
  }

  if (published.length === 0) {
    console.log('⚠️  Nenhum artigo publicado encontrado')
    return
  }

  published.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title}`)
    console.log(`   ✅ Status: ${article.status}`)
    console.log(`   🔗 URL: http://localhost:3000/conteudos/${article.slug}`)
    console.log(`   📅 Criado: ${new Date(article.created_at).toLocaleDateString('pt-BR')}`)
    console.log('')
  })

  console.log(`\n✅ Total de artigos publicados: ${published.length}`)
  console.log('📋 Página de listagem: http://localhost:3000/conteudos')
}

cleanupArticles()
