// Script de teste para conexão com Supabase
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ejyqtpgmqeddxhzednuq.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTg5MTgsImV4cCI6MjA3Njk3NDkxOH0.ElhwpiATyZCN9Fi_T2nhOq7Vn_OaUXngSUShXw-1-RI'

console.log('🔍 Testando conexão com Supabase...\n')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey.substring(0, 20) + '...\n')

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Teste 1: Verificar conexão básica
    console.log('✅ Teste 1: Verificando conexão básica...')
    const { data, error } = await supabase.from('articles').select('count').limit(1)
    
    if (error) {
      console.log('❌ Erro na conexão:', error.message)
      
      // Teste se a tabela existe
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('\n⚠️  A tabela "articles" não existe no banco de dados.')
        console.log('   Você precisa executar os scripts SQL em scripts/001_create_admin_tables.sql')
      }
    } else {
      console.log('✅ Conexão estabelecida com sucesso!')
      console.log('   Dados retornados:', data)
    }

    // Teste 2: Listar todas as tabelas
    console.log('\n✅ Teste 2: Listando tabelas disponíveis...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (tablesError) {
      console.log('⚠️  Não foi possível listar tabelas (isso é normal)')
    } else if (tables) {
      console.log('   Tabelas encontradas:', tables.map(t => t.table_name).join(', '))
    }

    // Teste 3: Verificar autenticação
    console.log('\n✅ Teste 3: Verificando autenticação...')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.log('   Nenhum usuário autenticado (esperado)')
    } else if (user) {
      console.log('   Usuário autenticado:', user.email)
    } else {
      console.log('   Nenhum usuário autenticado (esperado)')
    }

    console.log('\n✅ Teste de conexão concluído!')
    
  } catch (err) {
    console.error('❌ Erro ao testar conexão:', err.message)
  }
}

testConnection()
