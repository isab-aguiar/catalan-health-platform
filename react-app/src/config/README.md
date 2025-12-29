# Configuração Centralizada de Dados

Este diretório contém todos os dados de configuração centralizados do projeto, facilitando a manutenção e atualização de informações como telefones, endereços, horários e redes sociais.

## Estrutura de Arquivos

- `contact.js` - Informações de contato (telefones, emails, endereços)
- `schedule.js` - Horários de funcionamento e atendimento
- `socialMedia.js` - Links de redes sociais
- `vlibras.js` - Configuração do widget VLibras (acessibilidade em Libras)
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

