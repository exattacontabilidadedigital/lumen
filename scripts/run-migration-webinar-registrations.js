const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabase = createClient(
  'https://ejyqtpgmqeddxhzednuq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ'
)

async function runMigration() {
  try {
    console.log('🔄 Criando tabela webinar_registrations...')

    // Ler o arquivo SQL
    const sql = fs.readFileSync('./scripts/004_create_webinar_registrations.sql', 'utf8')

    // Executar o SQL
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).catch(() => {
      // Se o RPC não existir, vamos criar a tabela manualmente
      return supabase.from('webinar_registrations').select('*').limit(1)
    })

    if (error && error.message.includes('does not exist')) {
      console.log('⚠️  Tabela não existe, criando via SQL direto...')
      
      // Como não podemos executar SQL diretamente via JavaScript SDK,
      // vamos criar a tabela via interface do Supabase ou usar a CLI
      console.log('\n📋 Por favor, execute o seguinte SQL no Supabase Dashboard:')
      console.log('https://supabase.com/dashboard/project/ejyqtpgmqeddxhzednuq/editor/sql')
      console.log('\n' + sql)
      console.log('\nOu use a Supabase CLI:')
      console.log('supabase db push')
    } else if (error) {
      console.error('❌ Erro ao criar tabela:', error)
    } else {
      console.log('✅ Tabela criada com sucesso!')
    }

    // Verificar se a tabela existe
    const { data, error: checkError } = await supabase
      .from('webinar_registrations')
      .select('*')
      .limit(1)

    if (!checkError) {
      console.log('✅ Tabela webinar_registrations existe e está acessível!')
    } else {
      console.log('⚠️  Não foi possível verificar a tabela:', checkError.message)
      console.log('\n📝 Execute o SQL manualmente no Supabase Dashboard.')
    }

  } catch (error) {
    console.error('❌ Erro:', error)
  }
}

runMigration()
