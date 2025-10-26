// Script de teste final - verificar renderização de artigos
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ejyqtpgmqeddxhzednuq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTg5MTgsImV4cCI6MjA3Njk3NDkxOH0.ElhwpiATyZCN9Fi_T2nhOq7Vn_OaUXngSUShXw-1-RI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testArticleRendering() {
  console.log('🧪 TESTE FINAL - Renderização de Artigos\n')
  console.log('=' .repeat(60))
  
  // Teste 1: Buscar artigos publicados (como a página faz)
  console.log('\n📋 TESTE 1: Listar artigos publicados')
  console.log('-'.repeat(60))
  
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('publish_date', { ascending: false })
    .limit(6)

  if (articlesError) {
    console.log('❌ ERRO:', articlesError.message)
    return
  }

  console.log(`✅ ${articles.length} artigos encontrados`)
  
  if (articles.length === 0) {
    console.log('⚠️  PROBLEMA: Nenhum artigo publicado encontrado!')
    return
  }

  // Teste 2: Verificar campos necessários
  console.log('\n🔍 TESTE 2: Verificar campos obrigatórios')
  console.log('-'.repeat(60))
  
  const featuredArticle = articles[0]
  const requiredFields = ['slug', 'title', 'excerpt', 'content', 'category', 'author_name', 'reading_time']
  const missingFields = []
  
  requiredFields.forEach(field => {
    if (!featuredArticle[field]) {
      missingFields.push(field)
    }
  })
  
  if (missingFields.length > 0) {
    console.log(`⚠️  PROBLEMA: Campos faltando - ${missingFields.join(', ')}`)
  } else {
    console.log('✅ Todos os campos obrigatórios presentes')
  }

  // Teste 3: Verificar datas
  console.log('\n📅 TESTE 3: Verificar campos de data')
  console.log('-'.repeat(60))
  
  articles.forEach((article, index) => {
    const date = article.publish_date || article.created_at
    if (date) {
      console.log(`✅ Artigo ${index + 1}: Data OK (${new Date(date).toLocaleDateString('pt-BR')})`)
    } else {
      console.log(`⚠️  Artigo ${index + 1}: Sem data!`)
    }
  })

  // Teste 4: Testar busca individual por slug
  console.log('\n🔗 TESTE 4: Buscar artigo individual por slug')
  console.log('-'.repeat(60))
  
  const testSlug = articles[0].slug
  const { data: singleArticle, error: singleError } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', testSlug)
    .eq('status', 'published')
    .single()

  if (singleError) {
    console.log(`❌ ERRO ao buscar artigo "${testSlug}":`, singleError.message)
  } else {
    console.log(`✅ Artigo encontrado: "${singleArticle.title}"`)
    console.log(`   URL: http://localhost:3000/conteudos/${singleArticle.slug}`)
  }

  // Resumo final
  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMO DOS TESTES')
  console.log('='.repeat(60))
  console.log(`✅ Artigos publicados: ${articles.length}`)
  console.log(`✅ Campos obrigatórios: ${missingFields.length === 0 ? 'OK' : 'FALTANDO'}`)
  console.log(`✅ Busca por slug: ${singleError ? 'ERRO' : 'OK'}`)
  console.log('\n🎯 URLs PARA TESTAR NO NAVEGADOR:')
  console.log('-'.repeat(60))
  console.log('1. Lista: http://localhost:3000/conteudos')
  articles.slice(0, 3).forEach((article, index) => {
    console.log(`${index + 2}. Artigo: http://localhost:3000/conteudos/${article.slug}`)
  })
  console.log('\n✅ Se o servidor estiver rodando, teste essas URLs!')
  console.log('   Execute: npm run dev\n')
}

testArticleRendering()
