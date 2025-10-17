# 🚀 Configuração da Vercel - Dashboard Canastra

## ⚠️ PROBLEMA IDENTIFICADO

O dashboard não está carregando dados porque **as variáveis de ambiente do Supabase não estão configuradas na Vercel**.

## 🔧 SOLUÇÃO - Configurar Variáveis de Ambiente

### Passo 1: Acessar o Painel da Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login na sua conta
3. Selecione o projeto **dashboardcanastra**

### Passo 2: Configurar Environment Variables
1. No painel do projeto, clique em **"Settings"**
2. No menu lateral, clique em **"Environment Variables"**
3. Adicione as seguintes variáveis:

#### Variável 1:
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://nxusiiffpwqyahwjphnl.supabase.co`
- **Environment:** Selecione **Production**, **Preview** e **Development**

#### Variável 2:
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dXNpaWZmcHdxeWFod2pwaG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NzM0NjksImV4cCI6MjA2NjU0OTQ2OX0.AAhsUNGAQGgpgUrZy0GhMcMYKE2Eqq7TfCW4zn0yAAk`
- **Environment:** Selecione **Production**, **Preview** e **Development**

### Passo 3: Fazer Redeploy
1. Após adicionar as variáveis, vá para a aba **"Deployments"**
2. Clique nos três pontos (...) do último deployment
3. Selecione **"Redeploy"**
4. Aguarde o processo de deploy finalizar

## ✅ Verificação

Após o redeploy, o dashboard deve:
- ✅ Carregar os dados do Supabase
- ✅ Mostrar os KPIs corretos
- ✅ Exibir gráficos com dados reais
- ✅ Não mostrar mais o aviso de configuração

## 🔍 Como Verificar se Funcionou

1. Acesse o site da Vercel
2. Se ainda aparecer o aviso amarelo de configuração, as variáveis não foram aplicadas
3. Se os números aparecerem como "0" ou vazios, verifique se as variáveis estão corretas
4. Se tudo estiver funcionando, você verá dados reais nos gráficos e KPIs

## 📞 Suporte

Se ainda houver problemas após seguir estes passos:
1. Verifique se as variáveis foram salvas corretamente
2. Confirme que o redeploy foi feito
3. Aguarde alguns minutos para propagação
4. Limpe o cache do navegador (Ctrl+F5)

## 🔐 Segurança

⚠️ **IMPORTANTE:** Estas credenciais são específicas para este projeto. Não compartilhe em repositórios públicos ou com terceiros não autorizados.