// Script para adicionar mais artigos de exemplo em diferentes categorias
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ejyqtpgmqeddxhzednuq.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ'

const supabase = createClient(supabaseUrl, serviceRoleKey)

const newArticles = [
  {
    slug: 'icms-entenda-imposto-estadual',
    title: 'ICMS: Entenda o Imposto Estadual que Impacta Seu Negócio',
    excerpt: 'O ICMS é um dos impostos mais complexos do Brasil. Descubra como ele funciona e como otimizar seus custos.',
    content: `
      <h2>O que é ICMS?</h2>
      <p>O Imposto sobre Circulação de Mercadorias e Serviços (ICMS) é um tributo estadual que incide sobre a movimentação de produtos e alguns serviços.</p>
      
      <h3>Características do ICMS</h3>
      <ul>
        <li>Alíquota varia por estado (7% a 18%)</li>
        <li>Imposto não cumulativo</li>
        <li>Gestão estadual complexa</li>
        <li>Diferencial de alíquota entre estados</li>
      </ul>
      
      <h3>Como Otimizar</h3>
      <p>Existem estratégias legais para reduzir o impacto do ICMS, como aproveitamento de créditos e planejamento logístico.</p>
    `,
    category: 'Impostos Estaduais',
    author_name: 'Carlos Tributário',
    reading_time: '6 min',
    status: 'published',
    published: true
  },
  {
    slug: 'pis-cofins-guia-basico',
    title: 'PIS e COFINS: Guia Básico para Empresários',
    excerpt: 'Entenda as contribuições federais PIS e COFINS e como elas afetam o faturamento da sua empresa.',
    content: `
      <h2>PIS e COFINS Explicados</h2>
      <p>O PIS (Programa de Integração Social) e a COFINS (Contribuição para Financiamento da Seguridade Social) são contribuições federais sobre o faturamento.</p>
      
      <h3>Regimes de Apuração</h3>
      <ul>
        <li><strong>Cumulativo:</strong> Alíquota fixa, sem direito a créditos</li>
        <li><strong>Não cumulativo:</strong> Alíquota maior, mas com direito a créditos</li>
      </ul>
      
      <h3>Qual é Melhor?</h3>
      <p>Depende do seu modelo de negócio. Empresas com muitos insumos geralmente se beneficiam do regime não cumulativo.</p>
    `,
    category: 'Impostos Federais',
    author_name: 'Ana Paula Fiscal',
    reading_time: '5 min',
    status: 'published',
    published: true
  },
  {
    slug: 'nota-fiscal-eletronica-nfe',
    title: 'Nota Fiscal Eletrônica (NF-e): Como Emitir Corretamente',
    excerpt: 'Aprenda a emitir NF-e sem erros e evite problemas com o fisco. Guia completo para iniciantes.',
    content: `
      <h2>O que é a NF-e?</h2>
      <p>A Nota Fiscal Eletrônica é um documento digital que substitui a nota fiscal em papel, tornando o processo mais ágil e seguro.</p>
      
      <h3>Passo a Passo</h3>
      <ol>
        <li>Obtenha certificado digital</li>
        <li>Cadastre-se no sistema da Sefaz</li>
        <li>Escolha um software emissor</li>
        <li>Preencha os dados corretamente</li>
        <li>Transmita e armazene o XML</li>
      </ol>
      
      <h3>Erros Comuns</h3>
      <p>Classificação fiscal incorreta, CFOP errado e dados cadastrais desatualizados são os erros mais frequentes.</p>
    `,
    category: 'Gestão Fiscal',
    author_name: 'Equipe Lúmen Consultoria',
    reading_time: '8 min',
    status: 'published',
    published: true
  },
  {
    slug: 'lucro-presumido-ou-real',
    title: 'Lucro Presumido ou Real: Qual Escolher?',
    excerpt: 'Compare os dois principais regimes tributários para empresas que ultrapassaram o limite do Simples Nacional.',
    content: `
      <h2>Diferenças Entre os Regimes</h2>
      <p>O Lucro Presumido e o Lucro Real são opções para empresas que não podem ou não querem optar pelo Simples Nacional.</p>
      
      <h3>Lucro Presumido</h3>
      <ul>
        <li>Cálculo simplificado</li>
        <li>Base de cálculo presumida</li>
        <li>Menos obrigações acessórias</li>
        <li>Ideal para margens altas</li>
      </ul>
      
      <h3>Lucro Real</h3>
      <ul>
        <li>Tributação sobre lucro efetivo</li>
        <li>Mais obrigações acessórias</li>
        <li>Aproveitamento de prejuízos fiscais</li>
        <li>Ideal para margens baixas</li>
      </ul>
      
      <h3>Como Decidir</h3>
      <p>A escolha depende da margem de lucro, despesas dedutíveis e estrutura da empresa. Nossa equipe pode fazer uma simulação para você.</p>
    `,
    category: 'Regimes Tributários',
    author_name: 'Dr. Roberto Contábil',
    reading_time: '7 min',
    status: 'published',
    published: true
  },
  {
    slug: 'incentivos-fiscais-2026',
    title: 'Incentivos Fiscais em 2026: Oportunidades para PMEs',
    excerpt: 'Conheça os principais incentivos fiscais disponíveis e como sua empresa pode se beneficiar deles.',
    content: `
      <h2>Tipos de Incentivos Fiscais</h2>
      <p>O governo oferece diversos incentivos para estimular setores específicos e regiões do país.</p>
      
      <h3>Principais Incentivos</h3>
      <ul>
        <li><strong>Zona Franca de Manaus:</strong> Redução de impostos para indústrias</li>
        <li><strong>Lei do Bem:</strong> Inovação tecnológica</li>
        <li><strong>PADIS:</strong> Semicondutores e displays</li>
        <li><strong>Incentivos Estaduais:</strong> Variam por estado</li>
      </ul>
      
      <h3>Como Acessar</h3>
      <p>Cada incentivo tem requisitos específicos. É fundamental ter documentação organizada e assessoria especializada.</p>
    `,
    category: 'Planejamento Tributário',
    author_name: 'Mariana Fiscal',
    reading_time: '6 min',
    status: 'published',
    published: true
  }
]

async function addMoreArticles() {
  console.log('📝 Adicionando mais artigos de exemplo...\n')

  for (const article of newArticles) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()

    if (error) {
      console.log(`❌ Erro ao criar "${article.title}":`, error.message)
    } else {
      console.log(`✅ ${data[0].title}`)
      console.log(`   Categoria: ${data[0].category}`)
    }
  }

  console.log('\n✅ Artigos adicionados!')
  console.log('📊 Agora você tem artigos em múltiplas categorias')
  console.log('🔗 Acesse: http://localhost:3000/conteudos')
}

addMoreArticles()
