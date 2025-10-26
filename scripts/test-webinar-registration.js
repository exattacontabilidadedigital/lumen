const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://ejyqtpgmqeddxhzednuq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ'
)

async function testRegistration() {
  console.log('🔍 Testando tabela webinar_registrations...\n')

  // 1. Verificar se a tabela existe
  console.log('1️⃣ Verificando se a tabela existe...')
  const { data: tables, error: tablesError } = await supabase
    .from('webinar_registrations')
    .select('*')
    .limit(1)

  if (tablesError) {
    console.log('❌ Tabela não existe ou não está acessível!')
    console.log('Erro:', tablesError)
    console.log('\n📋 Execute o SQL no Supabase Dashboard:')
    console.log('https://supabase.com/dashboard/project/ejyqtpgmqeddxhzednuq/editor/sql\n')
    return
  }

  console.log('✅ Tabela existe!\n')

  // 2. Buscar um webinar para testar
  console.log('2️⃣ Buscando webinar para teste...')
  const { data: webinars, error: webinarsError } = await supabase
    .from('webinars')
    .select('id, title')
    .limit(1)

  if (webinarsError || !webinars || webinars.length === 0) {
    console.log('❌ Erro ao buscar webinar:', webinarsError)
    return
  }

  const testWebinar = webinars[0]
  console.log('✅ Webinar encontrado:', testWebinar.title, '\n')

  // 3. Tentar inserir uma inscrição de teste
  console.log('3️⃣ Tentando inserir inscrição de teste...')
  const testEmail = `teste-${Date.now()}@example.com`
  
  const { data: registration, error: insertError } = await supabase
    .from('webinar_registrations')
    .insert({
      webinar_id: testWebinar.id,
      name: 'Teste Usuario',
      email: testEmail,
      phone: '(11) 99999-9999',
      company: 'Empresa Teste',
      position: 'Desenvolvedor',
    })
    .select()

  if (insertError) {
    console.log('❌ Erro ao inserir:', insertError)
    console.log('Código:', insertError.code)
    console.log('Mensagem:', insertError.message)
    console.log('Detalhes:', insertError.details)
    return
  }

  console.log('✅ Inscrição criada com sucesso!')
  console.log('Dados:', registration, '\n')

  // 4. Verificar se consegue ler
  console.log('4️⃣ Verificando leitura...')
  const { data: readData, error: readError } = await supabase
    .from('webinar_registrations')
    .select('*')
    .eq('email', testEmail)
    .single()

  if (readError) {
    console.log('❌ Erro ao ler:', readError)
    return
  }

  console.log('✅ Inscrição lida com sucesso!')
  console.log('Dados:', readData, '\n')

  // 5. Limpar dados de teste
  console.log('5️⃣ Limpando dados de teste...')
  const { error: deleteError } = await supabase
    .from('webinar_registrations')
    .delete()
    .eq('email', testEmail)

  if (deleteError) {
    console.log('⚠️  Erro ao deletar (pode ser por RLS):', deleteError.message)
  } else {
    console.log('✅ Dados de teste removidos!')
  }

  console.log('\n✅ Todos os testes passaram! A tabela está funcionando corretamente.')
}

testRegistration().catch(console.error)
