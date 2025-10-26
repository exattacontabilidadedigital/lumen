const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://ejyqtpgmqeddxhzednuq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ'
)

const webinars = [
  {
    title: 'Reforma Tributária: Prepare sua Empresa para 2026',
    description: 'Entenda as mudanças da reforma tributária e como preparar sua empresa para as novas regras que entram em vigor em 2026. Workshop prático com nossos especialistas.',
    date: '2025-11-15',
    time: '14:00',
    duration: 90,
    spots_available: 100,
    instructor_name: 'Dr. Carlos Mendes',
    instructor_role: 'Especialista em Direito Tributário',
    topics: ['Reforma Tributária', 'IBS', 'CBS', 'Transição Tributária'],
    is_featured: true,
    is_past: false
  },
  {
    title: 'IBS e CBS: O que sua empresa precisa saber',
    description: 'Palestra sobre os novos impostos IBS (Imposto sobre Bens e Serviços) e CBS (Contribuição sobre Bens e Serviços) que substituirão PIS, COFINS, ICMS e ISS.',
    date: '2025-11-22',
    time: '15:00',
    duration: 60,
    spots_available: 150,
    instructor_name: 'Dra. Ana Silva',
    instructor_role: 'Consultora Tributária',
    topics: ['IBS', 'CBS', 'Sistema Tributário'],
    is_featured: false,
    is_past: false
  },
  {
    title: 'Planejamento Tributário para 2026',
    description: 'Como estruturar o planejamento tributário da sua empresa considerando as mudanças legislativas e oportunidades de economia fiscal.',
    date: '2025-12-05',
    time: '14:00',
    duration: 120,
    spots_available: 80,
    instructor_name: 'Dr. Roberto Costa',
    instructor_role: 'Diretor de Planejamento Tributário',
    topics: ['Planejamento Tributário', 'Economia Fiscal', 'Estratégias'],
    is_featured: false,
    is_past: false
  },
  {
    title: 'Recuperação de Créditos Tributários na Prática',
    description: 'Aprenda técnicas práticas para identificar e recuperar créditos tributários que sua empresa pode ter direito.',
    date: '2025-12-10',
    time: '16:00',
    duration: 90,
    spots_available: 60,
    instructor_name: 'Dra. Paula Martins',
    instructor_role: 'Especialista em Recuperação de Créditos',
    topics: ['Créditos Tributários', 'PIS', 'COFINS', 'ICMS'],
    is_featured: false,
    is_past: false
  },
  {
    title: 'Compliance Tributário: Evitando Riscos Fiscais',
    description: 'Workshop sobre como implementar um programa de compliance tributário efetivo e reduzir riscos de autuações fiscais.',
    date: '2025-12-18',
    time: '14:30',
    duration: 75,
    spots_available: 100,
    instructor_name: 'Dr. Fernando Lima',
    instructor_role: 'Auditor Fiscal',
    topics: ['Compliance', 'Riscos Fiscais', 'Autuações'],
    is_featured: false,
    is_past: false
  }
]

const guides = [
  {
    title: 'Guia Completo da Reforma Tributária',
    description: 'Material completo com tudo que você precisa saber sobre a reforma tributária: cronograma, mudanças, impactos e como se preparar.',
    category: 'Reforma Tributária',
    pages: 45,
    file_url: '/guides/reforma-tributaria-completo.pdf',
    is_featured: true
  },
  {
    title: 'Checklist de Planejamento Tributário 2026',
    description: 'Checklist passo a passo para revisar e otimizar o planejamento tributário da sua empresa para o próximo ano fiscal.',
    category: 'Planejamento Tributário',
    pages: 28,
    file_url: '/guides/checklist-planejamento-2026.pdf',
    is_featured: false
  },
  {
    title: 'Manual de Recuperação de Créditos PIS/COFINS',
    description: 'Guia prático para identificar, calcular e solicitar a recuperação de créditos de PIS e COFINS que sua empresa tem direito.',
    category: 'Recuperação de Créditos',
    pages: 52,
    file_url: '/guides/recuperacao-pis-cofins.pdf',
    is_featured: true
  },
  {
    title: 'IBS e CBS: Guia de Transição',
    description: 'Manual completo sobre a transição do sistema tributário atual para o IBS e CBS, com cronograma e ações práticas.',
    category: 'Reforma Tributária',
    pages: 38,
    file_url: '/guides/ibs-cbs-transicao.pdf',
    is_featured: false
  },
  {
    title: 'Estratégias de Economia Fiscal para Empresas',
    description: 'Técnicas e estratégias legais para reduzir a carga tributária da sua empresa de forma eficiente e segura.',
    category: 'Planejamento Tributário',
    pages: 35,
    file_url: '/guides/estrategias-economia-fiscal.pdf',
    is_featured: false
  },
  {
    title: 'Recuperação de ICMS: Passo a Passo',
    description: 'Guia detalhado sobre como recuperar créditos de ICMS pagos indevidamente ou não aproveitados pela empresa.',
    category: 'Recuperação de Créditos',
    pages: 42,
    file_url: '/guides/recuperacao-icms.pdf',
    is_featured: false
  }
]

async function createContent() {
  console.log('Creating webinars...')
  for (const webinar of webinars) {
    const { data, error } = await supabase
      .from('webinars')
      .insert(webinar)
      .select()
    
    if (error) {
      console.error('Error creating webinar:', webinar.title, error)
    } else {
      console.log('✓ Created webinar:', webinar.title)
    }
  }

  console.log('\nCreating guides...')
  for (const guide of guides) {
    const { data, error } = await supabase
      .from('guides')
      .insert(guide)
      .select()
    
    if (error) {
      console.error('Error creating guide:', guide.title, error)
    } else {
      console.log('✓ Created guide:', guide.title)
    }
  }

  console.log('\n✅ Done!')
}

createContent()
