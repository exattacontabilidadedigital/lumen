# 🚀 Deploy na Hostinger - Guia Completo

## 📋 Pré-requisitos

1. ✅ Conta na Hostinger com plano que suporte Node.js
2. ✅ Acesso SSH habilitado
3. ✅ Node.js versão 18+ no servidor
4. ✅ Supabase configurado e funcionando

## 🎯 Opções de Deploy

### Opção 1: Deploy Automático com GitHub (Recomendado)
A Hostinger oferece deploy automático via GitHub para Next.js

### Opção 2: Deploy Manual via SSH
Upload e configuração manual dos arquivos

### Opção 3: Deploy via Git no Servidor
Clonar repositório diretamente no servidor

---

## 🔧 Opção 1: Deploy Automático (GitHub + Hostinger)

### Passo 1: Preparar o Projeto

#### 1.1. Criar arquivo de configuração do build
```bash
# Já está configurado no package.json, mas verifique:
```

Verifique se o `package.json` tem:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint"
  }
}
```

#### 1.2. Criar arquivo `.env.example` para documentação
```bash
# Criar arquivo com variáveis de ambiente necessárias
```

### Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` (se ainda não existir):

```env
NEXT_PUBLIC_SUPABASE_URL=https://ejyqtpgmqeddxhzednuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

### Passo 3: Acessar Painel Hostinger

1. **Login na Hostinger**
   - Acesse: https://hpanel.hostinger.com
   - Faça login com suas credenciais

2. **Ir para Hospedagem**
   - Menu lateral → **Hospedagem**
   - Selecione o domínio/plano onde quer fazer deploy

3. **Configurar Node.js App**
   - Procure por **"Node.js"** no painel
   - Ou vá em **"Avançado"** → **"Node.js"**

### Passo 4: Criar Aplicação Node.js

1. **Clique em "Criar Aplicação"**

2. **Preencha os dados:**
   - **Nome da Aplicação**: `lumen-consultoria`
   - **Versão do Node.js**: `18.x` ou superior
   - **Modo da Aplicação**: `Produção`
   - **Porta**: `3000` (ou a que a Hostinger indicar)
   - **Diretório da Aplicação**: `public_html/lumen` (ou outro de sua escolha)

3. **Conectar com GitHub:**
   - Clique em **"Conectar com GitHub"**
   - Autorize a Hostinger a acessar seu repositório
   - Selecione: `exattacontabilidadedigital/lumen`
   - Branch: `main`

4. **Configurar Build:**
   - **Comando de Build**: `npm install && npm run build`
   - **Comando de Start**: `npm start`
   - **Diretório de Build**: `.next`

### Passo 5: Configurar Variáveis de Ambiente

No painel da aplicação Node.js:

1. **Clique em "Variáveis de Ambiente"**

2. **Adicione as seguintes variáveis:**

```
NEXT_PUBLIC_SUPABASE_URL=https://ejyqtpgmqeddxhzednuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTg5MTgsImV4cCI6MjA3Njk3NDkxOH0.T4XxKbR3hfYFH2Aw1o7iFwQCVOFPk6CLmN1MYcFCbJw
NODE_ENV=production
```

⚠️ **IMPORTANTE**: Nunca commite a `service_role` key no GitHub!

### Passo 6: Deploy

1. **Salvar Configurações**
2. **Clique em "Deploy"**
3. **Aguarde o processo de build** (5-10 minutos)
4. **Verifique os logs** para possíveis erros

### Passo 7: Configurar Domínio

1. **Apontar Domínio:**
   - Vá em **"Domínios"** no painel
   - Selecione seu domínio
   - Aponte para o diretório da aplicação

2. **SSL/HTTPS:**
   - A Hostinger geralmente configura SSL automaticamente
   - Se não, ative em **"Avançado"** → **"SSL"**

---

## 🔧 Opção 2: Deploy Manual via SSH

### Passo 1: Habilitar SSH

1. No painel Hostinger:
   - **"Avançado"** → **"SSH Access"**
   - Habilite o acesso SSH
   - Anote: **hostname**, **porta**, **usuário**, **senha**

### Passo 2: Conectar via SSH

```bash
# Exemplo (substitua pelos seus dados):
ssh u123456789@yourdomain.com -p 65002
```

### Passo 3: Instalar Node.js (se necessário)

```bash
# Verificar se Node.js está instalado
node -v

# Se não estiver, instale via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

### Passo 4: Clonar Repositório

```bash
# Navegar para o diretório público
cd ~/public_html

# Clonar o repositório
git clone https://github.com/exattacontabilidadedigital/lumen.git
cd lumen

# Ou se preferir usar um nome diferente:
git clone https://github.com/exattacontabilidadedigital/lumen.git lumen-consultoria
cd lumen-consultoria
```

### Passo 5: Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env.local
nano .env.local
```

Cole o conteúdo:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ejyqtpgmqeddxhzednuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTg5MTgsImV4cCI6MjA3Njk3NDkxOH0.T4XxKbR3hfYFH2Aw1o7iFwQCVOFPk6CLmN1MYcFCbJw
NODE_ENV=production
```

Salve com `Ctrl+O`, `Enter`, `Ctrl+X`

### Passo 6: Instalar Dependências e Build

```bash
# Instalar dependências
npm install

# Fazer build do projeto
npm run build
```

### Passo 7: Iniciar Aplicação

#### Opção A: Usar PM2 (Recomendado)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicação com PM2
pm2 start npm --name "lumen" -- start

# Configurar PM2 para iniciar no boot
pm2 startup
pm2 save

# Ver logs
pm2 logs lumen

# Ver status
pm2 status
```

#### Opção B: Usar screen (alternativa)

```bash
# Instalar screen
apt-get install screen  # ou yum install screen

# Criar sessão
screen -S lumen

# Iniciar aplicação
npm start

# Desanexar da sessão: Ctrl+A, D
# Reattach: screen -r lumen
```

### Passo 8: Configurar Proxy Reverso

Crie um arquivo `.htaccess` no diretório público:

```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## 🔧 Opção 3: Build Estático (Alternativa)

Se sua aplicação Next.js pode ser exportada estaticamente:

### Passo 1: Configurar Export

Edite `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

### Passo 2: Build e Export

```bash
npm run build
```

Isso criará a pasta `out/` com arquivos estáticos.

### Passo 3: Upload para Hostinger

1. Use FileZilla ou File Manager da Hostinger
2. Faça upload do conteúdo da pasta `out/` para `public_html/`

⚠️ **LIMITAÇÃO**: Export estático não funciona com:
- API Routes (`/api/*`)
- Server-side rendering dinâmico
- Middleware

---

## 📝 Checklist Pós-Deploy

- [ ] Site acessível pelo domínio
- [ ] HTTPS funcionando (cadeado verde)
- [ ] Variáveis de ambiente configuradas
- [ ] Supabase conectando corretamente
- [ ] Formulário de inscrição funcionando
- [ ] Painel admin acessível
- [ ] Login/autenticação funcionando
- [ ] Imagens carregando
- [ ] CSS/estilos aplicados

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Limpar cache e reinstalar
rm -rf node_modules
rm package-lock.json
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou use outra porta no .env:
PORT=3001
```

### Build demora muito
```bash
# Aumentar memória do Node.js
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Erro de permissão
```bash
# Ajustar permissões
chmod -R 755 ~/public_html/lumen
chown -R seu-usuario:seu-grupo ~/public_html/lumen
```

### Logs não aparecem
```bash
# Ver logs do PM2
pm2 logs lumen --lines 100

# Ou logs do Next.js
tail -f .next/trace
```

## 🔄 Atualizações Futuras

### Deploy Automático (GitHub)
Apenas faça push para `main`:
```bash
git add .
git commit -m "sua mensagem"
git push origin main
```

A Hostinger fará deploy automaticamente.

### Deploy Manual
```bash
# SSH no servidor
cd ~/public_html/lumen

# Puxar alterações
git pull origin main

# Instalar novas dependências (se houver)
npm install

# Rebuild
npm run build

# Reiniciar aplicação
pm2 restart lumen
```

## 📞 Suporte

- **Hostinger**: https://www.hostinger.com.br/tutoriais/
- **Next.js**: https://nextjs.org/docs/deployment
- **Supabase**: https://supabase.com/docs

## 🎯 Recomendação Final

Para este projeto Next.js com:
- ✅ Server-side rendering
- ✅ API routes
- ✅ Middleware
- ✅ Supabase

**Recomendo: Opção 1 (Deploy Automático via GitHub)**

É mais simples, automatizado e confiável!
