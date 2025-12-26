# 🏥 ESF Catalão - Sistema Web

<div align="center">

![Status](https://img.shields.io/badge/status-em%20produ%C3%A7%C3%A3o-success?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-1351B4?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=for-the-badge&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css)

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&pause=1000&color=1351B4&center=true&vCenter=true&width=800&lines=Plataforma+de+Gest%C3%A3o+Digital+de+Sa%C3%BAde;ESF+Catal%C3%A3o+%7C+Divin%C3%B3polis%2C+MG;Conectando+Pacientes%2C+ACS+e+Profissionais" alt="Typing SVG" />

**Ecossistema moderno para Unidade Básica de Saúde**

[🚀 Demo ao Vivo](#) • [📖 Documentação](#-instalação) • [🐛 Reportar Bug](https://github.com/seu-usuario/psf-saojose-web/issues)

<!-- Placeholder para GIF demonstrativo -->
<!-- <img src="screenshots/demo.gif" width="800px" alt="Demo do Sistema"/> -->
<!-- Veja ASSETS-GUIDE.md para instruções de como criar os GIFs -->

</div>

---

## 📑 Índice

- [✨ Sobre o Projeto](#-sobre-o-projeto)
- [🎯 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📋 Pré-requisitos](#-pré-requisitos)
- [🚀 Instalação](#-instalação)
- [⚙️ Configuração](#️-configuração)
- [💻 Como Usar](#-como-usar)
- [📸 Screenshots](#-screenshots)
- [🏗️ Arquitetura](#️-arquitetura)
- [🔒 Segurança](#-segurança)
- [🚢 Deploy](#-deploy)
- [🤝 Contribuindo](#-contribuindo)
- [📝 Licença](#-licença)

---

## ✨ Sobre o Projeto

> 🎯 Plataforma digital completa para gestão e atendimento da Estratégia de Saúde da Família Catalão, desenvolvida com foco em usabilidade, performance e conformidade com padrões governamentais.

O **ESF Catalão Web** é a evolução digital da Unidade Básica de Saúde São José em Divinópolis, MG. Desenvolvido para substituir processos manuais e páginas estáticas, o sistema oferece uma experiência SPA (Single Page Application) fluida e moderna.

### 🌟 Diferenciais

```diff
+ Interface intuitiva seguindo padrões Gov.br
+ Busca inteligente de ACS por endereço (713 microáreas mapeadas)
+ Sistema completo de gerenciamento de avisos e campanhas
+ Chatbot com IA Gemini para criação assistida de conteúdo
+ 10 serviços de saúde + 9 profissionais + 3 grupos operativos
+ Sistema robusto de permissões (Admin, Profissional, Diretoria)
+ Gestão de estoque de vacinas com calendário nacional
+ Upload de imagens e PDFs com Firebase Storage
+ Responsivo e acessível (WCAG 2.1 Level AA)
+ Zero emojis no código (Lucide React icons)
```

### 🎯 Público-Alvo

- **Cidadãos**: Acesso a informações sobre serviços, equipes, horários e campanhas
- **Agentes Comunitários**: Busca territorial facilitada
- **Profissionais de Saúde**: Criação de avisos e campanhas com assistência de IA
- **Administradores**: Gestão centralizada de conteúdo, usuários e estoque

---

## 🎯 Funcionalidades

<table>
<tr>
<td width="50%">

### 🏥 Área Pública

- ✅ **Homepage** com busca, galeria e avisos
- ✅ **10 Serviços** mapeados em detalhes
- ✅ **9 Páginas de Equipe** profissional
- ✅ **3 Grupos Operativos** (Hiperdia, Tabagismo, Dores Crônicas)
- ✅ **Busca de ACS** por rua/endereço
- ✅ **Calendário de Vacinação** nacional
- ✅ **Campanhas Ativas** em carrossel
- ✅ **Sistema de Avisos** por página

<!-- <img src="screenshots/publico.gif" width="100%"/> -->

</td>
<td width="50%">

### 🔐 Painel Administrativo

- ✅ **Gerenciar Avisos** (criar, editar, ativar/desativar)
- ✅ **Gerenciar Campanhas** (upload de imagens/PDFs)
- ✅ **Gerenciar Usuários** (apenas admin)
- ✅ **Estoque de Vacinas** com estatísticas
- ✅ **Sistema de Permissões** (3 roles)
- ✅ **Dashboard** com métricas
- ✅ **Filtros e Busca** avançados

<!-- <img src="screenshots/admin.gif" width="100%"/> -->

</td>
</tr>

<tr>
<td width="50%">

### 🤖 Chatbot com IA

- ✅ **Google Gemini 2.5 Pro** integrado
- ✅ **Criação de Avisos** via conversação
- ✅ **Análise de Imagens** (Vision API)
- ✅ **Reformulação de Textos** informal → formal
- ✅ **Refinamento de Campanhas** com NLP
- ✅ **Histórico de Interações**

<!-- <img src="screenshots/chatbot.gif" width="100%"/> -->

</td>
<td width="50%">

### 📍 Busca de ACS

- ✅ **713 Microáreas** mapeadas
- ✅ **115 Profissionais** cadastrados
- ✅ **Autocomplete** com sugestões
- ✅ **Modal Informativo** com detalhes
- ✅ **Dados da Equipe** responsável
- ✅ **Busca Fuzzy** (Fuse.js)

<!-- <img src="screenshots/busca-acs.gif" width="100%"/> -->

</td>
</tr>
</table>

### 📊 Funcionalidades Detalhadas

#### Sistema de Avisos
- Criação manual via painel admin
- Categorias: vacina, material, campanha
- Controle de visibilidade por página (home, vacinas, serviços, educação)
- Ativar/desativar dinamicamente
- Exibição condicional na homepage

#### Sistema de Campanhas
- Upload de múltiplas imagens e PDFs (máx 10MB)
- Campos completos: título, subtítulo, descrição, categoria, datas, horário, local, público-alvo
- Flags: urgente, destaque, exibirNaHomepage
- Permissões granulares (admin vê tudo, profissional vê apenas suas campanhas)
- Carrossel na homepage + páginas de detalhes

#### Gestão de Vacinas
- Estoque controlado via Firestore
- Calendário Nacional de Vacinação 2025
- Estatísticas: total, com estoque, sem estoque, doses totais
- Scripts de upload em massa

---

## 🛠️ Tecnologias

### Frontend

<div>
<img src="https://img.shields.io/badge/React-19.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-7.10.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
<img src="https://img.shields.io/badge/Lucide_React-0.561.0-F56565?style=for-the-badge" />
</div>

### Backend & Infraestrutura

<div>
<img src="https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Firestore-NoSQL-FF6F00?style=for-the-badge&logo=firebase&logoColor=white" />
<img src="https://img.shields.io/badge/Firebase_Auth-Email/Password-FF9800?style=for-the-badge&logo=firebase&logoColor=white" />
<img src="https://img.shields.io/badge/Firebase_Storage-Cloud-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

### IA & Bibliotecas

<div>
<img src="https://img.shields.io/badge/Google_Gemini-2.5_Pro-4285F4?style=for-the-badge&logo=google&logoColor=white" />
<img src="https://img.shields.io/badge/Fuse.js-7.1.0-00C4CC?style=for-the-badge" />
<img src="https://img.shields.io/badge/html2pdf.js-0.12.1-E34F26?style=for-the-badge" />
</div>

### Ferramentas de Desenvolvimento

<div>
<img src="https://img.shields.io/badge/ESLint-9.39.1-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/Prettier-3.7.4-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" />
<img src="https://img.shields.io/badge/PostCSS-8.5.6-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white" />
</div>

### Design System

- **Gov.br Design System** - Cores e tipografia oficial
- **Palette**: Primary Blue (#1351B4), Secondary Orange (#F08619), Accent Teal (#00AF9B)
- **Typography**: Rawline, Source Sans Pro
- **Acessibilidade**: WCAG 2.1 Level AA, VLibras

---

## 📋 Pré-requisitos

- **Node.js** (versão 18+ recomendada)
- **npm** ou **yarn**
- **Git**
- **Conta Firebase** (para configurar o projeto)
- **Conta Google Cloud** (para Gemini API - opcional)
- **Conta Vercel** (para deploy - opcional)

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Isaguiar-Dev/psf-saojose-web.git
cd psf-saojose-web
```

### 2️⃣ Navegue para a pasta do app React

```bash
cd react-app
```

### 3️⃣ Instale as dependências

```bash
npm install
```

> **Nota**: O projeto possui 120+ arquivos fonte. A instalação pode levar alguns minutos.

---

## ⚙️ Configuração

### 4️⃣ Firebase Setup

#### A. Crie um projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Siga as etapas de criação

#### B. Configure Authentication

1. No Firebase Console, vá em **Authentication** → **Sign-in method**
2. Ative **Email/Password**

#### C. Configure Firestore Database

1. Vá em **Firestore Database** → **Criar banco de dados**
2. Escolha modo **Produção**
3. Escolha a localização: `southamerica-east1` (São Paulo - recomendado para Brasil)

#### D. Configure Storage

1. Vá em **Storage** → **Começar**
2. Use as regras de segurança do projeto (veja [firestore.rules](firestore.rules))

### 5️⃣ Variáveis de Ambiente

Crie um arquivo `.env` na pasta `react-app/`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Gemini AI (opcional - para chatbot)
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

> ⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env` no Git!

**Como obter as credenciais:**
1. Firebase Console → Configurações do projeto (engrenagem)
2. Role até "Seus aplicativos" → SDK do Firebase
3. Copie o objeto `firebaseConfig`

**Gemini API (opcional):**
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crie uma chave de API gratuita

### 6️⃣ Deploy das Firestore Rules

```bash
# Na raiz do projeto
npm install -g firebase-tools
firebase login
firebase use --add  # Selecione seu projeto
firebase deploy --only firestore:rules
```

---

## 💻 Como Usar

### Iniciando o servidor de desenvolvimento

```bash
# Certifique-se de estar em react-app/
npm run dev
```

O aplicativo estará disponível em: **http://localhost:5173**

### Criando o primeiro usuário administrador

```bash
# Na pasta react-app/
node scripts/criar-admin-firestore.js
```

Siga as instruções no terminal para definir email e senha.

### Populando o estoque de vacinas

```bash
# Upload das vacinas oficiais do SUS
npm run upload:vacinas
```

---

## 💡 Usando o Sistema

<details>
<summary>📝 <b>Gerenciando Avisos</b></summary>

#### 1. Acesse o Painel Admin

Faça login em `http://localhost:5173/admin/login`

#### 2. Vá em "Gerenciar Avisos"

#### 3. Clique em "Novo Aviso"

Preencha:
- **Título**: Ex: "Vacina contra Gripe disponível"
- **Descrição**: Informações detalhadas
- **Categoria**: vacina / material / campanha
- **Página Destino**: home / vacinas / servicos / educacao
- **Exibir na Homepage**: ☑️ (opcional)

#### 4. Salve o Aviso

O aviso aparecerá automaticamente nas páginas configuradas.

</details>

<details>
<summary>📸 <b>Criando Campanhas</b></summary>

#### 1. Acesse "Gerenciar Campanhas"

#### 2. Clique em "Nova Campanha"

#### 3. Preencha os Dados

- **Título**: Nome da campanha
- **Subtítulo**: Descrição curta
- **Descrição**: Informações completas
- **Categoria**: Tipo de campanha
- **Data início/término**: Período de vigência
- **Horário**: Quando acontece
- **Local**: Onde será realizada
- **Público-alvo**: Quem deve participar
- **Contato**: Telefone para mais informações

#### 4. Upload de Mídia

- Arraste imagens (JPG, PNG, WebP) ou PDFs
- Tamanho máximo: 10MB por arquivo
- Múltiplos arquivos suportados

#### 5. Configure Visibilidade

- ☑️ **Urgente**: Marca com badge vermelho
- ☑️ **Destaque**: Posição prioritária
- ☑️ **Exibir na Homepage**: Aparece no carrossel

#### 6. Salve e Publique

A campanha ficará visível imediatamente se marcada como "ativa".

</details>

<details>
<summary>🤖 <b>Usando o Chatbot IA</b></summary>

#### 1. Acesse o Chatbot

No painel admin, clique no ícone de chat (se disponível na interface).

#### 2. Converse Naturalmente

Exemplo:
```
Preciso criar um aviso sobre falta de seringas.
Será para a página de vacinas.
```

#### 3. A IA Responde

O Gemini criará um texto formal e técnico adequado.

#### 4. Refine se Necessário

```
Deixe mais formal
```

ou

```
Adicione informações sobre prazo de reposição
```

#### 5. Use na Campanha

Copie o texto gerado e cole no formulário de avisos.

**Funcionalidades Avançadas:**
- Upload de imagens para análise
- Reformulação de textos informais
- Geração de campanhas completas a partir de fotos

</details>

<details>
<summary>👥 <b>Gerenciando Usuários (Admin)</b></summary>

### Sistema de Permissões

| Role | Permissões |
|------|-----------|
| 👑 **admin** | Acesso total (CRUD usuários, campanhas, avisos, vacinas) |
| ✏️ **profissional** | Criar e editar campanhas e avisos (vê apenas próprios) |
| 👁️ **diretoria** | Visualizar dashboard (somente leitura) |

### Criar Novo Usuário

1. Acesse **Admin** → **Gerenciar Usuários**
2. Clique em **"Novo Usuário"**
3. Preencha:
   - Email
   - Nome completo
   - Senha (mínimo 6 caracteres)
   - Role
4. Clique em **"Criar Usuário"**

### Ativar/Desativar

Use o toggle ao lado do nome do usuário na lista.

</details>

---

## 📸 Screenshots

<details open>
<summary><b>🖼️ Galeria de Imagens</b></summary>

> **📝 Nota**: Os screenshots serão adicionados em breve. Veja [ASSETS-GUIDE.md](ASSETS-GUIDE.md) para instruções.

### Homepage Pública
<!-- <img src="screenshots/homepage.png" width="100%"/> -->
_Busca de ACS, galeria de fotos, avisos e campanhas_

### Busca de ACS
<!-- <img src="screenshots/busca-acs.png" width="100%"/> -->
_Sistema de busca territorial por endereço_

### Dashboard Administrativo
<!-- <img src="screenshots/dashboard.png" width="100%"/> -->
_Painel de controle com estatísticas_

### Gerenciar Avisos
<!-- <img src="screenshots/avisos.png" width="100%"/> -->
_Lista e criação de avisos_

### Gerenciar Campanhas
<!-- <img src="screenshots/campanhas.png" width="100%"/> -->
_Upload de imagens e criação de campanhas_

### Chatbot IA
<!-- <img src="screenshots/chatbot.png" width="100%"/> -->
_Conversação com Gemini para criação de conteúdo_

### Mobile Responsivo

<p align="center">
<!-- <img src="screenshots/mobile-home.png" width="30%"/> -->
<!-- <img src="screenshots/mobile-servicos.png" width="30%"/> -->
<!-- <img src="screenshots/mobile-acs.png" width="30%"/> -->
</p>

</details>

---

## 🏗️ Arquitetura

### Estrutura de Diretórios

```
psf-saojose-web/
├── 📂 react-app/                    # Aplicação React
│   ├── 📂 src/
│   │   ├── 📂 components/           # Componentes (30+)
│   │   │   ├── 📂 admin/            # Admin (Header, Sidebar, Tables)
│   │   │   ├── 📂 avisos/           # Avisos (Card, List, Wrapper)
│   │   │   ├── 📂 campaign/         # Campanhas (Card, Carousel, Gallery)
│   │   │   ├── 📂 chatbot/          # Chatbot IA (ChatBot, Message, Input)
│   │   │   ├── 📂 common/           # Comuns (Modal, Button, Alert, Spinner)
│   │   │   ├── 📂 layout/           # Layout (Header, Footer, Sidebar)
│   │   │   ├── 📂 search/           # Busca (GlobalSearch, ACSModal)
│   │   │   └── 📂 vacinas/          # Vacinas (Calendário, Lista)
│   │   │
│   │   ├── 📂 pages/                # Páginas
│   │   │   ├── 📂 admin/            # 6 páginas admin
│   │   │   ├── 📂 services/         # 10 serviços
│   │   │   ├── 📂 team/             # 9 profissionais
│   │   │   ├── 📂 groups/           # 3 grupos
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 ACS.jsx
│   │   │   ├── 📄 REMSA.jsx
│   │   │   └── 📄 Educacao.jsx
│   │   │
│   │   ├── 📂 contexts/             # Context API
│   │   │   └── 📄 AuthContext.jsx
│   │   │
│   │   ├── 📂 hooks/                # Custom Hooks (15+)
│   │   │   ├── 📄 useAvisos.js
│   │   │   ├── 📄 useCampanhas.js
│   │   │   ├── 📄 usePermissions.js
│   │   │   └── ...
│   │   │
│   │   ├── 📂 services/             # Firebase services
│   │   │   ├── 📄 avisosService.js
│   │   │   ├── 📄 campanhasService.js
│   │   │   ├── 📄 usersService.js
│   │   │   ├── 📄 geminiService.js   # IA Gemini
│   │   │   └── 📄 uploadService.js
│   │   │
│   │   ├── 📂 config/               # Configurações
│   │   │   └── 📄 firebase.js
│   │   │
│   │   ├── 📂 data/                 # Dados estáticos
│   │   │   ├── 📄 acs-data.js       # 713 microáreas
│   │   │   ├── 📄 profissionais.js  # 115 profissionais
│   │   │   ├── 📄 vacinas-sus.js    # Vacinas SUS 2025
│   │   │   └── ...
│   │   │
│   │   ├── 📄 App.jsx               # Rotas
│   │   └── 📄 main.jsx
│   │
│   ├── 📂 scripts/                  # Scripts utilitários (10+)
│   │   ├── 📄 criar-admin-firestore.js
│   │   ├── 📄 upload-vacinas-firestore.js
│   │   └── ...
│   │
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   └── 📄 tailwind.config.js
│
├── 📄 firebase.json
├── 📄 firestore.rules
├── 📄 vercel.json
└── 📄 README.md
```

### Fluxo de Dados

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│   React SPA     │  ← Vite dev/build
│   (Client)      │  ← Tailwind CSS
└────────┬────────┘
         │
         ▼
┌────────────────────────┐
│   Firebase SDK         │
│   (Client-side)        │
├────────────────────────┤
│ • Authentication       │
│ • Firestore DB         │
│ • Storage              │
└────────┬───────────────┘
         │
         ▼
┌──────────────────────────┐
│   Google Cloud           │
│   • Firebase             │
│   • Gemini AI            │
└──────────────────────────┘
```

**Arquitetura**: BaaS (Backend as a Service) - Sem servidor Node/Express tradicional.

---

## 🔒 Segurança

### Firestore Security Rules

O arquivo [firestore.rules](firestore.rules) implementa:

#### Leitura Pública
- ✅ Campanhas ativas
- ✅ Avisos ativos
- ✅ Vacinas (filtro no cliente)

#### Permissões de Escrita

**Staff (admin + profissional)**:
- ✅ Criar e atualizar avisos e campanhas

**Apenas Admin**:
- ✅ Deletar avisos e campanhas
- ✅ CRUD de usuários
- ✅ Gestão de vacinas

**Proteções**:
- ❌ Usuários não podem alterar seu próprio `role`
- ❌ Usuários não podem se auto-ativar
- ❌ Outras coleções negadas por padrão

### Autenticação

- **Método**: Firebase Authentication (Email/Password)
- **Sessão**: Persistente (localStorage)
- **Proteção de Rotas**: `<ProtectedRoute>` component
- **Roles**: admin, profissional, diretoria

### Boas Práticas

- ✅ Variáveis de ambiente
- ✅ HTTPS obrigatório (Vercel)
- ✅ Security headers (X-Frame-Options, X-XSS-Protection)
- ✅ Validação de inputs
- ✅ Upload limitado (10MB)

---

## 🚢 Deploy

### Deploy Automático na Vercel

#### 1️⃣ Conecte seu repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe o repositório GitHub

#### 2️⃣ Configure Variáveis de Ambiente

No painel Vercel → Settings → Environment Variables:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_GEMINI_API_KEY (opcional)
```

#### 3️⃣ Deploy!

A cada push na branch `main`, um novo deploy será criado automaticamente.

**Configurações** ([vercel.json](vercel.json)):
- Framework: Vite
- Build Command: `cd react-app && npm ci && npm run build`
- Output Directory: `react-app/dist`

### Build Local

```bash
cd react-app
npm run build
```

Build gerado em `react-app/dist/`.

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

### Como contribuir

1. **Fork** o projeto
2. Crie uma **branch**: `git checkout -b feature/NovaFuncionalidade`
3. **Commit**: `git commit -m 'feat: Adiciona nova funcionalidade'`
4. **Push**: `git push origin feature/NovaFuncionalidade`
5. Abra um **Pull Request**

### Padrão de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Configurações

---

## 📝 Licença

Este projeto é de uso exclusivo da **ESF Catalão - Divinópolis, MG**.

---

## 👥 Autores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Isaguiar-Dev">
        <img src="https://github.com/Isaguiar-Dev.png" width="100px;" alt=""/><br>
        <sub><b>Isabela Aguiar</b></sub>
      </a><br>
      <a href="#" title="Code">💻</a>
      <a href="#" title="Design">🎨</a>
      <a href="#" title="Documentation">📖</a>
    </td>
  </tr>
</table>

---

## 📞 Contato

- 📧 **Email**: contato@esfcatalao.saude.mg.gov.br
- 📱 **Telefone**: (37) 3229-0000
- 📍 **Endereço**: Rua Catalão, Bairro São José - Divinópolis/MG

---

## 🗺️ Roadmap

- [x] Sistema de autenticação
- [x] Homepage pública completa
- [x] 10 serviços de saúde
- [x] 9 páginas de equipes
- [x] 3 grupos operativos
- [x] Busca de ACS (713 microáreas)
- [x] CRUD de avisos
- [x] CRUD de campanhas
- [x] Upload de imagens e PDFs
- [x] Gestão de usuários
- [x] Sistema de permissões (RBAC)
- [x] Chatbot com IA Gemini
- [x] Gestão de estoque de vacinas
- [x] Calendário Nacional de Vacinação
- [x] Responsividade mobile
- [x] Deploy na Vercel
- [ ] Dashboard analítico avançado
- [ ] Sistema de agendamento online
- [ ] Notificações push
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados

---

## 📚 Recursos Adicionais

- [React Documentation](https://react.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Gov.br Design System](https://www.gov.br/ds/)
- [Google Gemini API](https://ai.google.dev/docs)

---

<div align="center">

### ⭐ Se este projeto foi útil, considere dar uma estrela!

**Desenvolvido com dedicação para a saúde pública brasileira** 🇧🇷

---

![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)
![Powered by Firebase](https://img.shields.io/badge/Powered%20by-Firebase-FFCA28?style=for-the-badge&logo=firebase)
![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css)

**© 2024-2025 ESF Catalão** | Divinópolis, Minas Gerais

</div>
