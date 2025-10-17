# Dashboard Canastra Inteligência

Dashboard interativo para visualização de KPIs de vendas e leads da Canastra Inteligência.

## 🚀 Funcionalidades

- **Dashboard Principal**: KPIs de vendas e leads com gráficos interativos
- **Página Valéria AI**: Análise de leads qualificados por setor
- **Página Marcos AI**: Análise de vendas atacado e clientes por estado
- **Integração Supabase**: Dados em tempo real
- **Interface Responsiva**: Design moderno com Tailwind CSS

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Backend e banco de dados
- **Heroicons** - Ícones

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Kmzf777/dashboardcanastra.git
cd dashboardcanastra
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Edite o arquivo `.env.local` com suas credenciais do Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

5. Execute o projeto:
```bash
npm run dev
```

## 🚀 Deploy na Vercel

### Pré-requisitos
- Conta na [Vercel](https://vercel.com)
- Projeto Supabase configurado

### Passos para Deploy

1. **Conecte o repositório à Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe o repositório do GitHub

2. **Configure as variáveis de ambiente na Vercel:**
   - No painel da Vercel, vá em "Settings" > "Environment Variables"
   - Adicione as seguintes variáveis:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
     ```

3. **Deploy:**
   - A Vercel fará o deploy automaticamente
   - O projeto estará disponível em uma URL fornecida pela Vercel

### Configuração do Supabase

1. **Crie um projeto no Supabase:**
   - Acesse [supabase.com](https://supabase.com)
   - Crie um novo projeto

2. **Configure as tabelas necessárias:**
   - `leads-google`: Dados de leads do Google
   - `leads-closer-atacado`: Dados de leads atacado
   - `vendas_atacado`: Dados de vendas atacado

3. **Obtenha as credenciais:**
   - URL do projeto: Settings > API > Project URL
   - Chave anônima: Settings > API > Project API keys > anon public

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linting do código

## 📁 Estrutura do Projeto

```
src/
├── app/                 # Páginas do Next.js App Router
│   ├── page.tsx        # Dashboard principal
│   ├── marcosai/       # Página Marcos AI
│   └── valeriaai/      # Página Valéria AI
├── components/         # Componentes reutilizáveis
│   ├── Chart.tsx       # Componente de gráfico
│   ├── DashboardCard.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
└── lib/               # Utilitários e configurações
    ├── queries.ts     # Funções de consulta ao Supabase
    └── supabaseClient.ts # Cliente Supabase
```

## 🐛 Solução de Problemas

### Erro de Build na Vercel

Se o deploy falhar na Vercel, verifique:

1. **Variáveis de ambiente configuradas** na Vercel
2. **Credenciais do Supabase** estão corretas
3. **Tabelas do Supabase** existem e têm os nomes corretos

### Dashboard sem dados

Se o dashboard não mostrar dados:

1. Verifique as **variáveis de ambiente**
2. Confirme que as **tabelas do Supabase** têm dados
3. Verifique o **console do navegador** para erros

## 📄 Licença

Este projeto é privado e pertence à Canastra Inteligência.

## 🤝 Contribuição

Para contribuir com o projeto, entre em contato com a equipe de desenvolvimento.