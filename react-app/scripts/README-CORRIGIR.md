# 🔧 Como Usar o Script de Correção

## 📋 O que este script faz?

1. **Lista todas as campanhas** do Firebase
2. **Deleta campanhas específicas** ou todas de uma vez
3. **Cria o usuário da Diretória** com permissões corretas

## 🚀 Como Executar

### Passo 1: Configurar as Credenciais

Abra o arquivo `corrigir-campanhas-e-usuarios.mjs` e preencha suas credenciais do Firebase:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  // ... etc
};
```

**Onde encontrar essas credenciais?**
- Vá em: Firebase Console → Project Settings → Your apps → SDK setup and configuration
- OU copie do arquivo `src/config/firebase.js`

### Passo 2: Executar o Script

No terminal, dentro da pasta `react-app`:

```bash
node scripts/corrigir-campanhas-e-usuarios.mjs
```

### Passo 3: Escolher Opção no Menu

```
🔹 MENU DE OPÇÕES:
1. Listar todas as campanhas
2. Deletar campanha específica (por ID)
3. Deletar TODAS as campanhas (cuidado!)
4. Criar usuário da Diretória
5. Fazer TUDO (criar diretória + listar campanhas)
0. Sair
```

## 📖 Guia de Uso

### Para DELETAR a campanha que não apaga:

1. Escolha opção **1** para listar todas
2. Copie o ID da campanha problemática
3. Escolha opção **2** 
4. Cole o ID e confirme

### Para CRIAR o usuário da Diretória:

1. Escolha opção **4**
2. O script cria automaticamente com:
   - Email: gestao.estrategica@esfcatalao.com
   - UID: AuURYgW9NWM5zovstvxOpGppAYF3
   - Role: diretoria
   - Permissões: pode VER tudo, mas NÃO pode editar/excluir

### Para DELETAR TODAS as campanhas:

⚠️ **CUIDADO!** Isso é IRREVERSÍVEL!

1. Escolha opção **3**
2. Digite `CONFIRMO` (exatamente assim)
3. Todas as campanhas serão deletadas

## 🎯 Opção Recomendada

Use a opção **5** que faz tudo automaticamente:
- ✅ Cria usuário da Diretória
- ✅ Lista todas as campanhas
- ✅ Você pode ver o que tem no banco

## 🔐 Permissões da Diretória

O usuário criado terá:

| Permissão | Pode? |
|-----------|-------|
| Ver avisos | ✅ Sim |
| Criar avisos | ❌ Não |
| Editar avisos | ❌ Não |
| Excluir avisos | ❌ Não |
| Ver campanhas | ✅ Sim |
| Ver estatísticas | ✅ Sim |
| Gerenciar usuários | ❌ Não |
| Acessar painel admin | ✅ Sim |

## ⚠️ Troubleshooting

### "Erro de autenticação"
- Verifique se as credenciais do Firebase estão corretas
- Confirme que copiou TODAS as chaves necessárias

### "Permission denied"
- Suas regras do Firestore podem estar bloqueando
- Execute este comando no Firebase Console (Rules):

```javascript
// TEMPORÁRIO - APENAS PARA EXECUTAR O SCRIPT
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **IMPORTANTE**: Depois de executar o script, VOLTE às regras seguras!

## 📞 Suporte

Se ainda tiver problemas:
1. Verifique o console do navegador (F12) para erros
2. Confirme que está logado como admin
3. Tente fazer logout e login novamente

