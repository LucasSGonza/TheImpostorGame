# 🎭 O Impostor - Documentação

> 🚧 Projeto em construção

## 📖 Sobre o Jogo

**O Impostor** é um jogo social de dedução e blefe onde os jogadores devem descobrir quem entre eles é o impostor. O jogo estimula a comunicação, observação e raciocínio lógico dos participantes.

## 🎮 Como Jogar

### Requisitos Básicos
- **Mínimo de 3 jogadores**
- Um dispositivo compartilhado para todos os jogadores
- Rodadas de conversação (mínimo 3 rodadas recomendadas)

### Preparação do Jogo

1. **Escolha um Tema**: Selecione um tema dentre os cadastrados (ex: Esportes, Filmes, Países)
2. **Defina os Jogadores**: Informe quantos jogadores participarão e seus nomes
3. **Selecione o Modo de Jogo**:
   - **Impostor sem palavra**: O impostor não recebe nenhuma palavra
   - **Impostor com palavra diferente**: O impostor recebe uma palavra diferente do mesmo tema

### Mecânica do Jogo

1. **Distribuição das Palavras**:
   - Todos os jogadores normais recebem a **mesma palavra**
   - O impostor recebe **nenhuma palavra** OU uma **palavra diferente** (conforme modo escolhido)
   - Um impostor é selecionado **aleatoriamente** pelo sistema

2. **Visualização Individual**:
   - Cada jogador, em sua vez, clica em "Mostrar Minha Palavra"
   - **IMPORTANTE**: Apenas o jogador da vez deve ver a tela
   - Após visualizar, passa para o próximo jogador

3. **Rodadas de Conversação**:
   - Após todos verem suas palavras, iniciam-se as rodadas
   - Em cada rodada, cada jogador deve falar **uma palavra** relacionada ao que recebeu
   - **Objetivo dos Jogadores Normais**: Descobrir quem é o impostor através das pistas
   - **Objetivo do Impostor**: Tentar descobrir qual é a palavra e dar pistas convincentes para não ser descoberto

4. **Votação**:
   - Após no mínimo 3 rodadas de conversação
   - Os jogadores votam em quem acreditam ser o impostor
   - Se acertarem, os jogadores normais vencem
   - Se errarem, o impostor vence

## 💡 Estratégias

### Para Jogadores Normais
- Dê pistas específicas, mas não óbvias demais
- Observe quem dá respostas vagas ou genéricas
- Preste atenção em contradições
- Faça perguntas sutis durante as rodadas

### Para o Impostor
- Ouça atentamente as pistas dos outros
- Dê respostas genéricas que possam se encaixar em vários contextos
- Tente deduzir a palavra a partir das pistas
- Evite ser muito vago ou muito específico

## 🛠️ Funcionalidades do Projeto

### 1. Gerenciamento de Temas

#### Criar Tema
- Acesse "Gerenciar Temas" no menu principal
- Clique em "Novo Tema"
- Insira o nome do tema (ex: "Animais")
- Adicione palavras separadas por vírgula (ex: "Cachorro, Gato, Elefante, Leão")
- Mínimo de 2 palavras por tema

#### Editar Tema
- Na lista de temas, clique no ícone de edição (✎)
- Modifique o nome ou as palavras
- Salve as alterações

#### Excluir Tema
- Na lista de temas, clique no ícone de lixeira (🗑)
- Confirme a exclusão

### 2. Configuração da Partida

#### Passo 1: Definir Jogadores
- Escolha o número de jogadores (mínimo 3, máximo 20)
- Preencha o nome de cada jogador

#### Passo 2: Selecionar Tema
- Escolha um dos temas cadastrados
- O número de palavras disponíveis é exibido

#### Passo 3: Modo de Jogo
- **Sem palavra**: Mais difícil para o impostor (não recebe pista)
- **Com palavra diferente**: Impostor recebe uma palavra do mesmo tema

### 3. Durante a Partida

1. **Vez de cada Jogador**:
   - O nome do jogador atual aparece no topo
   - O tema é exibido para todos
   - Jogador clica em "Mostrar Minha Palavra"
   - A palavra é revelada (ou informado que é o impostor)

2. **Identificação Visual**:
   - **Jogador Normal**: Fundo azul com a palavra
   - **Impostor sem palavra**: Fundo vermelho informando que é o impostor
   - **Impostor com palavra**: Fundo vermelho com palavra diferente

3. **Progressão**:
   - Após ver a palavra, clique em "Próximo Jogador"
   - O último jogador clica em "Finalizar Jogo"
   - Sistema retorna ao menu principal

## 💾 Armazenamento de Dados

### LocalStorage
- Todos os temas e palavras são salvos automaticamente no navegador
- Os dados persistem entre sessões
- Estrutura JSON para fácil exportação/importação

### Formato dos Dados
```json
{
  "id": "1",
  "name": "Esportes",
  "words": ["Futebol", "Basquete", "Vôlei"]
}
```

## 🎨 Interface

### Telas do Sistema
1. **Menu Principal**: Iniciar jogo ou gerenciar temas
2. **Gerenciar Temas**: CRUD completo de temas e palavras
3. **Configuração**: Setup dos jogadores, tema e modo
4. **Partida**: Visualização individual das palavras

### Design Responsivo
- Layout adaptável para mobile e desktop
- Interface intuitiva e amigável
- Cores vibrantes e atraentes
- Feedback visual claro

## 🔧 Tecnologias Utilizadas

- **React 18+**: Framework principal
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **CSS3**: Estilização customizada
- **LocalStorage API**: Persistência de dados

## 📱 Compatibilidade

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móveis (iOS e Android)
- ✅ Tablets
- ✅ Desktop

## 🎯 Exemplos de Temas

### Temas Recomendados

**Iniciante (Fácil)**
- Países
- Cores
- Frutas
- Animais

**Intermediário**
- Esportes
- Profissões
- Filmes Famosos
- Marcas

**Avançado (Nichado)**
- Filósofos Gregos
- Linguagens de Programação
- Compositores Clássicos
- Modelos de Carros

### Dicas para Criar Temas
- Mantenha temas dentro de um contexto específico
- Evite palavras muito óbvias ou muito obscuras
- 5-10 palavras por tema é o ideal
- Teste o tema antes de jogar com muitas pessoas

## 🎲 Variações de Jogo

### Modo Clássico
- 1 impostor
- 3 rodadas mínimas
- Votação única

### Modo Avançado (Manual)
- 2 impostores (para 8+ jogadores)
- 5 rodadas
- Múltiplas votações

### Modo Rápido
- 2 rodadas apenas
- Decisão rápida
- Ideal para grupos grandes

## 🤝 Contribuindo

O projeto é open-source e aceita contribuições:
- Novos temas padrão
- Melhorias na UI/UX
- Novas funcionalidades
- Correções de bugs

## 📝 Licença

Este projeto é livre para uso pessoal e educacional.

---

**Divirta-se jogando O Impostor! 🎭🎮**
