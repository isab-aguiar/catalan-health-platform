# 🎨 Guia de Comandos para Refinamento de Campanhas

## 📋 Visão Geral

Após enviar uma imagem ou PDF, o sistema cria um **rascunho de campanha** que pode ser refinado através de comandos em linguagem natural.

---

## ✏️ **COMANDOS DISPONÍVEIS**

### 📝 **1. CONTEÚDO**

#### Título
```
"Mude o título para: Vacinação contra Dengue"
"Título: Campanha Nacional de Imunização"
"Altere o título para algo mais curto"
```

#### Descrição
```
"Encurte a descrição"
"Faça a descrição mais detalhada"
"Adicione que é gratuito para todos"
"Inclua na descrição: apresentar cartão SUS"
"Remova a parte sobre horários"
```

#### Subtítulo
```
"Adicione subtítulo: Proteja sua família"
"Subtítulo: Uma iniciativa do Ministério da Saúde"
```

---

### 📍 **2. LOCAL E HORÁRIO**

#### Local
```
"Local: ESF Catalão"
"Coloque que será na Sala de Vacinas"
"Local: Unidade Básica de Saúde - Rua Principal, 123"
"Adicione que é no posto central"
```

#### Horário
```
"Horário: 8h às 17h"
"Adicione horário de funcionamento: segunda a sexta, 7h às 19h"
"Horário: Das 8h às 12h e das 14h às 18h"
"Funciona de segunda a sexta"
```

---

### 📅 **3. DATAS E PERÍODO**

```
"De 15 a 20 de janeiro"
"Data: 10 de fevereiro de 2025"
"Válido até 31 de dezembro"
"Período: 01/03/2025 a 15/03/2025"
"Adicione que é somente na próxima semana"
```

---

### 👥 **4. PÚBLICO-ALVO**

```
"Público-alvo: gestantes"
"Para idosos acima de 60 anos"
"Público: crianças de 6 meses a 5 anos"
"Destinado a diabéticos e hipertensos"
"Para toda a população"
```

---

### ⚙️ **5. CONFIGURAÇÕES AVANÇADAS**

#### Urgência e Destaque
```
"Marcar como urgente"
"Remover urgência"
"Adicionar destaque"
"Destacar na homepage"
```

#### Categoria
```
"Mudar categoria para vacina"
"Categoria: material"
"Colocar como campanha educativa"
```

#### Página de Destino
```
"Exibir na página de vacinas"
"Mostrar em educação"
"Página destino: serviços"
"Colocar na homepage"
```

#### Botão CTA (Call-to-Action)
```
"Botão com texto: Agende Agora"
"CTA: Saiba Mais"
"Mudar botão para: Participe"
"Botão: Vacine-se Já"
```

---

### 📞 **6. CONTATO**

```
"Adicionar telefone (35) 3333-3333"
"Contato: telefone@esfcatalao.com.br"
"Incluir WhatsApp: (35) 99999-9999"
"Telefone para informações: (35) 3333-3333"
```

---

### 📋 **7. TÓPICOS E LISTAS**

```
"Adicionar tópico: Traga documento com foto"
"Incluir item na lista: Cartão de vacina obrigatório"
"Remover segundo tópico"
"Tópicos: documento, cartão SUS, comprovante de residência"
```

---

## 🎯 **EXEMPLOS PRÁTICOS**

### Exemplo 1: Campanha de Vacinação
```
Você: [Envia imagem de campanha de vacina]

IA: [Cria rascunho]

Você: "Mude o título para: Vacinação contra HPV - Proteja sua saúde"

IA: [Atualiza título]

Você: "Local: ESF Catalão - Sala de Vacinas"

IA: [Adiciona local]

Você: "Público-alvo: adolescentes de 9 a 14 anos"

IA: [Define público]

Você: "Adicione horário: segunda a sexta, 8h às 16h"

IA: [Adiciona horário]

Você: "Marcar como urgente e destacar na homepage"

IA: [Marca urgente e destaque]

Você: [Clica em "✅ Publicar Campanha"]
```

### Exemplo 2: Falta de Material
```
Você: "Mude categoria para material"
IA: [Atualiza categoria]

Você: "Título: Temporariamente sem seringas de 5ml"
IA: [Atualiza título]

Você: "Adicione que previsão de chegada é segunda-feira"
IA: [Atualiza descrição]

Você: "Não exibir na homepage"
IA: [Remove da homepage]

Você: "Página destino: serviços"
IA: [Define página]
```

### Exemplo 3: Palestra Educativa
```
Você: "Categoria: campanha"
Você: "Local: Auditório da ESF Catalão"
Você: "Data: 25 de janeiro de 2025"
Você: "Horário: 14h às 16h"
Você: "Público: população em geral"
Você: "Adicionar tópico: Inscrições gratuitas"
Você: "Botão: Inscreva-se Agora"
Você: "Página: educação"
```

---

## 💡 **DICAS PROFISSIONAIS**

### ✅ **BOM:**
```
"Local: ESF Catalão - Sala de Vacinas"
"Horário: 8h às 17h, segunda a sexta"
"Público-alvo: gestantes no primeiro trimestre"
"De 15 a 20 de janeiro de 2025"
```

### ❌ **EVITE:**
```
"Coloca lá o lugar" (muito vago)
"Bota umas horas aí" (impreciso)
"Muda tudo" (não específico)
"Faz ficar bonito" (subjetivo)
```

---

## 🔄 **MÚLTIPLOS COMANDOS**

Você pode refinar várias vezes antes de publicar:

```
1º: "Mude o título para: Campanha de Vacinação"
2º: "Local: ESF Catalão"
3º: "Adicione horário de funcionamento"
4º: "Marcar como urgente"
5º: "Botão: Vacine-se Agora"
[Publica quando estiver satisfeito]
```

---

## 📊 **CAMPOS DISPONÍVEIS**

| Campo | Tipo | Exemplo |
|-------|------|---------|
| **template** | Texto | vacinacao, material, educacao, evento, urgente, informativo |
| **titulo** | Texto (máx 80) | "Vacinação contra Dengue" |
| **subtitulo** | Texto | "Proteja sua família" |
| **descricao** | Texto (200-500) | Descrição completa da campanha |
| **categoria** | Opção | vacina, material, campanha |
| **urgente** | Sim/Não | true, false |
| **destaque** | Sim/Não | true, false |
| **dataInicio** | Data | 2025-01-15 |
| **dataFim** | Data | 2025-01-20 |
| **horario** | Texto | "8h às 17h" |
| **local** | Texto | "ESF Catalão - Sala 1" |
| **publicoAlvo** | Texto | "Gestantes" |
| **topicos** | Lista | ["item 1", "item 2"] |
| **contato** | Texto | "(35) 3333-3333" |
| **cta** | Texto | "Agende Agora" |
| **paginaDestino** | Opção | home, vacinas, servicos, educacao |
| **exibirNaHomepage** | Sim/Não | true, false |

---

## 🎨 **TEMPLATES DISPONÍVEIS**

1. **vacinacao**: Campanhas de vacinação
2. **material**: Avisos sobre materiais/medicamentos
3. **educacao**: Atividades educativas (palestras, workshops)
4. **evento**: Eventos e ações de saúde
5. **urgente**: Avisos urgentes ou emergenciais
6. **informativo**: Informações gerais

---

## 🚀 **FLUXO COMPLETO**

```
1. 📤 Enviar imagem/PDF
2. 🤖 IA analisa e cria rascunho
3. 👁️ Visualizar preview com todos os campos
4. ✏️ Refinar com comandos em linguagem natural
5. 🔄 Repetir refinamentos quantas vezes quiser
6. ✅ Publicar campanha quando estiver satisfeito
7. 🎉 Campanha vai para homepage/página específica
```

---

## 📱 **ATALHOS RÁPIDOS**

| Objetivo | Comando |
|----------|---------|
| Urgente | "marcar como urgente" |
| Destacar | "adicionar destaque" |
| Homepage | "exibir na homepage" |
| Local | "local: ESF Catalão" |
| Horário | "horário: 8h às 17h" |
| Público | "público: gestantes" |
| Telefone | "contato: (35) 3333-3333" |
| Botão | "botão: Agende Agora" |

---

## ✅ **CHECKLIST ANTES DE PUBLICAR**

- [ ] Título claro e objetivo
- [ ] Descrição completa e profissional
- [ ] Local definido (se aplicável)
- [ ] Horário especificado (se aplicável)
- [ ] Público-alvo identificado
- [ ] Datas corretas (se aplicável)
- [ ] Contato incluído (se necessário)
- [ ] Categoria apropriada
- [ ] Página de destino correta
- [ ] Urgência/destaque definidos

---

**Pronto! Agora você pode criar campanhas profissionais com total controle! 🎯**

