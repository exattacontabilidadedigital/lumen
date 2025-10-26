// Script para criar artigo de exemplo no Supabase
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ejyqtpgmqeddxhzednuq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTg5MTgsImV4cCI6MjA3Njk3NDkxOH0.ElhwpiATyZCN9Fi_T2nhOq7Vn_OaUXngSUShXw-1-RI'

// Usar service role para inserir dados (apenas para teste)
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ'

const supabase = createClient(supabaseUrl, serviceRoleKey)

const articleExample = {
  slug: 'reforma-tributaria-2026-prepare-sua-empresa',
  title: 'Reforma Tributária 2026: Como Preparar Sua Empresa',
  excerpt: 'A reforma tributária de 2026 trará mudanças significativas. Entenda os impactos e como sua empresa pode se preparar para as novas regras.',
  content: `
    <h2>Entenda a Reforma Tributária 2026</h2>
    <p>A reforma tributária aprovada pelo Congresso Nacional entrará em vigor em 2026, trazendo mudanças profundas no sistema de tributação brasileiro. As principais alterações incluem a unificação de tributos e a simplificação do sistema.</p>
    
    <h3>Principais Mudanças</h3>
    <ul>
      <li><strong>Unificação de tributos:</strong> IBS (Imposto sobre Bens e Serviços) substituirá ICMS, ISS e PIS/Cofins</li>
      <li><strong>CBS (Contribuição sobre Bens e Serviços):</strong> Novo tributo federal que unifica PIS, Cofins e IPI</li>
      <li><strong>Cashback:</strong> Devolução de impostos para famílias de baixa renda</li>
      <li><strong>Alíquota única:</strong> Fim das diferenças estaduais de ICMS</li>
    </ul>
    
    <h3>Impactos para Micro e Pequenas Empresas</h3>
    <p>As micro e pequenas empresas terão um período de adaptação. É fundamental começar a planejar desde já para entender como as mudanças afetarão seu negócio.</p>
    
    <h3>Como a Lúmen Pode Ajudar</h3>
    <p>Nossa equipe de especialistas está preparada para analisar o impacto da reforma na sua empresa e desenvolver estratégias para minimizar custos e maximizar benefícios.</p>
    
    <p><strong>Solicite um diagnóstico gratuito</strong> e descubra como sua empresa pode se beneficiar das novas regras tributárias.</p>
  `,
  category: 'Reforma Tributária',
  author_name: 'Equipe Lúmen Consultoria',
  reading_time: '8 min',
  status: 'published',
  published: true,
  published_at: new Date().toISOString(),
  publish_date: new Date().toISOString(),
  meta_description: 'Guia completo sobre a reforma tributária de 2026 e como preparar sua empresa para as mudanças',
  tags: ['reforma tributária', 'tributos', 'planejamento tributário', '2026'],
  featured_image: null,
  featured_image_alt: 'Reforma Tributária 2026'
}

async function createExampleArticle() {
  console.log('📝 Criando artigo de exemplo...\n')

  const { data, error } = await supabase
    .from('articles')
    .insert([articleExample])
    .select()

  if (error) {
    console.log('❌ Erro ao criar artigo:', error.message)
    console.log('   Detalhes:', error)
    return
  }

  console.log('✅ Artigo criado com sucesso!')
  console.log('\n📰 Detalhes do artigo:')
  console.log('   - ID:', data[0].id)
  console.log('   - Título:', data[0].title)
  console.log('   - Slug:', data[0].slug)
  console.log('   - Status:', data[0].status)
  console.log('   - URL:', `http://localhost:3000/conteudos/${data[0].slug}`)
  console.log('\n✅ Acesse http://localhost:3000/conteudos para ver o artigo!')
}

createExampleArticle()
