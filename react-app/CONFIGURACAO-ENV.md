# 🔐 Configuração com Variáveis de Ambiente (.env)

## ✅ O QUE FOI FEITO

Seu projeto agora usa **variáveis de ambiente** para guardar as configurações do Firebase de forma mais segura!

### Benefícios desta abordagem:

✅ **Mais Seguro** - Não expõe credenciais diretamente no código  
✅ **Melhor Prática** - Padrão da indústria  
✅ **Ambiente-Específico** - Pode ter configs diferentes para dev/produção  
✅ **Protegido no Git** - O arquivo `.env` não é enviado para o GitHub  

---

## 📁 ARQUIVOS ATUALIZADOS

### 1. `src/config/firebase.js`
Agora usa variáveis de ambiente:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

### 2. `.env` (CRIADO)
Contém suas configurações reais do Firebase:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=esf-catalao-divinopolis.firebaseapp.com
# ... etc
```

⚠️ **IMPORTANTE**: Este arquivo está no `.gitignore` e NÃO será enviado para o GitHub!

---

## 🚀 COMO FUNCIONA

### No Vite (seu bundler)
- Variáveis de ambiente devem começar com `VITE_`
- Acesse com: `import.meta.env.VITE_NOME_DA_VARIAVEL`
- O Vite substitui as variáveis durante o build

### Desenvolvimento Local
- O arquivo `.env` é lido automaticamente
- As variáveis ficam disponíveis no código

### Produção (Vercel)
Você precisará adicionar as variáveis de ambiente no painel da Vercel:
1. Acesse: https://vercel.com/seu-projeto
2. Vá em: Settings > Environment Variables
3. Adicione cada variável manualmente

---

## 🔧 CONFIGURAÇÃO NO VERCEL (para quando fizer deploy)

Quando fizer deploy na Vercel, adicione estas variáveis:

| Nome | Valor |
|------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyDaJIRmyeAn0j4V3V1H1XZKWZ3n_9hBPJw` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `esf-catalao-divinopolis.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `esf-catalao-divinopolis` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `esf-catalao-divinopolis.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `221260640186` |
| `VITE_FIREBASE_APP_ID` | `1:221260640186:web:8327ba3bc7acd0c3bc7783` |

### Passos na Vercel:
1. Acesse seu projeto na Vercel
2. Vá em **Settings** (Configurações)
3. Clique em **Environment Variables** (Variáveis de Ambiente)
4. Para cada variável:
   - Clique em **Add New**
   - Cole o **Nome** (ex: `VITE_FIREBASE_API_KEY`)
   - Cole o **Valor**
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**
5. Faça um novo deploy para as mudanças terem efeito

---

## 📝 ESTRUTURA DO ARQUIVO .env

```env
# Comentários começam com #

# Variáveis devem começar com VITE_ para serem acessíveis no código
VITE_NOME_DA_VARIAVEL=valor_sem_aspas

# ❌ Errado:
NOME_SEM_VITE=valor          # Não será acessível
VITE_VAR="valor com aspas"   # Não use aspas!

# ✅ Correto:
VITE_FIREBASE_API_KEY=AIzaSy...
```

---

## 🔒 SEGURANÇA

### O que está protegido:
✅ Arquivo `.env` está no `.gitignore`  
✅ Não será enviado para o GitHub  
✅ Cada desenvolvedor pode ter seu próprio `.env`  

### ⚠️ ATENÇÃO:
- **NÃO** faça commit do arquivo `.env`
- **NÃO** compartilhe o arquivo `.env` publicamente
- **NÃO** poste o conteúdo do `.env` em fóruns/chats
- **SIM** adicione as variáveis manualmente na Vercel

---

## 🧪 TESTANDO

Para verificar se está funcionando:

1. **Reinicie o servidor** (importante!):
```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

2. **Verifique no console do navegador** (F12):
```javascript
console.log(import.meta.env.VITE_FIREBASE_API_KEY)
// Deve mostrar: AIzaSy...
```

Se mostrar `undefined`, verifique:
- O nome da variável está correto (com `VITE_`)
- Você reiniciou o servidor após criar o `.env`
- O arquivo `.env` está na pasta `react-app/`

---

## 📋 CHECKLIST

- [x] ✅ Arquivo `.env` criado
- [x] ✅ Arquivo `firebase.js` atualizado
- [x] ✅ Arquivo `.gitignore` já protege o `.env`
- [ ] ⏳ Criar usuário admin no Firebase Console
- [ ] ⏳ Testar o login localmente
- [ ] ⏳ Adicionar variáveis na Vercel (quando fizer deploy)

---

## ❓ PROBLEMAS COMUNS

### Erro: "import.meta.env.VITE_... is undefined"
**Solução:** 
1. Verifique se o arquivo `.env` existe em `react-app/.env`
2. Reinicie o servidor de desenvolvimento
3. Verifique se as variáveis começam com `VITE_`

### Erro na produção (Vercel)
**Solução:** 
1. Verifique se adicionou TODAS as variáveis na Vercel
2. Faça um novo deploy após adicionar as variáveis
3. Verifique se os nomes estão corretos (copie e cole!)

---

## 🎉 PRÓXIMOS PASSOS

Agora você precisa:

1. **Criar usuário admin no Firebase** (veja `GUIA-ETAPA-1-LOGIN.md`)
2. **Testar o login localmente**
3. **Quando estiver pronto para a ETAPA 2, me avise!**

---

## 💡 DICA PRO

Se você quiser diferentes configurações para desenvolvimento e produção, pode criar:

- `.env` - Configurações padrão
- `.env.local` - Sobrescreve `.env` (para testes locais)
- `.env.production` - Usado no build de produção

Mas por enquanto, apenas o `.env` é suficiente! 😊

