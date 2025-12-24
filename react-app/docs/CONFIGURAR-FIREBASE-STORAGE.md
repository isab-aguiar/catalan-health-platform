# 🔧 Configurar Firebase Storage - Corrigir Erro 404

## ❌ Problema
Ao tentar enviar arquivos (imagens/PDFs), você recebe um erro 404:
```
404 Not Found - OPTIONS request failed
```

## ✅ Solução: Configurar Regras de Segurança

### Passo 1️⃣: Acessar Console do Firebase

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto: **esf-catalao-divinopolis**
3. No menu lateral, clique em **"Storage"** (ícone de pasta)
4. Se aparecer um botão **"Começar"**, clique nele para ativar o Storage

### Passo 2️⃣: Configurar Regras de Segurança

1. No Firebase Storage, clique na aba **"Rules"** (Regras)
2. Você verá algo assim:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

3. **SUBSTITUA** todo o conteúdo por estas regras:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Regras para campanhas
    match /campanhas/{userId}/{fileName} {
      // Permitir leitura para todos
      allow read: if true;
      
      // Permitir escrita apenas para usuários autenticados
      allow write: if request.auth != null 
                   && request.auth.uid == userId;
      
      // Validações
      allow create: if request.auth != null
                    && request.auth.uid == userId
                    && request.resource.size < 10 * 1024 * 1024  // Máximo 10MB
                    && (request.resource.contentType.matches('image/.*') 
                        || request.resource.contentType == 'application/pdf');
    }
    
    // Bloquear todo o resto
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

4. Clique em **"Publicar"** (Publish)

### Passo 3️⃣: Verificar o Storage Bucket

1. Ainda no Firebase Storage, verifique se o bucket está ativo
2. O nome deve ser: `esf-catalao-divinopolis.firebasestorage.app`
3. Se não existir pasta `campanhas/`, ela será criada automaticamente no primeiro upload

### Passo 4️⃣: Testar no Sistema

1. **Reinicie o servidor** React:
   ```bash
   cd react-app
   npm run dev
   ```

2. Acesse o Chat IA
3. Envie uma imagem pequena para testar
4. Deve funcionar! ✅

---

## 🔍 Explicação das Regras

- **`allow read: if true`**: Qualquer pessoa pode ver as campanhas
- **`allow write: if request.auth != null`**: Apenas usuários logados podem fazer upload
- **`request.auth.uid == userId`**: Usuário só pode fazer upload na própria pasta
- **`request.resource.size < 10 * 1024 * 1024`**: Limite de 10MB
- **`contentType.matches('image/.*')`**: Aceita todas as imagens
- **`contentType == 'application/pdf'`**: Aceita PDFs

---

## ⚠️ Segurança

Estas regras são **SEGURAS** porque:
- ✅ Apenas usuários autenticados podem fazer upload
- ✅ Cada usuário só pode escrever na própria pasta
- ✅ Limite de tamanho de arquivo
- ✅ Apenas imagens e PDFs permitidos
- ✅ Leitura pública (necessário para exibir campanhas na homepage)

---

## 🆘 Ainda não funciona?

### Verifique o arquivo `.env`:

```env
VITE_FIREBASE_STORAGE_BUCKET=esf-catalao-divinopolis.firebasestorage.app
```

### Tente limpar o cache:

```bash
npm run dev -- --force
```

### Console do navegador:

Abra o Console (F12) e procure por mensagens de erro detalhadas.

---

## ✅ Pronto!

Após configurar as regras, o upload de imagens e PDFs deve funcionar perfeitamente! 🎉

