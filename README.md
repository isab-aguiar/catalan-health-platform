# ESF Catalão - Sistema Web

<div align="center">
  <img src="public/favicon.png" alt="Logo do Site da ESF Catalão" width="120" />
  
  <h3>Plataforma de Gestão Digital e Atendimento Humanizado</h3>
  
  <p>Ecossistema moderno para conectar pacientes, ACS e profissionais de saúde.<br />
  Otimizado para performance, acessibilidade e design governamental.</p>
  
  <div>
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Firebase-Backend-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </div>
  
  <p>
    <a href="#-sobre">Sobre</a> •
    <a href="#-funcionalidades">Funcionalidades</a> •
    <a href="#-tecnologias">Tecnologias</a> •
    <a href="#-instalação">Instalação</a> •
    <a href="#-configuração">Configuração</a> •
    <a href="#-deploy">Deploy</a>
  </p>
</div>

---

## 📋 Sobre o Projeto

O **ESF Catalão Web** é a evolução digital da Unidade Básica de Saúde São José. Desenvolvido para substituir processos manuais e páginas estáticas, o sistema oferece uma experiência SPA (Single Page Application) fluida, permitindo que a população acesse serviços e que a equipe administre fluxos com eficiência.

**Status:** 🟢 Em Produção (Versão 2.0.0)

---

## ✨ Funcionalidades

### 🏥 Serviços Clínicos Migrados

Digitalizamos 100% dos fluxos de atendimento para a nova arquitetura React:

| Especialidade | Status | Recurso |
|--------------|--------|---------|
| Enfermagem | ✅ | Triagem e Consultas |
| Farmácia | ✅ | Gestão de Estoque e Dispensação |
| Odontologia | ✅ | Agendamentos e Prontuário |
| Médico | ✅ | Clínico Geral e Pediatria |
| Equipe Multi | ✅ | Psicologia, Social e Fisioterapia |

### 🚀 Recursos Exclusivos

- **Busca Territorial**: Localização inteligente de microáreas para ACS
- **Grupos Operativos**: Páginas dedicadas (Hiperdia, Tabagismo, Fibromialgia)
- **Design System Governamental**: Interface sóbria, focada na usabilidade e confiança
- **Acessibilidade**: Ícones profissionais Lucide React (Zero Emojis no código)
- **Painel Administrativo**: Gestão completa de avisos, campanhas, usuários e estoque de vacinas

---

## 🛠️ Tecnologias

### Core
- **React 19** - Biblioteca JavaScript para interfaces
- **Vite 7.2** - Build tool e dev server
- **React Router DOM 7** - Roteamento client-side

### Estilização
- **Tailwind CSS 4.1** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones profissional

### Backend & Infraestrutura
- **Firebase Authentication** - Autenticação de usuários
- **Cloud Firestore** - Banco de dados NoSQL
- **Firebase Storage** - Armazenamento de arquivos
- **Vercel** - Hospedagem e CI/CD

### Ferramentas
- **ESLint** - Linter para qualidade de código
- **PostCSS** - Processamento de CSS

---

## 📦 Estrutura do Projeto

```
react-app/
├── src/
│   ├── components/
│   │   ├── admin/          # Componentes administrativos
│   │   ├── common/         # UI Kit (Alert, Card, InfoBox)
│   │   ├── layout/         # Estrutura (Header, Sidebar, Footer)
│   │   └── search/         # Motor de busca global
│   ├── pages/
│   │   ├── services/       # Páginas de Serviços (Vacina, Curativo...)
│   │   ├── team/           # Perfis da Equipe
│   │   ├── groups/         # Grupos Operativos
│   │   └── admin/          # Painel Administrativo
│   ├── hooks/              # Custom Hooks (useVacinas, useAvisos...)
│   ├── contexts/           # Context API (AuthContext)
│   ├── config/             # Configurações (Firebase)
│   ├── data/               # Mock data e constantes estruturadas
│   ├── App.jsx             # Roteamento Principal
│   └── main.jsx            # Entry Point
├── scripts/                # Scripts utilitários
├── public/                 # Assets estáticos
└── package.json           # Dependências e scripts
```

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 18 ou superior
- NPM ou Yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Isaguiar-Dev/psf-saojose-web.git
   cd psf-saojose-web/react-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz de `react-app/` com as seguintes variáveis:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
VITE_FIREBASE_APP_ID=1:123456...

# Admin Credentials (para scripts)
ADMIN_EMAIL=admin@exemplo.com
ADMIN_PASSWORD=sua_senha_segura

# IA (Opcional)
VITE_GEMINI_API_KEY=sua_chave_gemini
```

### Como Obter as Credenciais do Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá em **Project Settings** (ícone de engrenagem)
4. Na seção **Your apps**, copie as credenciais do SDK

---

## 🚢 Deploy

### Vercel (Recomendado)

O projeto está configurado para deploy automático na Vercel:

- **Trigger**: Qualquer push na branch `main` dispara um novo deploy
- **Build Command**: `npm run build`
- **Output Directory**: `react-app/dist`
- **Environment Variables**: Configure no painel da Vercel

### Deploy Manual

```bash
npm run build
```

Os arquivos estáticos serão gerados em `react-app/dist/`

---

## 📊 Métricas de Qualidade

| Métrica | Valor |
|---------|-------|
| Lighthouse Score | 🟢 90+ |
| Responsividade | Mobile, Tablet & Desktop |
| Componentização | 15+ Componentes Reutilizáveis |
| Clean Code | Padrões de Hooks e Props Tipadas |
| Acessibilidade | WCAG 2.1 Level AA |

---

## 🔧 Guia de Manutenção

### Adicionar Nova Página

1. Crie o componente em `src/pages/`
2. Adicione a rota no arquivo `App.jsx`
3. Utilize o wrapper padrão: `PageContainer > InfoBox > Conteúdo`

### Adicionar Novo Serviço

1. Crie o arquivo em `src/pages/services/NomeServico.jsx`
2. Importe ícones do Lucide React
3. Atualize o catálogo em `src/data/services.js`

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Executar linter
```

---

## 📄 Licença

Este projeto é de uso exclusivo da **ESF Catalão**.

---

## 👥 Créditos

**Desenvolvido por:** Isabela Aguiar   
**Localização:** Divinópolis, Minas Gerais

---

<div align="center">
  <sub>Copyright © 2025 - ESF Catalão. Todos os direitos reservados.</sub>
</div>
