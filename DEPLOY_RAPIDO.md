# ⚡ Deploy Rápido - Hostinger

## 🎯 Escolha sua Opção

### ✅ Opção A: Deploy Automático via GitHub (RECOMENDADO)
**Tempo: ~15 minutos | Dificuldade: Fácil**

```
1. Acesse: https://hpanel.hostinger.com
2. Menu → Node.js → Criar Aplicação
3. Conectar GitHub → Selecione: exattacontabilidadedigital/lumen
4. Configure:
   - Node.js: 18.x
   - Build: npm install && npm run build
   - Start: npm start
   - Porta: 3000
5. Adicione Variáveis de Ambiente:
   NEXT_PUBLIC_SUPABASE_URL=https://ejyqtpgmqeddxhzednuq.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
   NODE_ENV=production
6. Clique em Deploy
7. Aguarde build (5-10 min)
8. ✅ Pronto! Site no ar
```

**Vantagens:**
- ✅ Deploy automático ao fazer push no GitHub
- ✅ Gerenciamento fácil pelo painel
- ✅ SSL automático
- ✅ Rollback simples

---

### 🔧 Opção B: Deploy Manual via SSH
**Tempo: ~30 minutos | Dificuldade: Intermediária**

```bash
# 1. Conectar via SSH
ssh usuario@seudominio.com -p 65002

# 2. Clonar repositório
cd ~/public_html
git clone https://github.com/exattacontabilidadedigital/lumen.git
cd lumen

# 3. Configurar ambiente
nano .env.local
# Cole as variáveis e salve (Ctrl+O, Enter, Ctrl+X)

# 4. Instalar e buildar
npm install
npm run build

# 5. Instalar PM2
npm install -g pm2

# 6. Iniciar app
pm2 start npm --name "lumen" -- start
pm2 startup
pm2 save

# 7. ✅ Pronto!
```

---

## 🔐 Variáveis de Ambiente

**Copie e cole** (substitua `sua_anon_key`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://ejyqtpgmqeddxhzednuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXF0cGdtcWVkZHhoemVkbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTg5MTgsImV4cCI6MjA3Njk3NDkxOH0.T4XxKbR3hfYFH2Aw1o7iFwQCVOFPk6CLmN1MYcFCbJw
NODE_ENV=production
```

---

## ✅ Checklist Pré-Deploy

- [ ] Git commit e push feito
- [ ] Build testado localmente (`npm run build`)
- [ ] Variáveis de ambiente prontas
- [ ] Conta Hostinger com Node.js habilitado
- [ ] Supabase funcionando
- [ ] Domínio apontado (se aplicável)

---

## 🐛 Problemas Comuns

### Build falha
```bash
# Aumentar memória
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Porta em uso
```bash
# Usar outra porta
PORT=3001 npm start
```

### Permissões
```bash
chmod -R 755 ~/public_html/lumen
```

### App não inicia
```bash
# Ver logs
pm2 logs lumen
```

---

## 🔄 Atualizar após Deploy

### Se usou GitHub (Automático):
```bash
git add .
git commit -m "atualização"
git push
# Deploy automático! 🎉
```

### Se usou SSH (Manual):
```bash
ssh usuario@seudominio.com
cd ~/public_html/lumen
git pull
npm install
npm run build
pm2 restart lumen
```

---

## 📞 Links Úteis

- **Painel Hostinger**: https://hpanel.hostinger.com
- **GitHub Repo**: https://github.com/exattacontabilidadedigital/lumen
- **Supabase**: https://supabase.com/dashboard/project/ejyqtpgmqeddxhzednuq
- **Guia Completo**: Ver `DEPLOY_HOSTINGER.md`

---

## 💡 Dicas Finais

1. **Sempre teste localmente** antes de fazer deploy
2. **Use variáveis de ambiente** para dados sensíveis
3. **Mantenha backups** do banco de dados
4. **Configure SSL/HTTPS** (geralmente automático na Hostinger)
5. **Monitore logs** após deploy

🚀 **Boa sorte com o deploy!**
