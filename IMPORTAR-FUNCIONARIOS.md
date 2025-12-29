# Como Importar Funcionários para o Firestore

Este guia explica como fazer a migração dos dados de funcionários do arquivo `employees.js` para o Firebase Firestore.

## 📋 Pré-requisitos

- Estar logado como **admin** no painel administrativo
- Firebase configurado e funcionando
- Acesso à internet

## 🚀 Método 1: Interface Visual (Recomendado)

### Passo 1: Acessar o componente de importação

1. Entre no painel administrativo: `/admin`
2. Adicione temporariamente a rota para o componente `ImportEmployees`:

```javascript
// Em react-app/src/App.jsx ou no arquivo de rotas do admin
import ImportEmployees from './components/admin/ImportEmployees';

// Adicione a rota (temporária):
<Route path="/admin/import-employees" element={<ImportEmployees />} />
```

3. Navegue para: `http://localhost:5173/admin/import-employees`

### Passo 2: Verificar dados existentes (Opcional)

Antes de importar, clique em **"Verificar Existentes"** para ver quantos funcionários já estão no Firestore.

### Passo 3: Importar todos os funcionários

1. Clique no botão **"Importar Todos (48 funcionários)"**
2. Confirme a ação no popup
3. Aguarde a conclusão (leva cerca de 10-30 segundos)
4. Veja o resultado com estatísticas de sucesso/falhas

### Passo 4: Verificar no Firebase Console

1. Acesse: https://console.firebase.google.com
2. Selecione seu projeto
3. Vá em **Firestore Database**
4. Procure pela collection **"employees"**
5. Verifique se os 48 funcionários foram importados

### Passo 5: Remover o componente (Opcional)

Após a importação bem-sucedida, você pode:
- Remover a rota temporária do componente
- Ou mantê-la caso precise reimportar no futuro

---

## 💻 Método 2: Console do Navegador

Se preferir usar o console do navegador:

### Passo 1: Abrir o console

1. Entre no painel admin: `/admin`
2. Abra o Console do navegador (F12 → Console)

### Passo 2: Executar o script

Cole e execute este código:

```javascript
// Importar o script
import('http://localhost:5173/src/scripts/importEmployeesToFirestore.js').then(module => {
  // Verificar quantos já existem
  module.checkExistingEmployees();

  // Importar todos os funcionários
  module.importAllEmployees().then(result => {
    console.log('Resultado:', result);
  });
});
```

Ou, se o script já estiver carregado:

```javascript
// Verificar existentes
await checkExistingEmployees();

// Importar todos
await importAllEmployees();

// Importar apenas um departamento específico
await importDepartmentEmployees('medicoGeneralistaPsf');
```

---

## 📊 Estrutura dos Dados no Firestore

Após a importação, cada funcionário terá esta estrutura:

```javascript
{
  id: "medico-joao-sousa",
  fullName: "João Alves de Sousa Junior",
  displayName: "Dr. João",
  role: "Médico Generalista - P.S.F.",
  roleBase: "Médico Generalista",
  isPsf: true,
  department: "medicoGeneralistaPsf",
  departmentName: "Médico Generalista - P.S.F.",
  departmentCode: "MED-PSF",
  esf: "sao-jose",
  schedule: {
    morning: { start: "07h00", end: "11h00", display: "07h00 às 11h00", enabled: true },
    afternoon: { start: "13h00", end: "16h00", display: "13h00 às 16h00", enabled: true }
  },
  weeklySchedule: {
    segunda: { morning: "Consulta médica", afternoon: "Pré-natal" },
    terca: { morning: "Consulta médica", afternoon: "Consulta médica" },
    quarta: { morning: "Consulta médica", afternoon: "Pré-natal" },
    quinta: { morning: "Consulta médica", afternoon: "Consulta médica" },
    sexta: { morning: "Consulta médica", afternoon: "Visita domiciliar" }
  },
  contact: { phone: null, email: null },
  firebaseUid: null,
  active: true,
  metadata: {
    createdAt: "2025-12-29",
    updatedAt: "2025-12-29"
  }
}
```

---

## 🔒 Regras de Segurança

As regras já foram configuradas em `firestore.rules`:

```javascript
match /employees/{employeeId} {
  // Leitura pública (para exibir nas páginas)
  allow read: if true;

  // Apenas admins podem criar, atualizar e deletar
  allow create: if isAdmin();
  allow update: if isAdmin();
  allow delete: if isAdmin();
}
```

**Importante:** Deploy as regras com:
```bash
firebase deploy --only firestore:rules
```

---

## 🛠️ Usar os Dados no Frontend

### Importar o serviço

```javascript
import { getAllEmployees, getEmployeeById, getEmployeesByEsf } from '../services/employeesService';
```

### Buscar todos os funcionários

```javascript
const result = await getAllEmployees();
if (result.success) {
  console.log('Funcionários:', result.data);
}
```

### Buscar por ID

```javascript
const result = await getEmployeeById('medico-joao-sousa');
if (result.success) {
  console.log('Dr. João:', result.data);
}
```

### Buscar por ESF

```javascript
const result = await getEmployeesByEsf('sao-jose');
if (result.success) {
  console.log('Funcionários ESF São José:', result.data);
}
```

---

## 🔄 Reimportar/Atualizar Dados

Se precisar atualizar os dados:

1. **Edite o arquivo** `react-app/src/config/employees.js`
2. **Execute a importação novamente** (método 1 ou 2)
3. Os dados serão **atualizados** (não duplicados) pois usam o mesmo ID

---

## ⚠️ Troubleshooting

### Erro de permissão
- Certifique-se de estar logado como **admin**
- Verifique se as regras do Firestore foram deployadas

### Funcionários duplicados
- Não deve acontecer, pois o ID é único
- Se acontecer, delete manualmente no Firebase Console

### Falhas na importação
- Verifique o console do navegador para erros específicos
- Verifique sua conexão com o Firebase
- Tente reimportar apenas o departamento que falhou

---

## 📝 Arquivos Criados

Esta implementação criou os seguintes arquivos:

| Arquivo | Descrição |
|---------|-----------|
| `src/services/employeesService.js` | Serviço para gerenciar funcionários no Firestore |
| `src/scripts/importEmployeesToFirestore.js` | Script de importação |
| `src/components/admin/ImportEmployees.jsx` | Interface visual para importação |
| `firestore.rules` | Regras de segurança atualizadas |
| `IMPORTAR-FUNCIONARIOS.md` | Este guia |

---

## ✅ Checklist Final

- [ ] Funcionários importados para o Firestore (48 total)
- [ ] Verificado no Firebase Console
- [ ] Regras de segurança deployadas
- [ ] Testado busca de funcionários no frontend
- [ ] Componente de importação removido (ou rota desabilitada)
- [ ] Documentação revisada

---

## 🎯 Próximos Passos

Após a importação bem-sucedida:

1. **Criar painel de gerenciamento** de funcionários no admin
2. **Refatorar páginas de equipe** para usar dados do Firestore
3. **Vincular funcionários a usuários** Firebase (campo `firebaseUid`)
4. **Adicionar fotos** dos funcionários
5. **Implementar busca e filtros** avançados

---

**Dúvidas?** Consulte os comentários no código ou abra uma issue no repositório.
