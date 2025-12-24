# 🚀 Configurar Variáveis de Ambiente na Vercel

## ⚠️ PROBLEMA: Tela em Branco

Se o site está aparecendo em branco, é porque as **variáveis de ambiente do Firebase não estão configuradas na Vercel**.

## ✅ SOLUÇÃO: Adicionar Variáveis na Vercel

### Passo 1: Acessar o Painel da Vercel

1. Acesse: https://vercel.com
2. Faça login na sua conta
3. Selecione o projeto: **ubs-saojose** (ou o nome do seu projeto)

### Passo 2: Configurar Variáveis de Ambiente

1. No menu lateral, clique em **Settings** (Configurações)
2. Clique em **Environment Variables** (Variáveis de Ambiente)
3. Adicione cada uma das variáveis abaixo:

#### Variáveis Necessárias:

| Nome da Variável | Valor |
|-----------------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyDaJIRmyeAn0j4V3V1H1XZKWZ3n_9hBPJw` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `esf-catalao-divinopolis.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `esf-catalao-divinopolis` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `esf-catalao-divinopolis.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `221260640186` |
| `VITE_FIREBASE_APP_ID` | `1:221260640186:web:8327ba3bc7acd0c3bc7783` |

### Passo 3: Para Cada Variável

1. Clique em **Add New** (Adicionar Nova)
2. Cole o **Nome** da variável (ex: `VITE_FIREBASE_API_KEY`)
3. Cole o **Valor** correspondente
4. **IMPORTANTE**: Marque todas as opções:
   - ✅ **Production**
   - ✅ **Preview** 
   - ✅ **Development**
5. Clique em **Save** (Salvar)

### Passo 4: Fazer Novo Deploy

Após adicionar todas as variáveis:

1. Vá para a aba **Deployments** (Deployments)
2. Clique nos três pontos (⋯) do último deploy
3. Selecione **Redeploy** (Refazer Deploy)
4. Ou faça um novo commit/push para acionar um deploy automático

## ✅ Verificação

Após o deploy, acesse: https://ubs-saojose.vercel.app/

O site deve carregar normalmente agora! 🎉

## 📝 Notas Importantes

- ⚠️ As variáveis **devem** começar com `VITE_` para funcionar no Vite
- ⚠️ **NÃO** adicione aspas nos valores
- ⚠️ Certifique-se de marcar **todas** as opções (Production, Preview, Development)
- ✅ Após adicionar as variáveis, é necessário fazer um novo deploy

## 🔍 Como Verificar se Funcionou

1. Abra o site: https://ubs-saojose.vercel.app/
2. Abra o Console do Navegador (F12)
3. Se não houver erros relacionados ao Firebase, está funcionando!
4. Se ainda houver erros, verifique se todas as variáveis foram adicionadas corretamente

## 🆘 Problemas Comuns

### "Firebase não inicializado"
- **Solução**: Verifique se todas as 6 variáveis foram adicionadas na Vercel

### "Variáveis não encontradas"
- **Solução**: Certifique-se de que os nomes das variáveis estão **exatamente** como mostrado acima (com `VITE_` no início)

### "Deploy não atualizou"
- **Solução**: Faça um novo deploy manualmente ou faça um commit/push

---

**Última atualização**: Após adicionar tratamento de erro para variáveis de ambiente

