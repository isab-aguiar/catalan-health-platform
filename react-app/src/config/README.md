# Configuração Centralizada de Dados

Este diretório contém todos os dados de configuração centralizados do projeto, facilitando a manutenção e atualização de informações como telefones, endereços, horários e redes sociais.

## Estrutura de Arquivos

- `contact.js` - Informações de contato (telefones, emails, endereços)
- `schedule.js` - Horários de funcionamento e atendimento
- `socialMedia.js` - Links de redes sociais
- `vlibras.js` - Configuração do widget VLibras (acessibilidade em Libras)
- `employees.js` - Dados de todos os funcionários organizados por departamento
- `index.js` - Barrel export para facilitar imports

## Como Atualizar os Dados

### Informações de Contato (`contact.js`)

Para atualizar telefones, emails ou endereços:

1. Abra o arquivo `src/config/contact.js`
2. Localize a seção correspondente:
   - `phones` - Telefones
   - `emails` - Emails
   - `address` - Endereços
3. Atualize os valores desejados
4. Salve o arquivo

**Exemplo - Atualizar telefone da recepção:**
```javascript
phones: {
  reception: { display: '(37) 3229-6080', tel: '+553732296080' },
  // ...
}
```

**Importante:**
- `display`: Formato exibido ao usuário (ex: "(37) 3229-6080")
- `tel`: Formato para links `tel:` (ex: "+553732296080")
- `wa`: Formato para links WhatsApp (ex: "5537991770200")

### Horários de Funcionamento (`schedule.js`)

Para atualizar horários:

1. Abra o arquivo `src/config/schedule.js`
2. Localize a seção correspondente:
   - `reception` - Horários da recepção
   - `administrative` - Horários administrativos
   - `dental` - Horários do consultório odontológico
   - `pharmacy` - Horários da farmácia
   - `vaccines` - Horários de vacinação
   - `referenceUnits` - Horários das unidades de referência
   - `remsa` - Horários do REMSA
3. Atualize os valores desejados
4. Salve o arquivo

**Exemplo - Atualizar horário da recepção:**
```javascript
reception: {
  weekdays: '07:00 - 17:00',
  saudeNaHora: '17:00 - 22:00',
  full: 'Segunda a Sexta: 07:00 - 17:00'
}
```

### Redes Sociais (`socialMedia.js`)

Para atualizar links de redes sociais:

1. Abra o arquivo `src/config/socialMedia.js`
2. Localize a seção correspondente:
   - `esfCatalao` - Redes sociais da ESF Catalão
   - `remsa` - Redes sociais do REMSA
   - `prefeitura` - Redes sociais da Prefeitura
   - `semusa` - Redes sociais da SEMUSA
3. Atualize as URLs e handles desejados
4. Salve o arquivo

**Exemplo - Atualizar Instagram da ESF Catalão:**
```javascript
esfCatalao: {
  instagram: {
    url: 'https://instagram.com/esfcatalao',
    handle: '@esfcatalao'
  }
}
```

### Funcionários (`employees.js`)

Para atualizar informações de funcionários:

1. Abra o arquivo `src/config/employees.js`
2. Localize o departamento correspondente (ex: `medicoGeneralistaPsf`, `enfermeiro`, `dentista`)
3. Encontre o funcionário pelo ID único
4. Atualize os campos desejados:
   - `fullName` - Nome completo do funcionário
   - `displayName` - Nome para exibição nas páginas
   - `role` - Cargo completo
   - `esf` - Equipe ESF (`'sao-jose'`, `'catalao'`, `'bela-vista'`, ou `null` para serviços centrais)
   - `schedule` - Horários de atendimento
   - `active` - Status ativo/inativo
   - `contact` - Informações de contato (telefone, email)
5. Salve o arquivo

**Exemplo - Atualizar horário de um médico:**
```javascript
{
  id: 'medico-joao-sousa',
  fullName: 'João Alves de Sousa Junior',
  displayName: 'Dr. João',
  role: 'Médico Generalista - P.S.F.',
  esf: 'sao-jose',
  schedule: {
    morning: { start: '08h00', end: '12h00', display: '08h00 às 12h00', enabled: true },
    afternoon: { start: '14h00', end: '18h00', display: '14h00 às 18h00', enabled: true }
  },
  active: true
}
```

**Adicionar um novo funcionário:**

1. Localize o departamento correto
2. Adicione um novo objeto ao array `employees` do departamento
3. Gere um ID único seguindo o padrão: `{dept-code}-{firstname}-{lastname}` (kebab-case, lowercase, sem acentos)
4. Preencha todos os campos obrigatórios

**Exemplo - Adicionar novo enfermeiro:**
```javascript
{
  id: 'enfermeiro-maria-santos',
  fullName: 'Maria Santos Silva',
  displayName: 'Maria',
  role: 'Enfermeiro - P.S.F.',
  roleBase: 'Enfermeiro',
  isPsf: true,
  department: 'enfermeiro',
  esf: 'sao-jose',
  schedule: {
    morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
    afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
  },
  contact: { phone: null, email: null },
  firebaseUid: null,
  active: true,
  metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-29' }
}
```

**Desativar um funcionário:**

Não remova funcionários do arquivo. Em vez disso, marque como inativo:

```javascript
{
  id: 'medico-joao-sousa',
  // ... outros campos
  active: false, // Marca como inativo
  metadata: {
    createdAt: '2025-12-29',
    updatedAt: '2025-12-29',
    inactivatedAt: '2025-12-30' // Data de inativação
  }
}
```

## Como Usar nos Componentes

### Importar os dados

```javascript
import { contactInfo, openingHours, socialMedia } from '../config';
// ou
import { contactInfo } from '../config';
```

### Usar telefones

```javascript
// Telefone formatado para exibição
{contactInfo.phones.reception.display}

// Link tel:
<a href={`tel:${contactInfo.phones.reception.tel}`}>
  {contactInfo.phones.reception.display}
</a>

// Link WhatsApp
<a href={`https://wa.me/${contactInfo.phones.whatsapp.admin1.wa}`}>
  {contactInfo.phones.whatsapp.admin1.display}
</a>
```

### Usar endereços

```javascript
// Endereço completo
{contactInfo.address.main.street}
{contactInfo.address.main.neighborhood}
{contactInfo.address.main.city} - {contactInfo.address.main.state}

// Link do Google Maps
<a href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.address.main.mapsQuery}`}>
  Ver no mapa
</a>
```

### Usar horários

```javascript
// Horário formatado
{openingHours.reception.weekdays}
{openingHours.reception.saudeNaHora}

// Horário completo
{openingHours.reception.full}
```

### Usar redes sociais

```javascript
// Link do Instagram
<a href={socialMedia.esfCatalao.instagram.url}>
  {socialMedia.esfCatalao.instagram.handle}
</a>
```

### Usar dados de funcionários

```javascript
import { employees, getEmployeesByEsf, getEmployeeById, getDepartmentEmployees } from '../config';

// Buscar funcionários de uma ESF específica
const saoJoseEmployees = getEmployeesByEsf('sao-jose');

// Buscar funcionário por ID
const drJoao = getEmployeeById('medico-joao-sousa');
console.log(drJoao.displayName); // "Dr. João"

// Listar todos os médicos de um departamento
const medicos = getDepartmentEmployees('medicoGeneralistaPsf');

// Filtrar funcionários ativos de uma ESF
const activeDoctors = getEmployeesByEsf('catalao').filter(emp => emp.active);

// Exibir nome e horário
{drJoao.displayName} - {drJoao.schedule.morning.display}

// Renderizar lista de médicos em uma tabela
{medicos.map(medico => (
  <tr key={medico.id}>
    <td>{medico.displayName}</td>
    <td>ESF {medico.esf === 'sao-jose' ? 'São José' :
             medico.esf === 'catalao' ? 'Catalão' : 'Bela Vista'}</td>
  </tr>
))}
```

**Helper Functions Disponíveis:**

- `getDepartmentEmployees(departmentCode)` - Retorna todos os funcionários de um departamento
- `getEmployeeById(employeeId)` - Busca um funcionário específico pelo ID
- `getEmployeesByEsf(esfCode)` - Retorna funcionários de uma ESF ('sao-jose', 'catalao', 'bela-vista')
- `getEmployeesByRole(role)` - Retorna funcionários com um cargo específico
- `getAllEmployees()` - Retorna todos os funcionários
- `getActiveEmployees()` - Retorna apenas funcionários ativos
- `departments` - Array com lista de todos os departamentos

## Dados Centralizados

### Telefones
- Recepção: (37) 3229-6080
- Farmácia: (37) 3229-6081
- Consultório Odontológico: (37) 3229-6082
- WhatsApp Administrativo: (37) 99177-0200, (37) 99152-0024
- WhatsApp REMSA: (37) 98415-8457
- Unidades de Referência (Profilaxia Raiva):
  - Central de Imunização: (37) 3229-6831, 6832, 6833
  - ESF Afonso Pena: (37) 3229-6880, 6879
  - ESF Niterói: (37) 3229-6010, 6012
  - ESF Planalto: (37) 3229-6031, 6032, 6033
  - ESF Morada Nova: (37) 3229-6086
  - Prevenção HIV: (37) 3229-6890

### Emails
- Geral: staff.sj21@gmail.com

### Endereço Principal
- Rua Júlio Nogueira, 1320
- Bairro São José
- Divinópolis - MG
- CEP: 35501-170

### Horários Principais
- Recepção: Segunda a Sexta: 07:00 - 17:00 | Saúde na Hora: 17:00 - 22:00
- Administrativo: 07:00 às 12:00 | 13:00 às 16:30
- Consultório Odontológico: 07:00 às 12:00 | 13:00 às 17:00
- Farmácia: 07:30 às 16:00
- Vacinas: Manhã 07h00 às 11h00 | Tarde 13h00 às 17h00 | Saúde na Hora 17h00 às 22h00

### Redes Sociais
- ESF Catalão: @esfcatalao
- REMSA: @remsasaojose
- Prefeitura de Divinópolis: Instagram, Facebook, YouTube
- SEMUSA: Instagram

### Funcionários

**Total:** 48 funcionários organizados em 14 departamentos

**Departamentos:**
1. Agente Comunitário de Saúde (6)
2. Assistente Social (2)
3. Atendente de Consultório Dentário - P.S.F. (2)
4. Auxiliar de Enfermagem (2)
5. Auxiliar de Serviços I (1)
6. Auxiliar de Serviços II (2)
7. Dentista (3)
8. Enfermeiro (4)
9. Farmacêutico (4)
10. Fisioterapeuta (1)
11. Médico Ginecologista (1)
12. Médico Generalista - P.S.F. (4)
13. Médico Pediatra (2)
14. Psicólogo (1)
15. Técnico de Enfermagem (15)
16. Técnico de Higiene Dental (2)

**Equipes ESF:**
- ESF São José: Dr. João (Médico), Fabíola (Enfermeiro), 2 ACS, 4 Técnicos de Enfermagem
- ESF Catalão: Dr. Frederico (Médico), Aline Macedo (Enfermeiro), 2 Dentistas PSF, 2 ACS, 3 Técnicos de Enfermagem, 2 THD
- ESF Bela Vista: Dr. Gustavo (Médico), Naiara (Enfermeiro), 2 ACS, 3 Técnicos de Enfermagem

**Serviços Centrais:**
- Farmácia: 4 farmacêuticos (Horário: 07h30 às 16h00)
- Psicologia: Sandra
- Assistência Social: Luciana, Noelia
- Pediatria: Dr. Antônio Fernando Bolina, Dra. Jéssica
- Ginecologia: Dra. Luana
- Fisioterapia: Luana

### Configuração do VLibras (`vlibras.js` e `index.html`)

Para alterar o avatar do VLibras Widget:

1. **Opção 1 - Via `index.html` (Recomendado):**
   - Abra o arquivo `react-app/index.html`
   - Localize a linha com `avatar: 'icaro'`
   - Altere para `'hosana'` ou `'guga'` conforme necessário
   - Salve o arquivo

2. **Opção 2 - Via arquivo de configuração:**
   - Abra o arquivo `src/config/vlibras.js`
   - Altere o valor de `avatar` no objeto `vlibrasConfig`
   - Atualize também o `index.html` para usar essa configuração

**Avatares disponíveis:**
- `'icaro'` - Avatar Ícaro (padrão)
- `'hosana'` - Avatar Hosana
- `'guga'` - Avatar Guga

**Exemplo no `index.html`:**
```javascript
const vlibrasConfig = {
  avatar: 'hosana', // Altere aqui: 'icaro', 'hosana' ou 'guga'
  opacity: 0.7,
  position: 'right'
};
```

**Nota:** O VLibras Widget pode não suportar diretamente a configuração de avatar no construtor. Se a configuração acima não funcionar, verifique a documentação oficial do VLibras ou use métodos da API após a inicialização.

## Notas Importantes

1. **Não edite dados hardcoded nas páginas** - Sempre use os arquivos de configuração
2. **Mantenha consistência** - Use os mesmos formatos em todos os lugares
3. **Teste após alterações** - Verifique se as alterações aparecem corretamente em todas as páginas
4. **Formato de telefones** - Sempre inclua o código de área e formate corretamente
5. **Links do Google Maps** - Use o formato `mapsQuery` para garantir compatibilidade
6. **VLibras Widget** - O avatar pode ser alterado diretamente no `index.html`

## Benefícios

- ✅ Fácil manutenção - Atualize em um único lugar
- ✅ Consistência - Dados sempre sincronizados
- ✅ Menos erros - Reduz chance de inconsistências
- ✅ Melhor organização - Dados centralizados e documentados

