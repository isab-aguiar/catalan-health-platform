# Plano de Migração: Escalas para Firestore

## Objetivo

Migrar todas as páginas de serviços e equipe de tabelas hardcoded para componentes baseados em Firestore, com suporte a escalas semanais e lógica inteligente de agrupamento de dias.

## Requisito Especial

**Profissionais que atendem em TODOS os dias (segunda a sexta) devem mostrar "Segunda a Sexta" ao invés de listar cada dia separadamente.**

## 1. Correção Imediata - Sala9/Administrativo

### Problema
A página Sala9 usa `escalaKey="sala-administrativa"` mas a escala no Firestore está cadastrada como "Administrativo".

### Solução
Renomear a categoria/escala no painel admin:
1. Acessar `/admin/escalas`
2. Localizar a escala com categoria "Administrativo" (provavelmente nome "Sala Administrativa" ou similar)
3. Editar e confirmar que o ID da escala seja `sala-administrativa`
4. Se necessário, recriar a escala com o nome correto

### Verificação
- Verificar se existe escala com ID `sala-administrativa` no Firestore
- Se não existir, criar nova escala:
  - Nome: "Sala Administrativa"
  - ID gerado: `sala-administrativa` (gerado automaticamente ou manualmente)

---

## 2. Atualização do Componente EscalaFirestore

### Objetivo
Adicionar lógica para agrupar profissionais que atendem todos os dias como "Segunda a Sexta".

### Localização
`react-app/src/components/services/EscalaFirestore.jsx`

### Mudanças Necessárias

Quando `escalaSemanal.habilitado === true`, para cada profissional:

1. **Verificar se está presente em todos os 5 dias:**
   - segunda, terça, quarta, quinta, sexta

2. **Se estiver em todos os dias:**
   - Agrupar e mostrar como "Segunda a Sexta"
   - Não mostrar dias individuais

3. **Se estiver em alguns dias (não todos):**
   - Mostrar os dias específicos separadamente
   - Ex: "Segunda-feira", "Quarta-feira"

### Lógica de Implementação

```javascript
// Pseudocódigo
function agruparProfissionaisPorDias(escala) {
  const diasAtivos = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
  
  // Coletar todos os profissionais únicos
  const todosProfissionais = new Map();
  
  diasAtivos.forEach(dia => {
    const profs = escala.escalaSemanal.dias[dia]?.profissionais || [];
    profs.forEach(prof => {
      const key = `${prof.id || prof.nome}_${prof.turno}`;
      if (!todosProfissionais.has(key)) {
        todosProfissionais.set(key, {
          ...prof,
          dias: new Set()
        });
      }
      todosProfissionais.get(key).dias.add(dia);
    });
  });
  
  // Agrupar
  const resultado = {
    todosOsDias: [], // Profissionais em segunda a sexta
    diasEspecificos: {} // Profissionais por dia específico
  };
  
  todosProfissionais.forEach((prof, key) => {
    if (prof.dias.size === 5) {
      // Está em todos os dias
      resultado.todosOsDias.push(prof);
    } else {
      // Está em dias específicos
      prof.dias.forEach(dia => {
        if (!resultado.diasEspecificos[dia]) {
          resultado.diasEspecificos[dia] = [];
        }
        resultado.diasEspecificos[dia].push(prof);
      });
    }
  });
  
  return resultado;
}
```

### Estrutura de Exibição

```
[Horários de Funcionamento]

=== SEGUNDA A SEXTA ===
Profissional 1 | Cargo | Horário
Profissional 2 | Cargo | Horário

=== SEGUNDA-FEIRA ===
Profissional 3 | Cargo | Horário

=== QUARTA-FEIRA ===
Profissional 3 | Cargo | Horário
```

---

## 3. Padrão de Migração

### Componente a Usar

**Usar `EscalaFirestore` para todas as páginas:**
- Componente genérico que suporta ambos os modos (normal e semanal)
- Detecta automaticamente se a escala está em modo semanal
- Aplica a lógica de agrupamento automaticamente

**Não usar `EscalaSemanal` diretamente:**
- Componente específico demais
- `EscalaFirestore` já tem a lógica necessária

### Como Determinar o `escalaKey`

O `escalaKey` é gerado automaticamente a partir do nome da escala:

```javascript
nome.toLowerCase()
  .replace(/\s+/g, '-')
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
```

**Mapeamento de Páginas para escalaKey:**

#### Páginas de Serviços
- `BolsaFamilia.jsx` → `escalaKey="bolsa-familia"`
- `Curativos.jsx` → `escalaKey="sala-curativos"`
- `ECG.jsx` → `escalaKey="ecg"`
- `FarmaciaDispensacao.jsx` → `escalaKey="farmacia"`
- `PrevencaoHIV.jsx` → `escalaKey="prevencao-hiv"` (ou criar escala específica)
- `Renovacao.jsx` → `escalaKey="renovacao-receitas"`
- `Sala4.jsx` → `escalaKey="sala-agendamentos"`
- `Triagem.jsx` → `escalaKey="triagem"`
- `Vacinas.jsx` → `escalaKey="sala-vacinacao"`
- `Procedimentos.jsx` → `escalaKey="sala-procedimentos"` (já migrado)

#### Páginas de Equipe
- `Dentistas.jsx` → `escalaKey="sala-atendimento-odontologico"`
- `Enfermeiras.jsx` → `escalaKey="sala-atendimento-enfermagem"`
- `Farmaceutica.jsx` → `escalaKey="farmacia"` (ou criar "consultorio-farmaceutico")
- `Fisioterapeuta.jsx` → `escalaKey="consultorio-fisioterapia"` (ou criar)
- `Ginecologista.jsx` → `escalaKey="sala-atendimento-ginecologico"`
- `Medicos.jsx` → `escalaKey="sala-atendimento-medico"`
- `Pediatra.jsx` → `escalaKey="consultorio-pediatrico"`
- `Psicologa.jsx` → `escalaKey="consultorio-psicologico"`

---

## 4. Passos de Migração para Cada Página

### Template de Migração

**ANTES (Hardcoded):**
```jsx
<InfoBox title="Profissionais e Horários de Atendimento">
  <table>
    {/* Tabela hardcoded */}
  </table>
</InfoBox>
```

**DEPOIS (Firestore):**
```jsx
import EscalaFirestore from "../../components/services/EscalaFirestore";

<EscalaFirestore
  titulo="Profissionais Escalados"
  escalaKey="sala-curativos"
/>
```

### Passos Detalhados

1. **Importar o componente:**
   ```jsx
   import EscalaFirestore from "../../components/services/EscalaFirestore";
   ```

2. **Localizar a seção de horários/profissionais:**
   - Geralmente dentro de `<InfoBox title="Profissionais e Horários">`
   - Pode ter tabelas (desktop) e cards (mobile)

3. **Substituir o conteúdo:**
   - Remover toda a estrutura de tabela/cards hardcoded
   - Adicionar o componente `<EscalaFirestore>`

4. **Verificar imports:**
   - Remover imports não utilizados (se houver)
   - Manter estrutura do resto da página

---

## 5. Configuração de Dados no Firestore

### Escalas que Precisam ser Criadas/Configuradas

#### Já Existentes (verificar no admin)
- sala-procedimentos ✅
- sala-agendamentos ✅
- triagem ✅
- sala-vacinacao ✅
- renovacao-receitas ✅
- sala-curativos ✅
- sala-atendimento-medico ✅
- farmacia ✅
- ecg ✅
- sala-atendimento-ginecologico ✅
- consultorio-psicologico ✅
- sala-atendimento-odontologico ✅
- sala-atendimento-enfermagem ✅
- consultorio-pediatrico ✅
- sala-administrativa ✅ (renomear de "Administrativo")
- recepcao ✅

#### Novas Escalas a Criar (se necessário)
- bolsa-familia (Nome: "Bolsa Família")
- prevencao-hiv (Nome: "Prevenção Combinada ao HIV")
- consultorio-farmaceutico (Nome: "Consultório Farmacêutico") - se diferente de farmacia
- consultorio-fisioterapia (Nome: "Consultório de Fisioterapia")

### Configuração no Painel Admin

Para cada escala:

1. **Criar/Editar escala:**
   - Nome: Nome completo (ex: "Sala de Curativos")
   - Categoria: Enfermagem, Médico, Administrativo, etc.
   - Descrição: (opcional)
   - Exibir no público: ✅ Sim

2. **Configurar Horários:**
   - Manhã: Ativo/Inativo + Display (ex: "07h00 às 11h00")
   - Tarde: Ativo/Inativo + Display
   - Saúde na Hora: Ativo/Inativo + Display

3. **Habilitar Escala Semanal:**
   - ✅ Marcar checkbox "Escala por dias da semana"

4. **Adicionar Profissionais por Dia:**
   - Para cada dia (Segunda a Sexta):
     - ✅ Marcar checkbox do dia
     - Adicionar profissionais usando autocomplete
     - Selecionar turno para cada profissional

5. **Salvar:**
   - O ID será gerado automaticamente a partir do nome

### Convenção de Nomes

- Use nomes descritivos e completos
- O sistema gerará o ID automaticamente
- IDs devem corresponder aos `escalaKey` usados nas páginas
- Se o ID gerado não corresponder, ajustar o nome ou criar manualmente

---

## 6. Ordem de Implementação

### Fase 1: Preparação (Prioridade Alta)
1. ✅ Atualizar componente `EscalaFirestore` com lógica de agrupamento
2. ✅ Testar lógica de agrupamento com escala existente
3. ✅ Renomear "Administrativo" para "Sala Administrativa" no admin
4. ✅ Verificar/criar todas as escalas necessárias no Firestore

### Fase 2: Migração de Serviços (Prioridade Alta)
5. BolsaFamilia.jsx
6. Curativos.jsx
7. ECG.jsx
8. FarmaciaDispensacao.jsx
9. PrevencaoHIV.jsx
10. Renovacao.jsx
11. Sala4.jsx
12. Triagem.jsx
13. Vacinas.jsx

### Fase 3: Migração de Equipe (Prioridade Média)
14. Dentistas.jsx
15. Enfermeiras.jsx
16. Farmaceutica.jsx
17. Fisioterapeuta.jsx
18. Ginecologista.jsx
19. Medicos.jsx
20. Pediatra.jsx
21. Psicologa.jsx

### Fase 4: Validação (Prioridade Alta)
22. Testar todas as páginas migradas
23. Verificar exibição correta de "Segunda a Sexta" vs dias específicos
24. Validar responsividade (mobile/desktop)
25. Confirmar que dados estão sendo carregados do Firestore

---

## 7. Estratégia de Testes

### Teste por Página

Para cada página migrada:

1. **Verificar carregamento:**
   - A escala carrega sem erros?
   - Mostra estado de loading?
   - Trata erro adequadamente?

2. **Verificar exibição:**
   - Profissionais aparecem corretamente?
   - Horários estão corretos?
   - Se profissional está em todos os dias: mostra "Segunda a Sexta"?
   - Se profissional está em dias específicos: mostra dias individuais?

3. **Verificar responsividade:**
   - Desktop: Tabela exibida corretamente?
   - Mobile: Cards exibidos corretamente?
   - Layout não quebra em diferentes tamanhos?

4. **Verificar dados:**
   - Profissionais corretos?
   - Cargos/funções corretas?
   - Turnos corretos?

### Teste de Agrupamento

Criar escala de teste com:
- Profissional A: segunda, terça, quarta, quinta, sexta
- Profissional B: segunda, quarta
- Profissional C: terça, quinta

Resultado esperado:
- Profissional A: Mostrar em "Segunda a Sexta"
- Profissional B: Mostrar em "Segunda-feira" e "Quarta-feira" separadamente
- Profissional C: Mostrar em "Terça-feira" e "Quinta-feira" separadamente

---

## 8. Checklist de Migração

Para cada página:

- [ ] Importado componente `EscalaFirestore`
- [ ] Removida tabela/cards hardcoded
- [ ] Adicionado componente com `escalaKey` correto
- [ ] Escala existe no Firestore com ID correto
- [ ] Escala configurada com escala semanal habilitada
- [ ] Profissionais adicionados aos dias corretos
- [ ] Testado em desktop
- [ ] Testado em mobile
- [ ] Verificado agrupamento de dias (se aplicável)
- [ ] Removidos imports não utilizados

---

## 9. Notas Importantes

### Sobre o Agrupamento

- **Profissionais que atendem todos os dias:** Sempre agrupar como "Segunda a Sexta"
- **Profissionais que atendem em alguns dias:** Mostrar dias individuais
- **Turnos diferentes:** Considerar por turno (ex: mesma pessoa em manhã todos os dias = agrupar; mesma pessoa em manhã segunda/quarta e tarde terça/quinta = separar)

### Sobre IDs

- IDs são gerados automaticamente a partir do nome
- Se necessário, pode ser criado manualmente no admin
- IDs devem ser consistentes entre Firestore e código

### Sobre Modo Semanal

- TODAS as escalas devem usar modo semanal (escala por dias)
- Componente `EscalaFirestore` detecta automaticamente
- Lógica de agrupamento só aplica em modo semanal

---

## 10. Referências

### Componentes
- `react-app/src/components/services/EscalaFirestore.jsx` - Componente principal
- `react-app/src/components/services/EscalaSemanal.jsx` - Componente específico (não usar diretamente)

### Serviços
- `react-app/src/services/escalasService.js` - Função `getEscalaAtiva(escalaKey)`

### Exemplos de Uso
- `react-app/src/pages/services/Procedimentos.jsx` - Já migrado
- `react-app/src/pages/services/Sala9.jsx` - Já migrado
- `react-app/src/pages/services/Recepcao.jsx` - Usa EscalaSemanal

---

**Última atualização:** 2025-12-31
**Status:** Plano criado, aguardando implementação

