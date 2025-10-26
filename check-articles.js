// Script para verificar artigos no Supabase
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ejyqtpgmqeddxhzednuq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTg5MTgsImV4cCI6MjA3Njk3NDkxOH0.ElhwpiATyZCN9Fi_T2nhOq7Vn_OaUXngSUShXw-1-RI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkArticles() {
  console.log('🔍 Verificando artigos no banco de dados...\n')

  // Buscar todos os artigos
  const { data: allArticles, error: allError } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (allError) {
    console.log('❌ Erro ao buscar artigos:', allError.message)
    return
  }

  console.log(`📊 Total de artigos: ${allArticles.length}\n`)

  if (allArticles.length === 0) {
    console.log('⚠️  Nenhum artigo encontrado no banco de dados.')
    console.log('   Você precisa criar artigos através da página /admin/articles/new\n')
    return
  }

  // Mostrar todos os artigos
  console.log('📝 Lista de artigos:\n')
  allArticles.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title}`)
    console.log(`   - Status: ${article.status || article.published ? 'published' : 'draft'}`)
    console.log(`   - Slug: ${article.slug}`)
    console.log(`   - Categoria: ${article.category || 'Sem categoria'}`)
    console.log(`   - Criado em: ${new Date(article.created_at).toLocaleDateString('pt-BR')}`)
    console.log(`   - URL: /conteudos/${article.slug}`)
    console.log('')
  })

  // Buscar artigos publicados
  const { data: publishedArticles, error: publishedError } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (publishedError) {
    console.log('⚠️  Erro ao buscar artigos publicados:', publishedError.message)
    
    // Tentar com o campo 'published' (boolean)
    const { data: publishedAlt, error: publishedAltError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (!publishedAltError && publishedAlt) {
      console.log(`\n✅ Artigos publicados (campo 'published'): ${publishedAlt.length}`)
      publishedAlt.forEach((article, index) => {
        console.log(`   ${index + 1}. ${article.title}`)
      })
    }
  } else {
    console.log(`✅ Artigos publicados (campo 'status'): ${publishedArticles.length}`)
    if (publishedArticles.length > 0) {
      console.log('\n📰 Artigos que aparecerão na página /conteudos:\n')
      publishedArticles.forEach((article, index) => {
        console.log(`   ${index + 1}. ${article.title}`)
      })
    } else {
      console.log('\n⚠️  Nenhum artigo com status "published". Verifique o status dos artigos.')
    }
  }

  // Verificar estrutura da tabela
  console.log('\n📋 Estrutura do primeiro artigo:')
  if (allArticles[0]) {
    console.log('   Campos disponíveis:', Object.keys(allArticles[0]).join(', '))
  }
}

checkArticles()
