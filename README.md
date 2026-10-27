# 🎯 SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior

Projeto desenvolvido para o **Mini-Projeto Avaliativo (Módulo 01 - Semana 07)** da trilha **Desenvolvedor(a) Front-End [React]** (SCTEC / SENAI).

---

## 📌 1. O que o sistema faz e para que serve

O **SkillMatch JS** é um motor de análise (*engine*) construído em **JavaScript puro (ES6+)** para automatizar a triagem técnica de currículos e auxiliar pessoas candidatas a vagas de **Desenvolvedor(a) Front-End Júnior**.

O sistema compara o perfil técnico real do candidato com os requisitos de vagas fictícias do mercado, realizando automaticamente:
- A leitura do perfil do candidato (objeto literal) e das vagas modeladas com Programação Orientada a Objetos (Classes e Herança);
- A busca assíncrona das vagas simulando o carregamento a partir de um servidor externo;
- O cálculo percentual de compatibilidade (de 0% a 100%) e a classificação em **Alta**, **Média** ou **Baixa compatibilidade**;
- A listagem das habilidades que o candidato já possui em comum e das habilidades faltantes para cada vaga;
- A identificação da vaga com maior aderência ao perfil (**Melhor Match**);
- A geração de uma recomendação de estudos priorizada de acordo com a demanda das vagas.

---

## 🚀 2. Como Executar o Sistema (Passo a Passo do Zero)

Você pode executar este projeto de duas maneiras diferentes:

### Opção 1: Usando o Node.js no Terminal (Recomendado)
1. Instale o [Node.js](https://nodejs.org/) em seu computador (caso ainda não possua).
2. Baixe ou clone este repositório no seu computador com o comando:
   `git clone https://github.com/Rafaelcechinelnunes/skillmatch-js`
3. Abra a pasta do projeto (`skillmatch-js`) no **VS Code**.
4. Abra o terminal integrado do VS Code (`Ctrl + '`) e digite o comando abaixo:
   `node skillmatch.js`
5. Aguarde 1,5 segundo (simulação de carregamento do servidor) e confira o relatório completo impresso no terminal.

### Opção 2: Usando o Console do Navegador
1. Abra o arquivo `skillmatch.js` e copie todo o seu código.
2. Abra qualquer página no seu navegador (Google Chrome ou Edge) e pressione a tecla **F12** (ou clique com o botão direito na tela e escolha **Inspecionar**).
3. Clique na aba **Console**, cole o código copiado e pressione **Enter**.


---

## 🏗️ 3. Como o Projeto Foi Construído (Organização, Kanban e GitFlow)

O desenvolvimento seguiu uma metodologia profissional dividida em etapas planejadas antes da escrita do código:

### 3.1. Planejamento com Quadro Kanban (Trello)
O trabalho foi estruturado em um quadro Kanban com as quatro colunas obrigatórias (**Backlog**, **A Fazer**, **Em Andamento** e **Concluído**), dividido em 6 cartões de entrega:
1. **Configurar Projeto, Git e Repositório GitHub:** Criação da pasta `skillmatch-js`, arquivos `skillmatch.js` e `README.md`, e inicialização do versionamento.
2. **Modelar Perfil do Candidato e Classes de Vagas (POO):** Criação do objeto literal `candidato` com dados reais e modelagem das classes `Vaga` e `VagaFrontEnd`.
3. **Simular Consumo de API Assíncrona de Vagas:** Criação do banco de vagas e simulação de requisição ao servidor com `Promise`, `setTimeout`, `async/await` e `try/catch`.
4. **Criar Motor de Compatibilidade e Métodos de Array:** Implementação da lógica de cálculo percentual, classificação condicional e aplicação de métodos de array (`filter`, `every`, `map`, `reduce`).
5. **Implementar Recomendação de Estudos e Métricas com Closure:** Criação da função de priorização de estudos com `Callback` e contador encapsulado com `Closure`.
6. **Redigir Documentação README.md e Gravar Vídeo:** Documentação técnica completa e demonstração prática do projeto.

### 3.2. Versionamento e Branches (GitFlow Simplificado)
Para preservar a integridade da branch principal (`main`), cada funcionalidade foi desenvolvida em uma branch específica e integrada ao final:
- `feature/config-inicial`: Estrutura base do projeto.
- `feature/modelagem-poo`: Objeto do candidato, classes, construtor, herança e uso do `this`.
- `feature/api-vagas`: Lista de vagas e simulação assíncrona de servidor.
- `feature/motor-compatibilidade`: Cálculos de aderência, classificação e métodos de array.
- `feature/recomendacao-closure`: Plano de estudos com callback e contador com closure.
- `docs/documentacao-readme`: Elaboração da documentação técnica no `README.md`.

---

## 🛠️ 4. Editor e Extensões Recomendadas (VS Code)

O projeto foi desenvolvido utilizando o editor **Visual Studio Code (VS Code)**. As extensões utilizadas e recomendadas para manter a qualidade do código são:
- **Prettier - Code formatter:** Para formatação automática e padronização visual do código JavaScript.
- **ESLint:** Para análise estática do código e prevenção de erros de sintaxe.
- **Code Runner:** Para facilitar a execução rápida do arquivo `.js` diretamente no terminal do editor.


---

## 🧮 5. Decisões de Projeto e Regras de Negócio

### 5.1. Regra de Cálculo da Compatibilidade e Classificação (RF03 e RF04)
Para garantir que o cálculo seja justo independentemente da quantidade de requisitos de cada vaga, adotou-se a proporção direta entre o número de habilidades que o candidato atende e o total de requisitos exigidos pela vaga, multiplicada por 100 e arredondada com `Math.round()`:

> **Fórmula:** `Percentual = Math.round((Quantidade de Habilidades Atendidas / Total de Requisitos da Vaga) * 100)`

**Por que essa regra foi escolhida?**
Porque ela atribui o mesmo peso a cada requisito essencial da vaga e gera sempre um número inteiro claro entre `0%` e `100%`. Por exemplo: se uma vaga exige 5 habilidades e o candidato domina 4 delas (`HTML5`, `CSS3`, `JavaScript`, `Git`), a compatibilidade será `(4 / 5) * 100 = 80%`.

Com base nesse percentual, a função `classificarCompatibilidade()` utiliza a estrutura de decisão `if / else if / else` para classificar a vaga nas três faixas exigidas:
- **80% a 100%:** Alta compatibilidade
- **50% a 79%:** Média compatibilidade
- **0% a 49%:** Baixa compatibilidade

### 5.2. Estratégia para Encontrar a Vaga com Maior Compatibilidade (RF06)
Para identificar a vaga mais aderente ao perfil, utilizou-se o método de array **`reduce`** na função `encontrarMelhorVaga()`. Ele percorre a lista de relatórios analisados comparando o percentual de cada vaga com a melhor encontrada até o momento (`analiseAtual.percentual > melhorAtual.percentual`), retornando ao final o objeto da vaga vencedora.

### 5.3. Critério de Priorização na Recomendação de Estudos (RF07)
Para sugerir o que o candidato deve estudar primeiro, definiu-se o **Critério de Frequência de Demanda nas Vagas**: o sistema contabiliza em quantas vagas cada habilidade faltante aparece e ordena da mais requisitada para a menos requisitada.
1. **Prioridade ALTA (Exigida em todas as vagas):** Habilidades que faltam em 3 ou mais vagas (ex.: `React`). Estudar essa tecnologia aumenta a compatibilidade do candidato em 100% das oportunidades analisadas.
2. **Prioridade MÉDIA (Muito requisitada no mercado):** Habilidades que faltam em 2 vagas (ex.: `TypeScript`).
3. **Prioridade COMPLEMENTAR (Diferencial específico):** Habilidades que faltam em apenas 1 vaga (ex.: `Tailwind CSS`).

---

## 🌐 6. Fundamentos Web e JavaScript Explicados

### 6.1. Como a Internet Funciona
A internet é uma rede global que conecta milhões de computadores e servidores ao redor do mundo. Quando acessamos um site ou sistema, os dispositivos trocam pacotes de dados através de cabos, fibra óptica e redes sem fio seguindo regras padronizadas chamadas **protocolos de comunicação** (como o protocolo **TCP/IP**, que endereça e transporta os dados em pacotes, e o **HTTP/HTTPS**, que permite a transferência de páginas e dados entre navegadores e servidores de forma segura).

### 6.2. O que é a Arquitetura Cliente-Servidor e como aparece no projeto
A **Arquitetura Cliente-Servidor** divide os sistemas web em duas partes principais:
- **Cliente (Front-End):** É o dispositivo e o programa usado pela pessoa usuária (como o navegador ou o terminal onde este sistema roda), responsável por fazer pedidos (*requisições*) e apresentar as informações na tela.
- **Servidor (Back-End / Banco de Dados):** É um computador remoto onde os dados reais das empresas e vagas ficam armazenados, responsável por processar os pedidos do cliente e devolver os dados (*respostas*).

**Como aparece no projeto:** Como buscar dados em um servidor pela internet não é instantâneo (existe um tempo de espera chamado latência de rede), simulamos essa comunicação na função `buscarVagasNoServidor()`. Utilizamos uma **`Promise`** combinada com `setTimeout` (simulando 1,5 segundo de carregamento) e consumimos esses dados na função principal `iniciarSistema()` utilizando **`async/await`** e bloco **`try/catch`** para tratamento de possíveis falhas do servidor.

### 6.3. Uso de `const`, `let` e por que não usar `var`
No código do **SkillMatch JS**, utilizamos exclusivamente **`const`** e **`let`**:
- **`const` (Constante):** Possui escopo de bloco e impede que a variável tenha sua referência reatribuída acidentalmente. Foi priorizada para declarar objetos (`candidato`), listas (`bancoDeVagas`) e resultados de cálculos.
- **`let`:** Possui escopo de bloco e permite reatribuição de valor. Foi utilizada apenas onde o valor realmente precisava mudar ao longo do tempo, como no contador interno da *Closure* (`let totalVagasAnalisadas = 0`) e no índice do laço `for`.
- **Explicação sobre o `var`:** O `var` é a forma antiga de declarar variáveis no JavaScript. Ele não respeita o escopo de blocos (como `if` e `for`), sofre *hoisting* (pode ser lido antes de ser declarado gerando valor `undefined`) e permite redeclarar a mesma variável sem avisar erro, o que pode causar falhas graves e difíceis de rastrear no programa.

---

## 💻 7. Conceitos do Módulo 01 Aplicados e Onde Encontrá-los no Código

- **Tipos de Dados (`String`, `Number`, `Boolean`, `Array`, `Object`):** Aplicados na Seção 1 (`candidato`), combinando texto (`nome`, `areaInteresse`), número (`tempoExperienciaMeses`), booleano (`disponivelImediato`) e array (`habilidades`).
- **POO — Classes, Construtor e `this` (RF09 e RF11):** Aplicados na Seção 2 na classe base `Vaga`, que define o `constructor` com os atributos da vaga e utiliza `this` no método `exibirResumo()`.
- **POO — Herança e Polimorfismo (RF10):** Aplicados na Seção 2 na classe `VagaFrontEnd extends Vaga`, que utiliza `super()` para aproveitar a estrutura da classe mãe, adiciona o atributo exclusivo `frameworkPrincipal` e sobrescreve o método `exibirResumo()`.
- **Estruturas de Decisão (RF04):** Uso de `if / else if / else` na função `classificarCompatibilidade()` (Seção 4) e em `processarRecomendacoesDeEstudo()` (Seção 5), além de operadores ternários (`? :`) na formatação de mensagens no console.
- **Laços de Repetição:** Uso do laço `for...of` para percorrer e imprimir os relatórios de vagas e para contabilizar habilidades faltantes, e do laço `for` tradicional para numerar o plano de recomendação de estudos.
- **Métodos de Array e Arrow Functions (RF08):** Foram utilizados **4 métodos de array** com *arrow functions* (`=>`):
  1. `filter`: Na função `analisarVaga()`, para separar as `habilidadesAtendidas` e as `habilidadesFaltantes` (RF05).
  2. `every`: Na função `analisarVaga()`, para verificar se o candidato domina 100% dos requisitos da vaga.
  3. `map`: Em `iniciarSistema()`, para transformar a lista de vagas carregadas em uma lista de relatórios completos, e em `processarRecomendacoesDeEstudo()`.
  4. `reduce`: Na função `encontrarMelhorVaga()`, para comparar os percentuais de todas as vagas e retornar aquela com maior compatibilidade (RF06).
- **Closure (RF13):** Aplicada na Seção 5 na função `criarContadorDeAnalises()`, que mantém a variável `totalVagasAnalisadas` protegida em seu escopo interno e incrementa seu valor a cada nova vaga analisada (`[Análise #1]`, `[Análise #2]`, `[Análise #3]`) sem usar variável global.
- **Callback (RF12):** Aplicado na Seção 5 na função `processarRecomendacoesDeEstudo(relatorioAnalises, callbackExibicao)`, que recebe a função `exibirPlanoDeEstudos` como parâmetro e a executa ao terminar a priorização.
- **Promise e Async/Await (RF14):** Aplicados na Seção 3 em `buscarVagasNoServidor()` e na execução principal em `iniciarSistema()`.

---

## 🔗 8. Links Obrigatórios de Entrega

- 📋 **Quadro Kanban (Trello):** [Acessar Quadro Kanban do Projeto](https://trello.com/b/7zycAC1x)
- 🎥 **Vídeo de Apresentação:** [Assistir ao Vídeo de Demonstração do Projeto](https://drive.google.com/file/d/1tVMauqD0s_XDxJcfpBCNKqyT3rvTaXUw/view?usp=sharing)

---
*Desenvolvido por **Rafael Cechinel Nunes** — Turma T5 - Módulo 01.*