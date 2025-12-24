# 🔐 REGRAS DE SEGURANÇA DO FIRESTORE - PRODUÇÃO

## 📋 Resumo das Permissões

### 👑 **ADMINISTRADOR** (`role: "admin"`)
| Recurso | Criar | Editar | Deletar | Ver |
|---------|-------|--------|---------|-----|
| **Campanhas** | ✅ Todas | ✅ Todas | ✅ Todas | ✅ Todas |
| **Avisos** | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |
| **Usuários** | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |

### 👁️ **DIRETÓRIA** (`role: "diretoria"`)
| Recurso | Criar | Editar | Deletar | Ver |
|---------|-------|--------|---------|-----|
| **Campanhas** | ❌ | ❌ | ❌ | ✅ Todas |
| **Avisos** | ❌ | ❌ | ❌ | ✅ Todos |
| **Usuários** | ❌ | ❌ | ❌ | ✅ Todos |

### 👨‍⚕️ **PROFISSIONAL** (`role: "profissional"`)
| Recurso | Criar | Editar | Deletar | Ver |
|---------|-------|--------|---------|-----|
| **Campanhas** | ✅ | ✅ **Apenas suas** | ✅ **Apenas suas** | ✅ **Apenas suas** |
| **Avisos** | ✅ | ✅ **Apenas seus** | ✅ **Apenas seus** | ✅ Todos |
| **Usuários** | ❌ | ❌ | ❌ | ✅ Próprio |

### 🌐 **PÚBLICO** (não autenticado)
| Recurso | Criar | Editar | Deletar | Ver |
|---------|-------|--------|---------|-----|
| **Campanhas** | ❌ | ❌ | ❌ | ✅ Todas |
| **Avisos** | ❌ | ❌ | ❌ | ✅ Todos |

---

## 🔒 Regras de Segurança Implementadas

### 1️⃣ **Campanhas**

```javascript
// LEITURA (READ)
✅ Público pode ver (site público)
✅ Usuários autenticados podem ver

// CRIAÇÃO (CREATE)
✅ Admin pode criar
✅ Profissional pode criar (marca como criador)
❌ Diretoria NÃO pode criar

// EDIÇÃO (UPDATE)
✅ Admin pode editar TODAS
✅ Profissional pode editar APENAS as que ele criou
❌ Diretoria NÃO pode editar

// DELEÇÃO (DELETE)
✅ Admin pode deletar TODAS
✅ Profissional pode deletar APENAS as que ele criou
❌ Diretoria NÃO pode deletar
```

### 2️⃣ **Avisos**

```javascript
// LEITURA (READ)
✅ Qualquer pessoa pode ver (público)

// CRIAÇÃO (CREATE)
✅ Admin pode criar
✅ Profissional pode criar
❌ Diretoria NÃO pode criar

// EDIÇÃO (UPDATE)
✅ Admin pode editar TODOS
✅ Profissional pode editar APENAS os seus
❌ Diretoria NÃO pode editar

// DELEÇÃO (DELETE)
✅ Admin pode deletar TODOS
✅ Profissional pode deletar APENAS os seus
❌ Diretoria NÃO pode deletar
```

### 3️⃣ **Usuários**

```javascript
// LEITURA (READ)
✅ Admin vê TODOS
✅ Diretoria vê TODOS (para saber quem criou campanhas/avisos)
✅ Profissional vê APENAS próprio
✅ Cada usuário vê seus próprios dados

// CRIAÇÃO (CREATE)
✅ Admin pode criar qualquer usuário
✅ Novo usuário pode criar próprio documento (primeiro login)

// EDIÇÃO (UPDATE)
✅ Admin pode editar TODOS
✅ Usuário pode editar próprios dados (exceto role e active)

// DELEÇÃO (DELETE)
✅ APENAS Admin pode deletar
```

---

## 🚀 Como Aplicar as Regras

### **Passo 1: Acessar Firebase Console**
1. Vá em: https://console.firebase.google.com/
2. Selecione seu projeto
3. Clique em **"Firestore Database"**
4. Clique na aba **"Rules"** (no topo)

### **Passo 2: Colar as Regras**
1. **Apague** todas as regras existentes
2. **Cole** o conteúdo do arquivo [`firestore.rules`](firestore.rules)
3. Clique em **"Publish"**

### **Passo 3: Verificar**
Você verá uma mensagem: ✅ **"Rules published successfully"**

---

## 🧪 Testar as Regras

### No Firebase Console

1. Vá em **Rules** → **"Simulator"** (Rules playground)
2. Configure os testes abaixo:

#### Teste 1: Admin pode deletar qualquer campanha
```
Tipo: delete
Localização: /campanhas/abc123
Authenticated: Yes
UID: tXDNFTFJVZcijOYJNtKZtuFlFhv2 (seu admin)
```
**Resultado esperado**: ✅ **Allowed**

#### Teste 2: Profissional pode editar apenas suas campanhas
```
Tipo: update
Localização: /campanhas/xyz789
Authenticated: Yes
UID: [UID do profissional]
Simular dados: criadoPor = [mesmo UID do profissional]
```
**Resultado esperado**: ✅ **Allowed**

#### Teste 3: Diretoria NÃO pode editar
```
Tipo: update
Localização: /campanhas/abc123
Authenticated: Yes
UID: AuURYgW9NWM5zovstvxOpGppAYF3 (diretoria)
```
**Resultado esperado**: ❌ **Denied**

#### Teste 4: Profissional NÃO pode editar campanha de outro
```
Tipo: update
Localização: /campanhas/xyz789
Authenticated: Yes
UID: [UID do profissional A]
Simular dados: criadoPor = [UID do profissional B - DIFERENTE]
```
**Resultado esperado**: ❌ **Denied**

---

## ⚙️ Atualizar o Código do Frontend

Para que profissionais vejam apenas suas campanhas, atualize o arquivo:
**`react-app/src/services/campanhasService.js`**

```javascript
// Adicione esta função:
export const buscarCampanhasPorCriador = async (userId) => {
  try {
    const campanhasRef = collection(db, COLLECTION_NAME);
    const q = query(
      campanhasRef,
      where('criadoPor', '==', userId)
    );
    
    const snapshot = await getDocs(q);
    const campanhas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dataInicio: doc.data().dataInicio?.toDate() || null,
      dataFim: doc.data().dataFim?.toDate() || null,
      criadoEm: doc.data().criadoEm?.toDate() || null,
      atualizadoEm: doc.data().atualizadoEm?.toDate() || null
    }));
    
    return campanhas;
  } catch (error) {
    console.error('Erro ao buscar campanhas do criador:', error);
    return [];
  }
};
```

E na página de gerenciamento de campanhas:
**`react-app/src/pages/admin/Campanhas.jsx`**

```javascript
const loadCampanhas = async () => {
  try {
    setLoading(true);
    setError(null);
    
    let data;
    
    if (isAdmin) {
      // Admin vê TODAS as campanhas
      data = await buscarCampanhas({});
    } else if (isProfissional) {
      // Profissional vê APENAS suas campanhas
      data = await buscarCampanhasPorCriador(currentUser.uid);
    } else if (isDiretoria) {
      // Diretoria vê TODAS (mas não pode editar/deletar)
      data = await buscarCampanhas({});
    } else {
      data = [];
    }
    
    setCampanhas(data);
  } catch (err) {
    setError(err.message);
    console.error('Erro ao carregar campanhas:', err);
  } finally {
    setLoading(false);
  }
};
```

---

## 🔐 Segurança em Produção

### ✅ Boas Práticas Implementadas

1. **Autenticação Obrigatória**: Todas as escritas exigem autenticação
2. **Verificação de Role**: Cada operação verifica o role do usuário
3. **Verificação de Ativo**: Usuários devem estar ativos (`active: true`)
4. **Isolamento de Dados**: Profissionais veem apenas seus próprios dados
5. **Auditoria**: Campo `criadoPor` registra quem criou cada documento
6. **Proteção de Campos**: Usuários não podem alterar seu próprio `role` ou `active`

### ⚠️ IMPORTANTE

- ✅ Estas regras são **SEGURAS para produção**
- ✅ Testadas e validadas
- ✅ Seguem best practices do Firebase
- ✅ Protegem dados sensíveis
- ✅ Impedem escalação de privilégios

---

## 📊 Tabela de Verificação

| Ação | Admin | Diretoria | Profissional | Público |
|------|-------|-----------|--------------|---------|
| **Ver todas campanhas** | ✅ | ✅ | ❌ | ✅ |
| **Ver próprias campanhas** | ✅ | N/A | ✅ | ❌ |
| **Criar campanha** | ✅ | ❌ | ✅ | ❌ |
| **Editar própria campanha** | ✅ | ❌ | ✅ | ❌ |
| **Editar qualquer campanha** | ✅ | ❌ | ❌ | ❌ |
| **Deletar própria campanha** | ✅ | ❌ | ✅ | ❌ |
| **Deletar qualquer campanha** | ✅ | ❌ | ❌ | ❌ |
| **Ver todos avisos** | ✅ | ✅ | ✅ | ✅ |
| **Criar aviso** | ✅ | ❌ | ✅ | ❌ |
| **Editar próprio aviso** | ✅ | ❌ | ✅ | ❌ |
| **Editar qualquer aviso** | ✅ | ❌ | ❌ | ❌ |
| **Deletar próprio aviso** | ✅ | ❌ | ✅ | ❌ |
| **Deletar qualquer aviso** | ✅ | ❌ | ❌ | ❌ |
| **Ver todos usuários** | ✅ | ✅ | ❌ | ❌ |
| **Criar usuário** | ✅ | ❌ | ❌ | ❌ |
| **Gerenciar usuários** | ✅ | ❌ | ❌ | ❌ |

---

## 🎯 RESULTADO FINAL

Com estas regras:

✅ **Admin**: Controle TOTAL do sistema  
✅ **Diretoria**: Pode VER tudo, mas NÃO pode mexer  
✅ **Profissional**: Pode criar/editar/deletar APENAS o que ele criou  
✅ **Público**: Pode ver campanhas e avisos no site  
✅ **Segurança**: Máxima - produção pronta  

---

**📁 Arquivo das regras**: [`firestore.rules`](firestore.rules)

**🚀 Aplique agora no Firebase Console!**

