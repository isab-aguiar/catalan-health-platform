# 👥 Configurar Todos os Usuários no Firestore

## 📋 Lista de Usuários do Sistema

### 1. 👑 **ADMINISTRADOR** (Acesso Total)
```
UID: tXDNFTFJVZcijOYJNtKZtuFlFhv2
Email: root@esfcatalao.com
Nome: Administrador
Role: admin
```

**Permissões:**
- ✅ Ver tudo
- ✅ Criar avisos
- ✅ Editar avisos
- ✅ **Excluir avisos**
- ✅ **Gerenciar usuários**
- ✅ Usar Assistente IA

---

### 2. 👁️ **DIRETÓRIA** (Visualização Apenas)
```
UID: AuURYgW9NWM5zovstvxOpGppAYF3
Email: gestao.estrategica@esfcatalao.com
Nome: Gestão Estratégica
Role: diretoria
```

**Permissões:**
- ✅ Ver tudo (painel, avisos, estatísticas)
- ❌ NÃO pode criar avisos
- ❌ NÃO pode editar avisos
- ❌ NÃO pode excluir avisos
- ❌ NÃO pode gerenciar usuários
- ❌ NÃO pode usar Assistente IA

**Função:** Apenas acompanhamento e visualização dos avisos.

---

## 🎯 COMO CONFIGURAR NO FIRESTORE

### PASSO 1: Acessar Firebase Console
```
🔗 https://console.firebase.google.com/
```
1. Selecione seu projeto
2. Vá em **"Firestore Database"**
3. Clique na coleção **`users`**

---

### PASSO 2: Criar Documento do ADMINISTRADOR

**ID do documento:** `tXDNFTFJVZcijOYJNtKZtuFlFhv2`

| Campo | Tipo | Valor |
|-------|------|-------|
| `uid` | string | `tXDNFTFJVZcijOYJNtKZtuFlFhv2` |
| `email` | string | `root@esfcatalao.com` |
| `displayName` | string | `Administrador` |
| **`role`** | **string** | **`admin`** |
| **`active`** | **boolean** | **`true`** |
| `createdAt` | timestamp | (clique no relógio → "now") |
| `updatedAt` | timestamp | (clique no relógio → "now") |

---

### PASSO 3: Criar Documento da DIRETÓRIA

**ID do documento:** `AuURYgW9NWM5zovstvxOpGppAYF3`

| Campo | Tipo | Valor |
|-------|------|-------|
| `uid` | string | `AuURYgW9NWM5zovstvxOpGppAYF3` |
| `email` | string | `gestao.estrategica@esfcatalao.com` |
| `displayName` | string | `Gestão Estratégica` |
| **`role`** | **string** | **`diretoria`** |
| **`active`** | **boolean** | **`true`** |
| `createdAt` | timestamp | (clique no relógio → "now") |
| `updatedAt` | timestamp | (clique no relógio → "now") |

---

## 📸 Como Deve Ficar no Firestore

```
Firebase Console > Firestore Database > users

users (coleção)
  ├── tXDNFTFJVZcijOYJNtKZtuFlFhv2    ← ADMIN
  │   ├── uid: "tXDNFTFJVZcijOYJNtKZtuFlFhv2"
  │   ├── email: "root@esfcatalao.com"
  │   ├── displayName: "Administrador"
  │   ├── role: "admin"              ← CRÍTICO!
  │   ├── active: true
  │   ├── createdAt: timestamp
  │   └── updatedAt: timestamp
  │
  └── AuURYgW9NWM5zovstvxOpGppAYF3    ← DIRETÓRIA
      ├── uid: "AuURYgW9NWM5zovstvxOpGppAYF3"
      ├── email: "gestao.estrategica@esfcatalao.com"
      ├── displayName: "Gestão Estratégica"
      ├── role: "diretoria"          ← CRÍTICO!
      ├── active: true
      ├── createdAt: timestamp
      └── updatedAt: timestamp
```

---

## ✅ Verificar Permissões Funcionando

### Como ADMINISTRADOR (root@esfcatalao.com)

**Menu lateral deve ter:**
- ✅ Painel de Controle
- ✅ Gerenciar Avisos
- ✅ **Gerenciar Usuários** ← Só admin vê
- ✅ Assistente Inteligente

**Na tabela de avisos:**
- ✅ Botão "Editar" (azul)
- ✅ Botão "Excluir" (vermelho) ← Só admin vê

**Badge no canto:** `Administrador` (roxo/azul)

---

### Como DIRETÓRIA (gestao.estrategica@esfcatalao.com)

**Menu lateral deve ter:**
- ✅ Painel de Controle (pode ver estatísticas)
- ✅ Gerenciar Avisos (só visualização)
- ❌ **NÃO TEM** "Gerenciar Usuários"
- ❌ **NÃO TEM** "Assistente Inteligente"

**Na tabela de avisos:**
- ❌ **NÃO TEM** botão "Editar"
- ❌ **NÃO TEM** botão "Excluir"
- ❌ **NÃO TEM** botão "Cadastrar Aviso"
- ✅ Pode apenas **VER** os avisos

**Badge no canto:** `Diretória` (verde)

---

## 🎨 Diferenças Visuais por Nível

### ADMIN (Administrador)
```
Badge: [Administrador] (roxo/azul - bg-purple-100)

Menu:
  ✅ Painel de Controle
  ✅ Gerenciar Avisos
  ✅ Gerenciar Usuários    ← Exclusivo
  ✅ Assistente IA

Avisos:
  ✅ [Cadastrar Aviso]
  ✅ [Assistente IA]
  ✅ [Editar] [Excluir]    ← Todos os botões
```

### PROFISSIONAL
```
Badge: [Profissional] (azul - bg-blue-100)

Menu:
  ✅ Painel de Controle
  ✅ Gerenciar Avisos
  ❌ Gerenciar Usuários
  ✅ Assistente IA

Avisos:
  ✅ [Cadastrar Aviso]
  ✅ [Assistente IA]
  ✅ [Editar]              ← Não pode excluir
  ❌ Excluir
```

### DIRETÓRIA (Gestão Estratégica)
```
Badge: [Diretória] (verde - bg-green-100)

Menu:
  ✅ Painel de Controle    ← Só visualização
  ✅ Gerenciar Avisos      ← Só visualização
  ❌ Gerenciar Usuários
  ❌ Assistente IA

Avisos:
  ❌ Cadastrar Aviso
  ❌ Assistente IA
  ❌ Editar
  ❌ Excluir
  👁️ APENAS VISUALIZAÇÃO
```

---

## 🔐 Tabela de Permissões Completa

| Ação | Admin | Profissional | Diretória |
|------|-------|--------------|-----------|
| Ver painel | ✅ | ✅ | ✅ |
| Ver avisos | ✅ | ✅ | ✅ |
| Criar avisos | ✅ | ✅ | ❌ |
| Editar avisos | ✅ | ✅ | ❌ |
| Excluir avisos | ✅ | ❌ | ❌ |
| Gerenciar usuários | ✅ | ❌ | ❌ |
| Usar Assistente IA | ✅ | ✅ | ❌ |

---

## 📝 Script de Configuração Rápida

Se preferir, pode usar este JSON para copiar direto no Firestore:

### Documento 1: ADMIN
```json
{
  "uid": "tXDNFTFJVZcijOYJNtKZtuFlFhv2",
  "email": "root@esfcatalao.com",
  "displayName": "Administrador",
  "role": "admin",
  "active": true
}
```

### Documento 2: DIRETÓRIA
```json
{
  "uid": "AuURYgW9NWM5zovstvxOpGppAYF3",
  "email": "gestao.estrategica@esfcatalao.com",
  "displayName": "Gestão Estratégica",
  "role": "diretoria",
  "active": true
}
```

---

## ⚠️ IMPORTANTE: Testar Cada Usuário

### Teste 1: Como ADMIN
1. Faça login com: `root@esfcatalao.com`
2. Verifique:
   - ✅ Vê "Gerenciar Usuários" no menu
   - ✅ Consegue criar aviso
   - ✅ Consegue editar aviso
   - ✅ Consegue **excluir** aviso
   - ✅ Badge mostra "Administrador"

### Teste 2: Como DIRETÓRIA
1. Faça **LOGOUT**
2. Faça login com: `gestao.estrategica@esfcatalao.com`
3. Verifique:
   - ✅ Vê o painel e estatísticas
   - ✅ Vê a lista de avisos
   - ❌ **NÃO vê** botão "Cadastrar Aviso"
   - ❌ **NÃO vê** botão "Editar"
   - ❌ **NÃO vê** botão "Excluir"
   - ❌ **NÃO vê** "Gerenciar Usuários" no menu
   - ❌ **NÃO vê** "Assistente IA" no menu
   - ✅ Badge mostra "Diretória" (verde)

---

## 🐛 Troubleshooting

### ADMIN não consegue excluir
**Causa:** Role não é exatamente "admin"  
**Solução:** Verifique se é `role: "admin"` (string, minúsculo)

### DIRETÓRIA consegue editar (não deveria!)
**Causa:** Role está como "profissional" ou "admin"  
**Solução:** Deve ser `role: "diretoria"` (exatamente assim)

### Badge aparece "Sem permissão"
**Causa:** Campo `active` é false ou não existe  
**Solução:** `active: true` (boolean, não string)

### Menu não muda entre usuários
**Causa:** Cache do navegador  
**Solução:** 
1. Limpe o cache: `Ctrl + Shift + Delete`
2. Faça logout
3. Feche e abra o navegador
4. Faça login novamente

---

## ✅ Checklist de Configuração

### Configuração no Firestore:
- [ ] Documento do ADMIN criado
- [ ] Role do ADMIN = "admin"
- [ ] Active do ADMIN = true
- [ ] Documento da DIRETÓRIA criado
- [ ] Role da DIRETÓRIA = "diretoria"
- [ ] Active da DIRETÓRIA = true

### Teste ADMIN:
- [ ] Fez login com root@esfcatalao.com
- [ ] Vê "Gerenciar Usuários" no menu
- [ ] Consegue criar aviso
- [ ] Consegue excluir aviso
- [ ] Badge mostra "Administrador"

### Teste DIRETÓRIA:
- [ ] Fez login com gestao.estrategica@esfcatalao.com
- [ ] Vê painel e avisos
- [ ] NÃO vê botões de edição
- [ ] NÃO vê "Gerenciar Usuários"
- [ ] Badge mostra "Diretória"

---

## 🎉 Pronto!

Com os dois usuários configurados corretamente:
- ✅ **Admin** tem controle total
- ✅ **Diretória** pode acompanhar mas não alterar
- ✅ Sistema de permissões funcionando perfeitamente

**Configure agora no Firestore e teste!** 🔐

