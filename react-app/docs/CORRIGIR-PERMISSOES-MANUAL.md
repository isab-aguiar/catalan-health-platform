# 🔐 Corrigir Permissões do Admin - MANUAL PASSO A PASSO

## 👤 Seus Dados do Admin

```
UID: tXDNFTFJVZcijOYJNtKZtuFlFhv2
Email: root@esfcatalao.com
Nome: Administrador
```

---

## 🎯 MÉTODO 1: Via Console do Firebase (RECOMENDADO)

### Passo 1: Acessar Firebase Console
1. Abra: https://console.firebase.google.com/
2. Selecione seu projeto PSF São José
3. No menu lateral, clique em **"Firestore Database"**
4. Clique em **"Dados"** (ou "Data")

### Passo 2: Localizar/Criar o Documento do Usuário

#### Opção A: Se a coleção `users` JÁ EXISTE
1. Clique na coleção **`users`**
2. Procure pelo documento com ID: `tXDNFTFJVZcijOYJNtKZtuFlFhv2`
3. Se encontrar, clique nele e pule para **Passo 3**
4. Se NÃO encontrar, clique em **"Adicionar documento"**

#### Opção B: Se a coleção `users` NÃO EXISTE
1. Clique em **"Iniciar coleção"** (ou "Start collection")
2. Nome da coleção: `users`
3. Clique em **"Avançar"**

### Passo 3: Adicionar/Editar os Campos

**ID do documento:** `tXDNFTFJVZcijOYJNtKZtuFlFhv2`

**Adicione estes campos EXATAMENTE assim:**

| Campo | Tipo | Valor |
|-------|------|-------|
| `uid` | string | `tXDNFTFJVZcijOYJNtKZtuFlFhv2` |
| `email` | string | `root@esfcatalao.com` |
| `displayName` | string | `Administrador` |
| `role` | string | `admin` |
| `active` | boolean | `true` |
| `createdAt` | timestamp | (clique no relógio, selecione "now") |
| `updatedAt` | timestamp | (clique no relógio, selecione "now") |

### Passo 4: Salvar
1. Clique em **"Salvar"** (ou "Save")
2. Confirme se todos os campos foram salvos corretamente

### Passo 5: Verificar
Você deve ver algo assim no Firestore:

```
users (coleção)
  └── tXDNFTFJVZcijOYJNtKZtuFlFhv2 (documento)
      ├── uid: "tXDNFTFJVZcijOYJNtKZtuFlFhv2"
      ├── email: "root@esfcatalao.com"
      ├── displayName: "Administrador"
      ├── role: "admin"              ← IMPORTANTE!
      ├── active: true               ← IMPORTANTE!
      ├── createdAt: 24/12/2025...
      └── updatedAt: 24/12/2025...
```

---

## 🎯 MÉTODO 2: Via Script (ALTERNATIVO)

Se preferir usar script automático:

### Passo 1: Atualizar Credenciais
Abra o arquivo: `../scripts/corrigir-admin-permissoes.js`  
(localizado em `/react-app/scripts/corrigir-admin-permissoes.js`)

Copie suas credenciais do Firebase de: `src/config/firebase.js`

Cole no script onde diz:
```javascript
const firebaseConfig = {
  apiKey: "sua_api_key_aqui",
  // ... copie tudo aqui
};
```

### Passo 2: Executar Script
```bash
# A partir da pasta react-app/
node scripts/corrigir-admin-permissoes.js
```

---

## ✅ DEPOIS DE CORRIGIR

### 1. Limpar Tudo
```bash
# No navegador:
Ctrl + Shift + Delete
```
Marque:
- ✅ Cookies e dados de sites
- ✅ Imagens e arquivos em cache
- ✅ Dados armazenados

### 2. Reiniciar o Servidor
```bash
# No terminal, pare o servidor (Ctrl + C)
# Depois reinicie:
npm run dev
```

### 3. Fazer Logout e Login
1. Acesse: http://localhost:5173/admin/login
2. Se já estiver logado, clique em **"Encerrar Sessão"**
3. Faça login com:
   - Email: `root@esfcatalao.com`
   - Senha: (sua senha)

### 4. Testar Permissões
Após login, você deve conseguir:
- ✅ Ver o painel com estatísticas
- ✅ Clicar em "Gerenciar Avisos" (carrega rápido!)
- ✅ Criar novo aviso
- ✅ Editar aviso
- ✅ **Excluir aviso** (só admin pode)
- ✅ Ver "Gerenciar Usuários" no menu (só admin)
- ✅ Usar o Assistente IA

---

## 🔍 Verificar se Funcionou

### Console do Navegador (F12)

Após fazer login, abra o Console e veja se aparece:

```javascript
// Deve mostrar:
userData: {
  uid: "tXDNFTFJVZcijOYJNtKZtuFlFhv2",
  email: "root@esfcatalao.com",
  displayName: "Administrador",
  role: "admin",        // ← IMPORTANTE!
  active: true          // ← IMPORTANTE!
}
```

### Visual do Sistema

No canto superior direito deve aparecer:
```
[Avatar] Administrador
         root@esfcatalao.com
         [Badge: Administrador]    ← Deve ser roxo/azul
```

No menu lateral (sidebar) deve ter:
- ✅ Painel de Controle
- ✅ Gerenciar Avisos
- ✅ **Gerenciar Usuários** ← SÓ APARECE PARA ADMIN!
- ✅ Assistente Inteligente

---

## 🐛 Troubleshooting

### Erro: "Dados do usuário não encontrados"
**Causa:** Documento não existe no Firestore  
**Solução:** Siga o **MÉTODO 1** acima para criar

### Erro: "Permission denied"
**Causa:** Regras do Firestore muito restritivas  
**Solução:** Vá em Firestore > Rules e cole isso:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Avisos - qualquer um pode ler, autenticados podem escrever
    match /avisos/{aviso} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Users - usuário lê seus dados, admin lê tudo
    match /users/{userId} {
      // Usuário pode ler seus próprios dados
      allow read: if request.auth != null && 
                     request.auth.uid == userId;
      
      // Admin pode ler e escrever tudo
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      
      // Permitir escrita inicial (para criar primeiro admin)
      allow write: if request.auth != null && 
                      request.auth.uid == userId;
    }
  }
}
```

### Botão "Gerenciar Usuários" não aparece
**Causa:** Role não é "admin" ou active é false  
**Solução:** 
1. Volte no Firestore
2. Verifique se `role` = `"admin"` (exatamente assim)
3. Verifique se `active` = `true` (boolean, não string)

### Não consegue excluir avisos
**Causa:** Permissão de exclusão é só para admin  
**Solução:** Certifique-se que `role` = `"admin"` no Firestore

---

## 📸 Como Deve Ficar no Firestore

```
Firebase Console > Firestore Database

Coleções:
  ├── avisos
  │   ├── [documentos dos avisos...]
  │   
  └── users
      └── tXDNFTFJVZcijOYJNtKZtuFlFhv2    ← SEU DOCUMENTO
          ├── uid: "tXDNFTFJVZcijOYJNtKZtuFlFhv2"
          ├── email: "root@esfcatalao.com"
          ├── displayName: "Administrador"
          ├── role: "admin"
          ├── active: true
          ├── createdAt: December 24, 2025 at...
          └── updatedAt: December 24, 2025 at...
```

---

## ✅ Checklist Final

Marque conforme testar:

- [ ] Documento criado/atualizado no Firestore
- [ ] Campo `role` = `"admin"`
- [ ] Campo `active` = `true`
- [ ] Fez logout
- [ ] Limpou cache do navegador
- [ ] Fez login novamente
- [ ] Painel carrega rápido
- [ ] "Gerenciar Avisos" funciona
- [ ] "Gerenciar Usuários" aparece no menu
- [ ] Consegue criar aviso
- [ ] Consegue editar aviso
- [ ] Consegue **excluir** aviso (só admin)

---

## 🎉 Sucesso!

Se todos os itens do checklist estão marcados, suas permissões estão corretas!

Agora você tem:
- ✅ Acesso total como administrador
- ✅ Pode gerenciar avisos e usuários
- ✅ Sistema rápido e otimizado
- ✅ Todas as funcionalidades liberadas

**Aproveite seu novo painel administrativo profissional!** 🏛️

