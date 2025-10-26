const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabase = createClient(
  'https://ejyqtpgmqeddxhzednuq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ'
)

async function runMigration() {
  console.log('📋 Executando migração SQL...\n')

  const sqlPath = path.join(__dirname, '004_create_webinar_registrations.sql')
  const sql = fs.readFileSync(sqlPath, 'utf-8')

  console.log('SQL a ser executado:')
  console.log('─'.repeat(60))
  console.log(sql)
  console.log('─'.repeat(60))
  console.log()

  // Dividir SQL em comandos individuais
  const commands = sql
    .split(';')
    .map(cmd => cmd.trim())
    .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'))

  console.log(`📊 Total de comandos: ${commands.length}\n`)

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i] + ';'
    console.log(`Executando comando ${i + 1}/${commands.length}...`)
    console.log(cmd.substring(0, 80) + '...\n')

    try {
      // Usar fetch diretamente para a API REST do Supabase
      const response = await fetch(
        'https://ejyqtpgmqeddxhzednuq.supabase.co/rest/v1/rpc/exec_sql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM5ODkxOCwiZXhwIjoyMDc2OTc0OTE4fQ.7ma5_tQNjQfUqCsYM_0vLdz8U-rDPweCqLD9l9rxgYQ',
          },
          body: JSON.stringify({ sql: cmd })
        }
      )

      const result = await response.json()
      
      if (response.ok) {
        console.log('✅ Sucesso!\n')
      } else {
        console.log('❌ Erro:', result)
        console.log()
      }
    } catch (error) {
      console.log('❌ Erro na execução:', error.message)
      console.log()
    }
  }

  // Testar se a tabela foi criada
  console.log('🔍 Verificando se a tabela foi criada...')
  const { data, error } = await supabase
    .from('webinar_registrations')
    .select('count')
    .limit(1)

  if (error) {
    console.log('❌ Tabela ainda não existe:', error.message)
    console.log('\n⚠️  A migração precisa ser executada manualmente no Supabase Dashboard:')
    console.log('https://supabase.com/dashboard/project/ejyqtpgmqeddxhzednuq/editor/sql')
  } else {
    console.log('✅ Tabela criada com sucesso!')
  }
}

runMigration().catch(console.error)
