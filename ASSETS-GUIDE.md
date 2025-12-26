# 📸 Guia de Criação de Assets

**Guia completo para criar GIFs e screenshots profissionais para o README do PSF São José Web**

---

## 📑 Índice

- [Por que os Assets são Importantes](#-por-que-os-assets-são-importantes)
- [Lista Completa de Assets](#-lista-completa-de-assets)
- [Ferramentas Recomendadas](#-ferramentas-recomendadas)
- [Preparação do Ambiente](#-preparação-do-ambiente)
- [Criando GIFs](#-criando-gifs)
- [Criando Screenshots](#-criando-screenshots)
- [Otimização](#-otimização)
- [Organização dos Arquivos](#-organização-dos-arquivos)
- [Adicionando ao README](#-adicionando-ao-readme)
- [Checklist Final](#-checklist-final)

---

## 🎯 Por que os Assets são Importantes

Assets visuais (GIFs e screenshots) são **essenciais** para um README profissional porque:

- ✅ **Demonstram visualmente** como o sistema funciona
- ✅ **Aumentam o engajamento** de quem visita o repositório
- ✅ **Facilitam a compreensão** das funcionalidades
- ✅ **Transmitem profissionalismo** e cuidado com a documentação
- ✅ **Reduzem perguntas** básicas de usuários
- ✅ **Tornam o projeto mais atrativo** para colaboradores

Um projeto com bons assets pode ter **até 3x mais estrelas** no GitHub!

---

## 📋 Lista Completa de Assets

### GIFs Animados (5 unidades)

| # | Nome do Arquivo | Descrição | Dimensões | FPS | Tamanho Máx |
|---|----------------|-----------|-----------|-----|-------------|
| 1 | `demo.gif` | Tour completo pela homepage pública | 800x600px | 30 | 5MB |
| 2 | `campanhas.gif` | CRUD de campanhas (criar, editar, deletar) | 800x600px | 30 | 5MB |
| 3 | `usuarios.gif` | Gestão de usuários no painel admin | 800x600px | 30 | 5MB |
| 4 | `publico.gif` | Navegação por serviços e equipes | 800x600px | 30 | 5MB |
| 5 | `chatbot.gif` | Interação com o assistente IA | 800x600px | 30 | 5MB |

### Screenshots Estáticos (8+ unidades)

| # | Nome do Arquivo | Descrição | Resolução |
|---|----------------|-----------|-----------|
| 1 | `dashboard.png` | Dashboard administrativo | 1920x1080px |
| 2 | `campanhas-lista.png` | Lista de campanhas | 1920x1080px |
| 4 | `homepage.png` | Página inicial pública | 1920x1080px |
| 5 | `mobile-home.png` | Homepage em mobile | 375x667px |
| 6 | `mobile-campanha.png` | Detalhe de campanha em mobile | 375x667px |
| 7 | `mobile-servicos.png` | Lista de serviços em mobile | 375x667px |
| 8 | `chatbot.png` | Interface do chatbot | 1920x1080px |

**Total**: 5 GIFs + 8 screenshots = **13 assets**

---

## 🛠️ Ferramentas Recomendadas

### Para GIFs (Windows)

#### 1. **ScreenToGif** ⭐ Recomendado

- **Link**: https://www.screentogif.com/
- **Preço**: Grátis e Open Source
- **Vantagens**:
  - Interface simples em português
  - Editor integrado (cortar, redimensionar, adicionar textos)
  - Controle preciso de FPS
  - Otimização automática
  - Preview antes de salvar

**Como instalar:**
```bash
# Via winget
winget install NickeManarin.ScreenToGif

# Ou baixe direto: https://github.com/NickeManarin/ScreenToGif/releases
```

#### 2. **ShareX** (alternativa)

- **Link**: https://getsharex.com/
- **Preço**: Grátis
- **Vantagens**: Muitas opções de captura, integração com nuvem

#### 3. **LICEcap** (cross-platform)

- **Link**: https://www.cockos.com/licecap/
- **Preço**: Grátis
- **Vantagens**: Muito leve, multiplataforma

### Para GIFs (Mac)

#### 1. **Kap** ⭐ Recomendado

- **Link**: https://getkap.co/
- **Preço**: Grátis e Open Source
- **Vantagens**: Interface nativa do macOS, plugins

#### 2. **Gifox**

- **Link**: https://gifox.app/
- **Preço**: $4.99
- **Vantagens**: Qualidade superior, controles avançados

### Para Screenshots (Todas as Plataformas)

#### Windows
- **Ferramenta nativa**: Windows + Shift + S (Snipping Tool)
- **ShareX**: Captura com anotações
- **Lightshot**: https://app.prnt.sc/

#### Mac
- **Cmd + Shift + 4**: Screenshot de área
- **Cmd + Shift + 5**: Controles avançados

#### Linux
- **Flameshot**: https://flameshot.org/
- **Shutter**: Captura com edição

### Para Edição de Imagens

- **GIMP** (grátis): https://www.gimp.org/
- **Paint.NET** (Windows, grátis): https://www.getpaint.net/
- **Photopea** (online, grátis): https://www.photopea.com/

### Para Otimização

- **TinyPNG** (online): https://tinypng.com/ - Comprime PNG e JPG
- **Ezgif** (online): https://ezgif.com/ - Otimiza GIFs
- **ImageOptim** (Mac): https://imageoptim.com/

---

## 🎬 Preparação do Ambiente

Antes de começar a gravar, prepare o ambiente para ter resultados profissionais:

### 1. Configure o Navegador

```bash
# Abra o navegador em modo anônimo (sem extensões)
# Chrome: Ctrl + Shift + N
# Firefox: Ctrl + Shift + P
```

### 2. Resolução de Tela

Para GIFs e screenshots de desktop:
- **Recomendado**: 1920x1080 (Full HD)
- **Mínimo**: 1366x768

Para mobile:
- Use DevTools do Chrome (F12 → Toggle device toolbar)
- Selecione "iPhone SE" (375x667) ou "iPhone 12 Pro" (390x844)

### 3. Prepare Dados de Teste

Certifique-se de ter:
- ✅ Pelo menos 3-5 campanhas criadas
- ✅ 2-3 usuários de teste
- ✅ Alguns avisos publicados
- ✅ Imagens de teste de boa qualidade

### 4. Limpe a Interface

- ❌ Remova notificações do navegador
- ❌ Feche abas desnecessárias
- ❌ Desative extensões que aparecem na barra
- ✅ Use um tema limpo (claro ou escuro consistente)

### 5. Teste o Fluxo

Antes de gravar, pratique o fluxo 2-3 vezes para:
- ⚡ Movimentos suaves do mouse
- ⚡ Velocidade consistente
- ⚡ Evitar erros durante a gravação

---

## 🎥 Criando GIFs

### GIF 1: `demo.gif` - Tour da Homepage

**Objetivo**: Mostrar a homepage pública com busca, avisos e campanhas

**Roteiro** (20-30 segundos):
1. Comece na homepage (scroll no topo)
2. Mostre a busca funcionando (digite "vacina" e veja resultados)
3. Scroll suave pelos avisos
4. Navegue pelo carousel de campanhas
5. Clique em uma campanha para ver detalhes
6. Volte para a home

**Configurações ScreenToGif**:
- FPS: 30
- Qualidade: Alta
- Área de captura: 800x600px (centralizar na janela do navegador)

**Passos**:
1. Abra ScreenToGif → **Recorder**
2. Posicione a área de captura sobre o navegador
3. Clique em **Record** (F7)
4. Execute o roteiro com calma
5. Clique em **Stop** (F8)
6. No editor:
   - **Playback** → Ajuste velocidade se necessário
   - **Image** → **Resize** → 800x600
   - **File** → **Save as** → `demo.gif`
   - **Optimize**: Marque "Lossy GIF" e ajuste qualidade para ~80

---

### GIF 2: `campanhas.gif` - CRUD de Campanhas

**Objetivo**: Demonstrar criação, edição e exclusão de campanha

**Roteiro** (25-35 segundos):
1. Painel admin → Campanhas
2. Clique em "Nova Campanha"
3. Preencha rapidamente os campos (título, descrição, data)
4. Upload de uma imagem
5. Salve a campanha
6. Veja a campanha criada na lista
7. Clique em "Editar"
8. Altere o título
9. Salve novamente
10. Mostre o botão de deletar (não precisa deletar de verdade)

**Dica**: Use dados pré-preparados para copiar/colar e acelerar o preenchimento

---

### GIF 3: `usuarios.gif` - Gestão de Usuários

**Objetivo**: Mostrar criação e gestão de usuários

**Roteiro** (20-25 segundos):
1. Painel admin → Usuários
2. Mostre a lista de usuários existentes
3. Clique em "Novo Usuário"
4. Preencha email, nome, senha e role
5. Salve o usuário
6. Veja o usuário criado na lista
7. Toggle de ativar/desativar

---

### GIF 4: `publico.gif` - Navegação Pública

**Objetivo**: Mostrar a navegação pelos serviços e equipes

**Roteiro** (25-30 segundos):
1. Homepage → Menu de navegação
2. Clique em "Serviços"
3. Mostre a lista de 10 serviços
4. Clique em um serviço (ex: Vacinas)
5. Veja a página de detalhes
6. Volte e clique em "Equipe"
7. Mostre os perfis profissionais
8. Clique em um perfil (ex: Enfermeiras)

---

### GIF 5: `chatbot.gif` - Assistente IA

**Objetivo**: Demonstrar interação com o chatbot Gemini

**Roteiro** (20-25 segundos):
1. Painel admin → Chatbot/IA
2. Digite uma mensagem: "Crie uma campanha sobre vacinação infantil"
3. Aguarde a resposta da IA
4. Mostre a resposta formatada
5. Copie o texto gerado
6. (Opcional) Cole em uma nova campanha

**Nota**: Certifique-se de que a API do Gemini está configurada!

---

### Dicas Gerais para GIFs

✅ **DO**:
- Movimentos de mouse suaves e lentos
- Pausas de 1-2 segundos nas transições importantes
- FPS consistente (30 fps)
- Tamanho de arquivo < 5MB

❌ **DON'T**:
- Movimentos rápidos e erráticos
- Gravações muito longas (max 35 segundos)
- Muitos erros ou correções
- Textos muito pequenos para ler

---

## 📷 Criando Screenshots

### Screenshot 1: `dashboard.png`

**O que capturar**:
- Dashboard admin com estatísticas
- Mostre cards com números (total de campanhas, usuários, etc.)

**Passos**:
1. Faça login como admin
2. Acesse o dashboard principal
3. Certifique-se de que há dados para exibir
4. Pressione **Windows + Shift + S** (ou ferramenta escolhida)
5. Selecione a área da janela do navegador (sem barras do SO)
6. Salve como `dashboard.png`

---

### Screenshot 2: `campanhas-lista.png`

**O que capturar**:
- Lista de campanhas com filtros
- Pelo menos 3-5 campanhas visíveis
- Botões de ação (editar, deletar)

---

### Screenshot 3: `campanha-form.png`

**O que capturar**:
- Formulário de criação de campanha
- Todos os campos visíveis (pode precisar de scroll e capturar em 2 partes)
- Upload de imagem em progresso ou concluído

---

### Screenshot 4: `homepage.png`

**O que capturar**:
- Homepage pública completa
- Scroll completo (use extensão "Full Page Screenshot" ou faça scroll e una as imagens)
- Mostre busca, avisos, carousel de campanhas

**Dica para scroll completo**:
- Chrome: Use extensão "GoFullPage"
- Firefox: Clique com botão direito → "Tirar captura de tela" → "Salvar página inteira"

---

### Screenshot 5-7: Mobile Screenshots

**Como capturar**:
1. Abra DevTools (F12)
2. Toggle device toolbar (Ctrl + Shift + M)
3. Selecione dispositivo: **iPhone SE** (375x667)
4. Navegue para a página desejada
5. Clique com botão direito na página → "Capture screenshot"

**Páginas**:
- `mobile-home.png`: Homepage
- `mobile-campanha.png`: Detalhe de uma campanha
- `mobile-servicos.png`: Lista de serviços

---

### Screenshot 8: `chatbot.png`

**O que capturar**:
- Interface do chatbot com conversação
- Mensagem do usuário + resposta da IA visíveis

---

## 🎨 Otimização

### Otimizando GIFs

**Online - Ezgif.com**:
1. Acesse https://ezgif.com/optimize
2. Upload seu GIF
3. Configurações:
   - **Optimization method**: Lossy GIF
   - **Compression level**: 35-50
4. Clique em "Optimize GIF"
5. Compare: Original vs Otimizado
6. Download se a qualidade estiver boa

**Objetivo**: Reduzir de ~10MB para ~2-3MB sem perda visível de qualidade

---

### Otimizando PNGs

**Online - TinyPNG**:
1. Acesse https://tinypng.com/
2. Arraste seus PNGs (até 20 de uma vez)
3. Aguarde a compressão automática
4. Download dos arquivos comprimidos

**Redução típica**: 50-70% do tamanho original

---

### Redimensionamento

Se seus screenshots ficaram maiores que 1920x1080:

**ImageMagick (linha de comando)**:
```bash
# Instale: https://imagemagick.org/

# Redimensionar mantendo proporção
magick dashboard.png -resize 1920x1080 dashboard_resized.png

# Em lote
magick mogrify -resize 1920x1080 *.png
```

**Online - iLoveIMG**:
1. Acesse https://www.iloveimg.com/resize-image
2. Upload das imagens
3. Selecione dimensões: 1920x1080px
4. Download

---

## 📁 Organização dos Arquivos

### Estrutura de Pastas

Crie a pasta `screenshots/` na raiz do projeto:

```bash
cd C:\Users\Isa\Documents\psf-saojose-web
mkdir screenshots
```

### Estrutura Final

```
psf-saojose-web/
├── screenshots/
│   ├── demo.gif                  # 2-3 MB
│   ├── campanhas.gif             # 2-3 MB
│   ├── usuarios.gif              # 2-3 MB
│   ├── publico.gif               # 2-3 MB
│   ├── chatbot.gif               # 2-3 MB
│   ├── dashboard.png             # ~200-500 KB
│   ├── campanhas-lista.png       # ~200-500 KB
│   ├── campanha-form.png         # ~200-500 KB
│   ├── homepage.png              # ~300-800 KB
│   ├── mobile-home.png           # ~100-200 KB
│   ├── mobile-campanha.png       # ~100-200 KB
│   ├── mobile-servicos.png       # ~100-200 KB
│   └── chatbot.png               # ~200-500 KB
├── README.md
└── ASSETS-GUIDE.md
```

**Total estimado**: ~15-20 MB

---

## 📝 Adicionando ao README

### Passo 1: Commit dos Assets

```bash
git add screenshots/
git commit -m "docs: adiciona screenshots e GIFs demonstrativos"
git push origin main
```

### Passo 2: Atualizar o README

Edite o `README.md` e **descomente** as linhas dos assets:

**Exemplo - Linha 18 (Header)**:
```markdown
<!-- ANTES -->
<!-- <img src="screenshots/demo.gif" width="800px" alt="Demo do Sistema"/> -->

<!-- DEPOIS -->
<img src="screenshots/demo.gif" width="800px" alt="Demo do Sistema"/>
```

**Exemplo - Linha 95 (Funcionalidades - Campanhas)**:
```markdown
<!-- ANTES -->
<!-- <img src="screenshots/campanhas.gif" width="100%"/> -->

<!-- DEPOIS -->
<img src="screenshots/campanhas.gif" width="100%"/>
```

### Passo 3: Localizar Todos os Placeholders

Use busca no VS Code:
```
Ctrl + F → Pesquisar: <!-- <img src="screenshots/
```

Você encontrará ~13 ocorrências. Descomente todas.

### Passo 4: Testar Localmente

Visualize o README localmente:

**VS Code**:
1. Instale extensão "Markdown Preview Enhanced"
2. Abra README.md
3. Ctrl + K → V (preview)

**Online**:
1. Use https://dillinger.io/
2. Cole o conteúdo do README
3. Veja o preview

### Passo 5: Commit Final

```bash
git add README.md
git commit -m "docs: ativa exibição de screenshots e GIFs no README"
git push origin main
```

---

## ✅ Checklist Final

### Antes de Publicar

- [ ] Todos os 5 GIFs criados e otimizados (< 5MB cada)
- [ ] Todos os 8 screenshots criados e otimizados
- [ ] Assets organizados na pasta `screenshots/`
- [ ] GIFs testados (reproduzem corretamente)
- [ ] Screenshots em alta resolução mas otimizados
- [ ] README atualizado (placeholders descomentados)
- [ ] Preview do README validado (localmente ou online)
- [ ] Assets commitados no Git
- [ ] README atualizado commitado

### Validação de Qualidade

Para cada GIF, verifique:
- [ ] Duração: 20-35 segundos ✅
- [ ] FPS: 30 ✅
- [ ] Dimensões: 800x600px ✅
- [ ] Tamanho: < 5MB ✅
- [ ] Qualidade: Textos legíveis ✅
- [ ] Fluxo: Sem erros ou pausas longas ✅

Para cada screenshot, verifique:
- [ ] Resolução adequada (1920x1080 desktop, 375x667 mobile) ✅
- [ ] Formato: PNG ✅
- [ ] Otimizado (< 1MB) ✅
- [ ] Conteúdo relevante e claro ✅
- [ ] Sem informações sensíveis expostas ✅

---

## 🎓 Dicas Profissionais

### 1. Consistência Visual

- Use sempre o mesmo tema (claro ou escuro)
- Mesma resolução para todos os GIFs
- Mesma fonte e tamanho no navegador

### 2. Storytelling

- Cada GIF deve contar uma "história" completa
- Início claro → Desenvolvimento → Resultado
- Evite cortes abruptos

### 3. Performance

- GIFs grandes afetam o carregamento da página
- Priorize otimização sem perder qualidade
- Considere hospedar GIFs em serviço externo se > 5MB

### 4. Acessibilidade

- Adicione `alt` text descritivo em todas as imagens
- Forneça descrições textuais além das imagens

### 5. Atualização

- Quando o sistema mudar significativamente, atualize os assets
- Mantenha os assets sincronizados com a versão atual

---

## 🚀 Próximos Passos

Após concluir todos os assets:

1. ✅ Valide o README no GitHub (push e veja como fica renderizado)
2. ✅ Compartilhe o repositório em redes sociais
3. ✅ Adicione o link do repositório ao portfólio
4. ✅ Considere criar um vídeo demo de 2-3 minutos no YouTube

---

## 📞 Ajuda

Se tiver dúvidas:

- 📚 **Documentação ScreenToGif**: https://www.screentogif.com/help
- 📚 **Ezgif Tutorials**: https://ezgif.com/help
- 💬 **GitHub Markdown Guide**: https://guides.github.com/features/mastering-markdown/

---

**Boa sorte criando assets incríveis! 🎉**

*Lembre-se: Assets de qualidade fazem TODA a diferença em um README profissional.*
