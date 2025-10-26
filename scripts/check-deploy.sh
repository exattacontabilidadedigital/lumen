#!/bin/bash

echo "🔍 Verificando Ambiente para Deploy..."
echo ""

# Verificar Node.js
echo "📦 Verificando Node.js..."
if command -v node &> /dev/null
then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js instalado: $NODE_VERSION"
    
    # Verificar se é versão 18+
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$MAJOR_VERSION" -ge 18 ]; then
        echo "✅ Versão do Node.js é adequada (18+)"
    else
        echo "⚠️  AVISO: Recomendado Node.js 18 ou superior"
    fi
else
    echo "❌ Node.js não encontrado"
    exit 1
fi

echo ""

# Verificar npm
echo "📦 Verificando npm..."
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm -v)
    echo "✅ npm instalado: v$NPM_VERSION"
else
    echo "❌ npm não encontrado"
    exit 1
fi

echo ""

# Verificar Git
echo "📦 Verificando Git..."
if command -v git &> /dev/null
then
    GIT_VERSION=$(git --version)
    echo "✅ $GIT_VERSION"
else
    echo "❌ Git não encontrado"
fi

echo ""

# Verificar variáveis de ambiente
echo "🔐 Verificando Variáveis de Ambiente..."
if [ -f ".env.local" ]; then
    echo "✅ Arquivo .env.local encontrado"
    
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_URL configurado"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_URL não encontrado"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY configurado"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY não encontrado"
    fi
else
    echo "⚠️  Arquivo .env.local não encontrado"
    echo "💡 Crie baseado no .env.example"
fi

echo ""

# Verificar dependências
echo "📦 Verificando Dependências..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules encontrado"
else
    echo "⚠️  node_modules não encontrado"
    echo "💡 Execute: npm install"
fi

echo ""

# Verificar build anterior
echo "🏗️  Verificando Build..."
if [ -d ".next" ]; then
    echo "✅ Pasta .next encontrada (build anterior existe)"
    echo "💡 Execute 'npm run build' para novo build"
else
    echo "⚠️  Pasta .next não encontrada"
    echo "💡 Execute: npm run build"
fi

echo ""

# Verificar package.json
echo "📋 Verificando Scripts..."
if [ -f "package.json" ]; then
    echo "✅ package.json encontrado"
    
    if grep -q '"build"' package.json; then
        echo "✅ Script 'build' configurado"
    fi
    
    if grep -q '"start"' package.json; then
        echo "✅ Script 'start' configurado"
    fi
else
    echo "❌ package.json não encontrado"
    exit 1
fi

echo ""

# Verificar tamanho do projeto
echo "📊 Tamanho do Projeto..."
if command -v du &> /dev/null
then
    SIZE=$(du -sh . 2>/dev/null | cut -f1)
    echo "📦 Tamanho total: $SIZE"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 CHECKLIST PARA DEPLOY:"
echo ""
echo "Antes de fazer deploy, certifique-se de:"
echo "  [ ] Todas as variáveis de ambiente configuradas"
echo "  [ ] Código testado localmente"
echo "  [ ] Build executado com sucesso (npm run build)"
echo "  [ ] Commit e push feitos no GitHub"
echo "  [ ] Supabase acessível e configurado"
echo "  [ ] Domínio/hospedagem contratado"
echo ""
echo "🚀 Pronto para deploy!"
echo ""
