# 🔥 REGRAS DO FIRESTORE - CONFIGURAÇÃO OBRIGATÓRIA

## ⚠️ PROBLEMA: Campanhas não apagam?

**Causa provável**: Suas regras do Firestore estão **BLOQUEANDO** a deleção.

## ✅ SOLUÇÃO: Cole estas regras no Firebase Console

### 📍 Onde configurar:
1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto
3. Vá em: **Firestore Database** → **Rules** (aba superior)
4. Cole as regras abaixo
5. Clique em **"Publish"**

---

## 🔐 REGRAS CORRETAS (COPIE TUDO)

```javascript

```

---

## 🎯 O que essas regras fazem?

### Campanhas:
- ✅ **Qualquer pessoa** pode **LER** (site público)
- ✅ **Usuários logados** podem **CRIAR** e **EDITAR**
- ✅ **APENAS ADMIN** pode **DELETAR** ← **ISSO RESOLVE SEU PROBLEMA!**

### Avisos:
- ✅ **Qualquer pessoa** pode **LER**
- ✅ **Usuários logados** podem criar/editar
- ✅ **APENAS ADMIN** pode deletar

### Usuários:
- ✅ Cada um vê seus próprios dados
- ✅ **ADMIN** vê todos os usuários
- ✅ **ADMIN** pode criar/editar qualquer usuário

---

## 🧪 TESTE RÁPIDO (Depois de aplicar as regras)

### No Firebase Console:

1. **Firestore Database** → **Rules**
2. Clique em **"Simulator"** (aba "Rules playground")
3. Configure:
   - Tipo: `delete`
   - Location: `/campanhas/QUALQUER_ID`
   - Authenticated: `Yes`
   - UID: `tXDNFTFJVZcijOYJNtKZtuFlFhv2` (seu admin)
4. Clique em **"Run"**

**Resultado esperado**: ✅ **"Allowed"** (verde)

---

## ⚠️ AINDA NÃO FUNCIONA?

### Solução Temporária de Emergência

**APENAS PARA TESTAR** - Cole isso e publique:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // LIBERA TUDO (TEMPORÁRIO!)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Com isso**:
1. Tente deletar a campanha
2. **SE FUNCIONAR**: O problema ERA as regras!
3. **Volte imediatamente** para as regras seguras acima

---

## 📋 Checklist de Verificação

Depois de aplicar as regras:

- [ ] Regras publicadas no Firebase Console
- [ ] Fez **logout** do sistema
- [ ] Fez **login** novamente como admin
- [ ] Abriu o **Console do navegador** (F12)
- [ ] Verificou que `role: "admin"` aparece nos logs
- [ ] Tentou deletar a campanha
- [ ] A campanha foi deletada ✅
- [ ] Recarregou a página
- [ ] A campanha NÃO voltou ✅

---

## 🎉 Resultado Esperado

Após configurar as regras corretamente:

1. ✅ **Campanhas apagam** e **NÃO VOLTAM**
2. ✅ **Admin tem controle total**
3. ✅ **Diretória pode VER mas não editar/deletar**
4. ✅ **Público pode ver** o site normalmente
5. ✅ **Segurança mantida**

---

**⚡ IMPORTANTE**: Se depois disso ainda não funcionar, o problema pode ser:
- Cache do navegador (aperte Ctrl+Shift+Del e limpe tudo)
- Você não está logado como admin
- O UID do admin está errado no Firestore

Use o **script de correção** que criei para verificar tudo!

