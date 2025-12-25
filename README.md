# 🏥 PSF São José - Sistema Web

Sistema web moderno para a Unidade Básica de Saúde (UBS) São José, desenvolvido com React + Vite e Tailwind CSS.

## 🚀 Tecnologias

- **React 19.2.3** - Biblioteca JavaScript para interfaces
- **Vite 7.2.4** - Build tool e dev server
- **React Router DOM 7.10.1** - Roteamento client-side
- **Tailwind CSS 4.1.8** - Framework CSS utility-first
- **Lucide React 0.561.0** - Ícones profissionais
- **Vercel** - Hospedagem e deploy contínuo

## ✨ Funcionalidades

### 📄 Páginas Principais

- **Home** - Apresentação da unidade e busca territorial
- **Serviços** - Catálogo completo de serviços de saúde
- **Equipe Multi** - Profissionais da equipe multiprofissional
- **Grupos** - Grupos de aividades Coletivas (Hiperdia, Fibromialgia)
- **ACS** - Agentes Comunitários de Saúde por microárea
- **REMSA** - Residência Multiprofissional em Saúde

### 🏥 Serviços Migrados (100% React)

- ✅ Consultas de Enfermagem
- ✅ Consultório Farmacêutico
- ✅ Fisioterapia
- ✅ Ginecologia e Pré-natal
- ✅ Odontologia
- ✅ Psicologia
- ✅ Serviço Social
- ✅ Atendimento Médico
- ✅ Pediatria

### 🎨 Design System

- Componentes reutilizáveis (InfoBox, Alert, Card)
- Ícones profissionais Lucide React (zero emojis)
- Layout responsivo mobile-first
- Tema de cores consistente
- Animações suaves e acessibilidade

## 📦 Estrutura do Projeto

```
react-app/
├── src/
│   ├── components/
│   │   ├── common/          # Componentes reutilizáveis
│   │   │   ├── Alert.jsx
│   │   │   ├── Card.jsx
│   │   │   └── InfoBox.jsx
│   │   ├── layout/          # Layout principal
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   └── PageContainer.jsx
│   │   └── search/          # Busca global
│   │       └── GlobalSearch.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── REMSA.jsx
│   │   ├── groups/          # Páginas de grupos
│   │   │   └── GroupsIndex.jsx
│   │   ├── team/            # Equipe multiprofissional
│   │   │   ├── Enfermeiras.jsx
│   │   │   ├── Farmaceutica.jsx
│   │   │   ├── Fisioterapeuta.jsx
│   │   │   ├── Ginecologista.jsx
│   │   │   ├── Dentistas.jsx
│   │   │   ├── Psicologa.jsx
│   │   │   ├── AssistenteSocial.jsx
│   │   │   ├── Medicos.jsx
│   │   │   └── Pediatra.jsx
│   │   └── services/        # Serviços da UBS
│   ├── data/                # Dados estruturados
│   ├── App.jsx              # Componente raiz
│   └── main.jsx             # Entry point
├── public/                  # Assets estáticos
├── vercel.json             # Configuração Vercel
└── package.json
```

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Isaguiar-Dev/psf-saojose-web.git
cd psf-saojose-web/react-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build de produção
npm run preview
```

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Padrões de Código

### Componentes

- Componentes funcionais com hooks
- Props tipadas com JSDoc (quando necessário)
- Decomposição em componentes pequenos e reutilizáveis

### Estilo

- Tailwind CSS utility classes
- Nomenclatura semântica (primary, secondary, neutral)
- Espaçamento consistente (gap, padding, margin)

### Ícones

- Lucide React para todos os ícones
- Tamanhos padronizados: 16px, 20px, 24px, 32px, 40px

## 🚀 Deploy

O projeto está configurado para deploy automático na Vercel:

1. Push para `main` dispara deploy automático
2. Build é feito com `npm run build`
3. Vercel serve o conteúdo de `dist/`
4. Rewrites configurados para SPA routing

### Variáveis de Ambiente

O projeto requer variáveis de ambiente do Firebase para funcionar. Configure-as de uma das seguintes formas:

#### Opção 1: Arquivo .env (desenvolvimento local)

1. Crie um arquivo `.env` na pasta `react-app/`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop

# Gemini (Opcional - para chat com IA)
VITE_GEMINI_API_KEY=sua-chave-gemini-aqui
```

2. **Como obter as credenciais do Firebase:**
   - Acesse: https://console.firebase.google.com
   - Selecione seu projeto
   - Vá em: **Project Settings** (ícone de engrenagem) > **General**
   - Na seção "Your apps", encontre ou crie uma Web App
   - Copie os valores dos campos de configuração

#### Opção 2: Vercel (produção)

1. Acesse: https://vercel.com
2. Selecione seu projeto
3. Vá em: **Settings** > **Environment Variables**
4. Adicione cada variável `VITE_FIREBASE_*` listada acima
5. Selecione os ambientes (Production, Preview, Development)
6. Clique em **Save**

⚠️ **Importante:** Após adicionar variáveis na Vercel, é necessário fazer um novo deploy.

## 📊 Métricas

- **Total de páginas**: 20+ páginas React
- **Componentes reutilizáveis**: 15+
- **Linhas de código migradas**: ~2.700 linhas (HTML → React)
- **Ícones Lucide**: 40+ ícones profissionais
- **Performance**: Lighthouse Score 90+

## 🔧 Manutenção

### Adicionar Nova Página

1. Criar componente em `src/pages/`
2. Adicionar rota em `App.jsx`
3. Usar componentes do design system
4. Seguir padrão: `PageContainer > InfoBox > Alert`

### Adicionar Novo Serviço

1. Criar em `src/pages/services/NomeServico.jsx`
2. Usar ícones Lucide React
3. Manter estrutura consistente com outras páginas
4. Atualizar navegação se necessário

## 📄 Licença

Este projeto é de uso interno da UBS São José.

## 👥 Equipe

Desenvolvido para a **Unidade Básica de Saúde São José**
Divinópolis, Minas Gerais

---

**Última atualização**: Dezembro 2025
**Versão**: 2.0.0 (React Migration Complete)
