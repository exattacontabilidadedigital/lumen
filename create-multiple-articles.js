// Script para criar múltiplos artigos de exemplo
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ejyqtpgmqeddxhzednuq.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ'

const supabase = createClient(supabaseUrl, serviceRoleKey)

const articles = [
  {
    slug: 'recuperacao-creditos-tributarios-guia-completo',
    title: 'Recuperação de Créditos Tributários: Guia Completo',
    excerpt: 'Descubra como sua empresa pode recuperar impostos pagos indevidamente e aumentar o caixa sem novos investimentos.',
    content: `
      <h2>O que é Recuperação de Créditos Tributários?</h2>
      <p>A recuperação de créditos tributários é o processo de identificar e recuperar valores pagos indevidamente ao fisco. Muitas empresas pagam mais impostos do que deveriam devido à complexidade da legislação brasileira.</p>
      
      <h3>Principais Oportunidades</h3>
      <ul>
        <li><strong>PIS e COFINS:</strong> Exclusão de ICMS da base de cálculo</li>
        <li><strong>ICMS-ST:</strong> Restituição de diferenças de alíquota</li>
        <li><strong>Insumos:</strong> Créditos não aproveitados na produção</li>
        <li><strong>Exportação:</strong> Créditos acumulados</li>
      </ul>
      
      <h3>Como Funciona o Processo</h3>
      <p>Nossa equipe realiza uma análise minuciosa dos últimos 5 anos de operações da sua empresa, identificando oportunidades de recuperação. O processo é todo documentado e pode ser feito administrativamente ou judicialmente.</p>
      
      <h3>Benefícios</h3>
      <p>Empresas que realizam a recuperação de créditos conseguem recursos adicionais que podem ser reinvestidos no negócio, melhorando o fluxo de caixa sem comprometer a operação.</p>
    `,
    category: 'Planejamento Tributário',
    author_name: 'Dra. Maria Silva',
    reading_time: '6 min',
    status: 'published',
    published: true
  },
  {
    slug: 'simples-nacional-vale-pena-2026',
    title: 'Simples Nacional: Vale a Pena em 2026?',
    excerpt: 'Com a reforma tributária, muitas empresas se perguntam se o Simples Nacional ainda será vantajoso. Entenda os cenários.',
    content: `
      <h2>Simples Nacional e a Reforma Tributária</h2>
      <p>O Simples Nacional é um regime simplificado que unifica diversos tributos em uma única guia. Com a reforma tributária, muitas dúvidas surgiram sobre sua manutenção e vantagens.</p>
      
      <h3>O que Muda com a Reforma</h3>
      <p>O governo garantiu que o Simples Nacional será mantido, mas haverá adaptações para integração com o novo sistema tributário (IBS e CBS).</p>
      
      <h3>Quando Vale a Pena</h3>
      <ul>
        <li>Faturamento até R$ 4,8 milhões/ano</li>
        <li>Empresas de serviços com folha de pagamento alta</li>
        <li>Comércio com margem de lucro moderada</li>
        <li>Empresas que buscam simplicidade administrativa</li>
      </ul>
      
      <h3>Quando Pode Não Valer a Pena</h3>
      <ul>
        <li>Empresas com muitos créditos tributários</li>
        <li>Exportadoras</li>
        <li>Indústrias com alta carga de insumos</li>
        <li>Empresas próximas ao limite de faturamento</li>
      </ul>
      
      <h3>Faça uma Análise Personalizada</h3>
      <p>Cada empresa tem suas particularidades. Nossa equipe pode fazer uma análise comparativa entre os regimes tributários e mostrar qual é o mais vantajoso para o seu negócio.</p>
    `,
    category: 'Regimes Tributários',
    author_name: 'João Santos, Consultor Tributário',
    reading_time: '7 min',
    status: 'published',
    published: true
  },
  {
    slug: 'planejamento-tributario-pmes',
    title: 'Planejamento Tributário para PMEs: Por Onde Começar?',
    excerpt: 'Reduza legalmente a carga tributária da sua empresa com estratégias simples e eficazes de planejamento.',
    content: `
      <h2>Por que Fazer Planejamento Tributário?</h2>
      <p>O planejamento tributário é fundamental para que sua empresa pague apenas os impostos devidos, sem excessos. Uma estratégia bem elaborada pode gerar economia de 15% a 30% na carga tributária.</p>
      
      <h3>Passos Básicos</h3>
      <ol>
        <li><strong>Diagnóstico:</strong> Analisar a situação atual da empresa</li>
        <li><strong>Regime Tributário:</strong> Avaliar qual é o mais vantajoso</li>
        <li><strong>Estruturação:</strong> Organizar processos e documentação</li>
        <li><strong>Implementação:</strong> Aplicar as estratégias definidas</li>
        <li><strong>Monitoramento:</strong> Acompanhar resultados e ajustar</li>
      </ol>
      
      <h3>Estratégias Comuns</h3>
      <ul>
        <li>Escolha do regime tributário adequado</li>
        <li>Aproveitamento de incentivos fiscais</li>
        <li>Segregação de atividades</li>
        <li>Uso correto de créditos tributários</li>
        <li>Planejamento societário</li>
      </ul>
      
      <h3>Atenção aos Riscos</h3>
      <p>O planejamento tributário deve sempre estar dentro da legalidade. Práticas agressivas ou elisão fiscal podem trazer problemas com o fisco. Nossa equipe trabalha apenas com estratégias seguras e comprovadas.</p>
    `,
    category: 'Planejamento Tributário',
    author_name: 'Equipe Lúmen Consultoria',
    reading_time: '5 min',
    status: 'published',
    published: true
  }
]

async function createMultipleArticles() {
  console.log('📝 Criando múltiplos artigos de exemplo...\n')

  for (const article of articles) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()

    if (error) {
      console.log(`❌ Erro ao criar "${article.title}":`, error.message)
    } else {
      console.log(`✅ Criado: ${data[0].title}`)
      console.log(`   URL: http://localhost:3000/conteudos/${data[0].slug}`)
    }
  }

  console.log('\n✅ Processo concluído!')
  console.log('📰 Acesse http://localhost:3000/conteudos para ver todos os artigos')
}

createMultipleArticles()
