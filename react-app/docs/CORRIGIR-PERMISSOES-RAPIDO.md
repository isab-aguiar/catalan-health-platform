# 🔧 Corrigir Permissões de Admin - SOLUÇÃO RÁPIDA

## ⚡ Solução Automática (RECOMENDADO)

### Passo 1: Acesse a Página de Correção

1. Faça login no sistema (mesmo sem permissões de admin)
2. Acesse: **https://ubs-saojose.vercel.app/admin/corrigir-permissoes**
3. Ou localmente: **http://localhost:5173/admin/corrigir-permissoes**

### Passo 2: Clique no Botão

1. Na página, você verá suas informações atuais
2. Clique no botão **"Corrigir Permissões"**
3. Aguarde a confirmação de sucesso

### Passo 3: Aplicar Mudanças

1. **Faça LOGOUT** do sistema
2. **Limpe o cache** do navegador (Ctrl + Shift + Delete)
3. **Faça LOGIN** novamente
4. Agora você deve ter permissões de admin!

---

## 🔍 Verificar o Problema

### O que pode estar errado:

1. **Documento não existe no Firestore**
   - O documento do usuário na coleção `users` não existe
   - Solução: A página de correção cria automaticamente

2. **Campo `role` não é "admin"**
   - O campo `role` está como `null`, `"profissional"` ou outro valor
   - Solução: A página de correção define como `"admin"`

3. **Campo `active` está como `false`**
   - O usuário está desativado
   - Solução: A página de correção define como `true`

4. **Firebase não inicializado**
   - Variáveis de ambiente não configuradas
   - Solução: Já configuramos na Vercel, mas verifique se o deploy foi concluído

---

## 🛠️ Solução Manual (Se a página não funcionar)

### Via Firebase Console:

1. Acesse: https://console.firebase.google.com/
2. Selecione o projeto: **esf-catalao-divinopolis**
3. Vá em **Firestore Database** > **Dados**
4. Encontre a coleção **`users`**
5. Procure pelo documento com seu **UID** (ou crie um novo)
6. Adicione/edite os campos:

```
uid: "seu-uid-aqui"
email: "seu-email@exemplo.com"
displayName: "Administrador"
role: "admin"          ← IMPORTANTE!
active: true           ← IMPORTANTE!
createdAt: (timestamp)
updatedAt: (timestamp)
```

7. Salve e faça logout/login novamente

---

## 📋 Checklist de Verificação

Após corrigir, verifique:

- [ ] Fez logout do sistema
- [ ] Limpou cache do navegador
- [ ] Fez login novamente
- [ ] Consegue acessar `/admin/painel`
- [ ] Vê "Gerenciar Usuários" no menu
- [ ] Consegue criar/editar/deletar avisos
- [ ] Consegue acessar todas as páginas administrativas

---

## 🆘 Ainda não funciona?

### Verifique no Console do Navegador (F12):

```javascript
// Deve mostrar:
userData: {
  role: "admin",      // ← Deve ser "admin"
  active: true        // ← Deve ser true
}
```

### Se mostrar `undefined` ou valores incorretos:

1. Verifique se o documento existe no Firestore
2. Verifique se os campos estão corretos (role = "admin", active = true)
3. Verifique se o Firebase está inicializado (sem erros no console)
4. Tente acessar a página de correção novamente

---

## ✅ Sucesso!

Se tudo funcionou, você agora tem:
- ✅ Acesso total como administrador
- ✅ Pode gerenciar avisos, campanhas e usuários
- ✅ Todas as funcionalidades liberadas

**Aproveite seu painel administrativo!** 🎉

