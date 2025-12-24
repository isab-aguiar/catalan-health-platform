# 🤖 Corrigir Erro do Chat IA

## ❌ Erro: "Erro ao conectar com a API (Status: 404)"

### 🔍 Causa
A URL da API do Gemini estava desatualizada (`/v1beta/` foi deprecada).

### ✅ Solução Aplicada
URL corrigida de:
```
❌ https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

Para:
```
✅ https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent
```

---

## 🔑 Verificar API Key

### 1. Você TEM a API Key do Gemini?

Se ainda **NÃO tem**, obtenha aqui:
```
🔗 https://aistudio.google.com/app/apikey
```

1. Faça login com sua conta Google
2. Clique em "Create API Key"
3. Copie a chave gerada

### 2. Adicionar no arquivo `.env`

Crie/edite o arquivo `.env` na pasta `react-app/`:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui_sem_aspas
```

**Exemplo:**
```env
VITE_GEMINI_API_KEY=AIzaSyAbC123dEfGhIjKlMnOpQrStUvWxYz
```

### 3. Reiniciar o Servidor

**IMPORTANTE:** Depois de adicionar a chave, você DEVE reiniciar:

```bash
# Parar o servidor (Ctrl + C no terminal)
# Depois iniciar novamente:
npm run dev
```

---

## 🧪 Testar o Chat IA

### 1. Acessar
```
http://localhost:5173/admin/chat-ia
```

### 2. Testar com exemplos simples

Digite no chat:
```
A vacina da gripe acabou
```

Deve retornar algo como:
```json
Título: Vacina contra Gripe Temporariamente Indisponível
Descrição: Informamos que as doses...
Categoria: Vacina
```

### 3. Outros testes

```
Campanha de vacinação semana que vem
```

```
Faltam seringas de 5ml
```

---

## 🐛 Outros Erros Possíveis

### Erro: "API Key não configurada"
**Causa:** Arquivo `.env` não existe ou não tem a chave  
**Solução:** 
1. Crie arquivo `.env` em `react-app/`
2. Adicione: `VITE_GEMINI_API_KEY=sua_chave`
3. Reinicie o servidor

### Erro: "Erro na requisição. Verifique sua API Key"
**Causa:** API Key inválida ou expirada  
**Solução:**
1. Gere nova chave em: https://aistudio.google.com/app/apikey
2. Substitua no `.env`
3. Reinicie o servidor

### Erro: "Limite de requisições excedido"
**Causa:** Muitas requisições em pouco tempo  
**Solução:** Aguarde 1 minuto e tente novamente

### Erro: "Erro de conexão"
**Causa:** Sem internet ou firewall bloqueando  
**Solução:**
1. Verifique sua conexão com internet
2. Teste em: https://fast.com/
3. Desative VPN/Proxy temporariamente

---

## ✅ Checklist

- [ ] Arquivo corrigido: `src/services/geminiService.js`
- [ ] URL alterada de `/v1beta/` para `/v1/`
- [ ] Tenho API Key do Gemini
- [ ] API Key adicionada no `.env`
- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Chat IA testado e funcionando

---

## 📝 Estrutura do .env

Seu arquivo `.env` deve estar em:
```
react-app/
  └── .env    ← AQUI
      src/
      public/
      ...
```

Conteúdo do `.env`:
```env
# API Key do Google Gemini
VITE_GEMINI_API_KEY=sua_chave_aqui
```

**Nota:** O `.env` já está no `.gitignore`, não será commitado.

---

## 🎉 Pronto!

Após estas correções:
- ✅ URL da API corrigida
- ✅ Chat IA funcionando
- ✅ Pode gerar avisos com IA

**Reinicie o servidor e teste agora!** 🚀

