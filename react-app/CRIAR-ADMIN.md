# Como Criar o Primeiro Usuário Admin

## Importante
Após implementar o sistema de múltiplos níveis de acesso (ETAPA 3), você precisa criar um documento no Firestore para seu usuário com o role "admin".

## Método 1: Direto no Firebase Console (Recomendado)

1. **Acesse o Firebase Console:**
   - Vá em: https://console.firebase.google.com/
   - Selecione seu projeto

2. **Vá para Firestore Database:**
   - No menu lateral, clique em "Firestore Database"

3. **Crie a coleção `users`:**
   - Clique em "Iniciar coleção" (ou "Start collection")
   - Nome da coleção: `users`

4. **Adicione um documento com seu UID:**
   - ID do documento: `SEU_UID_DO_FIREBASE_AUTH`
   - Para descobrir seu UID:
     - Vá em "Authentication" no Firebase Console
     - Encontre seu email na lista de usuários
     - Copie o UID

5. **Adicione os campos do documento:**
   ```
   Campo: uid
   Tipo: string
   Valor: SEU_UID (mesmo do ID do documento)

   Campo: email
   Tipo: string
   Valor: seu@email.com

   Campo: displayName
   Tipo: string
   Valor: Seu Nome Completo

   Campo: role
   Tipo: string
   Valor: admin

   Campo: active
   Tipo: boolean
   Valor: true

   Campo: createdAt
   Tipo: timestamp
   Valor: (clique no relógio para usar timestamp atual)

   Campo: updatedAt
   Tipo: timestamp
   Valor: (clique no relógio para usar timestamp atual)

   Campo: createdBy
   Tipo: string
   Valor: null (ou deixe vazio)
   ```

6. **Salve o documento**

7. **Faça logout e login novamente** para que o sistema carregue seus novos dados

## Método 2: Via Console do Navegador

1. **Faça login no sistema** (mesmo sem ser admin ainda)

2. **Abra o Console do Navegador** (F12)

3. **Cole e execute este código JavaScript:**
   ```javascript
   // Importar funções do Firebase
   import { doc, setDoc, Timestamp } from 'firebase/firestore';
   import { db, auth } from './src/config/firebase';

   // Pegar UID do usuário logado
   const currentUser = auth.currentUser;
   
   if (currentUser) {
     // Criar documento admin
     const userRef = doc(db, 'users', currentUser.uid);
     
     await setDoc(userRef, {
       uid: currentUser.uid,
       email: currentUser.email,
       displayName: 'Seu Nome', // ALTERE AQUI
       role: 'admin',
       active: true,
       createdAt: Timestamp.now(),
       updatedAt: Timestamp.now(),
       createdBy: null
     });
     
     console.log('Admin criado com sucesso! Faça logout e login novamente.');
   } else {
     console.log('Nenhum usuário logado.');
   }
   ```

4. **Faça logout e login novamente**

## Método 3: Arquivo helper (Mais Técnico)

Criei um componente helper que você pode usar uma única vez:

1. **Crie o arquivo:** `react-app/src/components/admin/CreateFirstAdmin.jsx`

2. **Cole o conteúdo:**
   ```jsx
   import { useState } from 'react';
   import { doc, setDoc, Timestamp } from 'firebase/firestore';
   import { db, auth } from '../../config/firebase';
   
   export default function CreateFirstAdmin() {
     const [nome, setNome] = useState('');
     const [loading, setLoading] = useState(false);
     const [result, setResult] = useState(null);

     const handleCriarAdmin = async () => {
       if (!nome.trim()) {
         alert('Digite seu nome');
         return;
       }

       const currentUser = auth.currentUser;
       if (!currentUser) {
         alert('Faça login primeiro');
         return;
       }

       setLoading(true);
       try {
         const userRef = doc(db, 'users', currentUser.uid);
         
         await setDoc(userRef, {
           uid: currentUser.uid,
           email: currentUser.email,
           displayName: nome,
           role: 'admin',
           active: true,
           createdAt: Timestamp.now(),
           updatedAt: Timestamp.now(),
           createdBy: null
         });
         
         setResult({ success: true });
         alert('Admin criado com sucesso! Faça logout e login novamente para as mudanças terem efeito.');
       } catch (error) {
         console.error('Erro:', error);
         setResult({ success: false, error: error.message });
       } finally {
         setLoading(false);
       }
     };

     return (
       <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold mb-4">Criar Primeiro Admin</h2>
         <p className="text-sm text-neutral-600 mb-4">
           Use esta ferramenta APENAS UMA VEZ para criar o primeiro usuário admin.
         </p>
         
         <div className="mb-4">
           <label className="block text-sm font-medium mb-2">Seu Nome:</label>
           <input
             type="text"
             value={nome}
             onChange={(e) => setNome(e.target.value)}
             className="w-full px-4 py-2 border rounded-lg"
             placeholder="Nome Completo"
           />
         </div>
         
         <button
           onClick={handleCriarAdmin}
           disabled={loading}
           className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50"
         >
           {loading ? 'Criando...' : 'Criar Admin'}
         </button>

         {result && (
           <div className={`mt-4 p-3 rounded ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
             {result.success ? '✓ Sucesso!' : `✗ Erro: ${result.error}`}
           </div>
         )}
       </div>
     );
   }
   ```

3. **Adicione uma rota temporária no `App.jsx`:**
   ```jsx
   // Temporário - remover depois
   const CreateFirstAdmin = lazyLoad(() => import('./components/admin/CreateFirstAdmin'));
   
   // Na seção de rotas:
   <Route path="/criar-admin" element={<CreateFirstAdmin />} />
   ```

4. **Acesse:** `http://localhost:5173/criar-admin`

5. **Preencha seu nome e clique em "Criar Admin"**

6. **Faça logout e login novamente**

7. **REMOVA a rota e o componente após criar o admin**

## Verificar se funcionou

Após fazer logout e login novamente:

1. Você verá um badge com seu role no canto superior direito
2. No painel admin, você verá o link "Gerenciar Usuários"
3. Você poderá criar outros usuários

## Roles Disponíveis

- **admin**: Acesso total (criar usuários, deletar avisos)
- **profissional**: Pode criar e editar avisos
- **diretorio**: Apenas visualização

## Próximos Passos

Depois de criar o primeiro admin, você pode:
1. Criar outros usuários através da página `/admin/users`
2. Definir roles apropriados para cada pessoa da equipe
3. Desativar usuários quando necessário

