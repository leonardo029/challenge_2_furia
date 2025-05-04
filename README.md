# Know Your Fan | Challenge 2

![FURIA Logo](/assets/images/logoFuria.svg)

Este projeto é uma PoC (Proof of Concept) para um sistema "Know Your Fan" criado para fãs da organização FURIA. Desafio Técnico da FURIA Tech para a vaga de Assistente de Engenharia de Software.

## 📋 Sobre o Projeto

Este projeto é um formulário de coleta de dados para fãs da organização FURIA e de esportes eletrônicos. O site apresenta um design moderno com predominância das cores principais da FURIA (preto e branco), permitindo que os fãs cadastrem suas informações pessoais e gerem o seu "Perfil de Esports", com isso, a organização conhece mais sobre os seus torcedores e pode, através disso, elaborar novas ações que agreguem valor ao seu público.   
A aplicação combina uma interface React responsiva com um formulário multi-etapas, e propostas arquiteturais para funcionalidades avançadas como validação de documentos com IA, integração com redes sociais e perfis de plataformas de jogos.

## 💻 Implementação Prática

### 1️⃣ Tópico 1: Coleta de Dados Básicos e Interesses

Nesta etapa, foi desenvolvido um formulário frontend utilizando a biblioteca React para coletar os dados básicos do usuário, como nome, endereço (simplificado para cidade/estado), CPF (apenas para demonstração), e informações sobre seus interesses, atividades, eventos e compras relacionadas ao último ano no universo de esports.

**Observações:**

* Esta implementação consiste apenas em um frontend, sem comunicação com um backend para persistência dos dados. Os dados preenchidos no formulário são apenas para visualização e demonstração da interface.
* A validação dos campos é realizada no frontend para garantir a integridade básica dos dados inseridos.

### 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Vite](https://vitejs.dev/) - Build tool e dev server
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Lucide React](https://lucide.dev/) - Biblioteca de ícones

### ⚙️ Pré-requisitos

- Node.js (versão recomendada: 18.x ou superior)
- npm ou yarn

### 🔧 Instalação e Configuração

```bash
# Clone o repositório
git clone https://github.com/leonardo029/challenge_2_furia.git
cd challenge_2_furia

# Instale as dependências
npm install
# ou
yarn install
```

### 🏃‍♂️ Como Executar

```bash
# Modo de desenvolvimento
npm run dev
# ou
yarn dev

# Build para produção
npm run build
# ou
yarn build

# Previsualizar build
npm run preview
# ou
yarn preview

# Executar linting
npm run lint
# ou
yarn lint
```

O site estará disponível em `http://localhost:5173` (ou na porta indicada no terminal).

### 📦 Estrutura Principal do Projeto

```
challenge_2_furia/
├── assets/
│   └── images/                             # Imagens usadas para estilizar a página web
│        ├── favicon.ico
│        └── logoFuria.svg
├── src/
│   ├── components/
│   │    ├──forms/
│   │    │   ├── BasicInfoForm.tsx          # Componente de exibição e controle da página de informações básicas
│   │    │   ├── DocumentsForm.tsx          # Componente de exibição e controle da página de validação de documentos pessoais com IA
│   │    │   ├── EsportsProfilesForm.tsx    # Componente de exibição e controle da página de perfis de jogos
│   │    │   ├── InterestsForm.tsx          # Componente de exibição e controle da página de interesses
│   │    │   └── SocialMediaForm.tsx        # Componente de exibição e controle da página de integração com redes sociais
│   │    ├── Dashboard.tsx                  # Componente de exibição do dashboard final gerado
│   │    ├── FormProgress.tsx               # Controla a lógica de progresso de preenchimento do formulário
│   │    └── Header.tsx                     # Componente de exibição do header da aplicação
│   ├── types/
│   │   └── index.ts                        # Definições de tipos de interface
│   ├── App.tsx                             # Componente principal da aplicação
│   ├── index.css                           # Estilos globais e customizações do Tailwind
│   └── main.tsx                            # Ponto de entrada da aplicação
├── .eslint.config.js                       # Configuração do ESLint
├── index.html                              # HTML de entrada
├── package.json                            # Dependências e scripts
├── postcss.config.js                       # Configuração do PostCSS
├── tailwind.config.js                      # Configuração do Tailwind CSS
├── tsconfig.json                           # Configuração do TypeScript
└── vite.config.ts                          # Configuração do Vite
```
### 🔍 Funcionalidades

*  **Coleta de Informações Básicas**
   - Formulário para dados pessoais (nome, email, CPF e endereço)

*  **Gerenciamento de Interesses**
   - Seleção de jogos favoritos com opções pré-definidas
   - Seleção de times favoritos com opções pré-definidas
   - Adição de opções personalizadas de jogos e times
   - Registro de eventos participados com sistema de adição/remoção
   - Registro sobre compras, realizadas no último ano, de produtos de esports

*  **Validação de Documentos**
   - Upload de documentos
   - Sistema de validação por IA com status (pendente, aprovado, rejeitado)

*  **Integração com Redes Sociais**
   - Conexão de múltiplas contas (Twitter, Instagram, Facebook)
   - Análise de relevância de perfis para conteúdo de esports
   - Contagem de interações relacionadas a esports

*  **Integração com Plataformas de Jogos**
   - Conexão com múltiplas plataformas (Steam, Battle.net, League of Legends, Valorant, FACEIT)
   - Validação simulada de perfis por IA
   - Análise de relevância dos perfis

*  **Dashboard Interativo**
   - Visualização geral das informações do perfil do usuário
   - Exibição de pontuação de preenchimento
   - Exibição de pontuação de fã
   - Visualização detalhada de informações por categoria (interesses, jogos, times, eventos e perfis de redes sociais/jogos)

### ✨ Principais Características

-   Formulário Multi-etapas: Coleta de dados dividida em 5 etapas intuitivas
-   Verificação de Identidade: Upload e validação de documentos com feedback visual em tempo real
-   Conexão com Redes Sociais: Integração com perfis de mídias sociais
-   Perfis de Esports: Vinculação com contas de plataformas de jogos
-   Dashboard Interativo: Visualização completa dos dados e métricas de engajamento
-   Design Responsivo: Interface adaptável a qualquer dispositivo
-   Sistema de Pontuação: Avaliação de perfil de fã baseado em engajamento com esports

## 📖 Implementação Teórica

Para os tópicos 2, 3 e 4, devido à complexidade e ao escopo do desafio para uma entrega rápida e prática, apresentarei a seguir as melhores abordagens arquiteturais e tecnológicas que seriam utilizadas em uma futura implementação completa.

### 2️⃣ Tópico 2: Upload de Documentos e Validação de Identificação com IA

**Abordagem:**

A validação de identificação utilizando IA envolveria uma arquitetura cliente-servidor. O frontend (React) permitiria o upload de documentos (RG, CNH, etc.). Este arquivo seria enviado para um backend dedicado, responsável por interagir com um serviço de Inteligência Artificial especializado em reconhecimento e validação de documentos.

**Arquitetura Sugerida:**

1.  O **Frontend em React** envia o arquivo do documento para o **API Gateway**.
2.  O **API Gateway** roteia a requisição para o **Serviço de Validação de Documentos**.
3.  O **Serviço de Validação de Documentos** (poderia ser implementado em Python com frameworks como Flask ou FastAPI) receberia o arquivo, faria pré-processamentos (se necessário) e o enviaria para a **API de IA** escolhida.
4.  A **API de IA** realizaria a análise do documento, extraindo informações relevantes e validando sua autenticidade (comparando padrões, verificando elementos de segurança, etc.).
5.  O resultado da análise seria retornado para o **Serviço de Validação de Documentos**, que o processaria e enviaria uma resposta (sucesso ou falha na validação, com detalhes se necessário) de volta para o **Frontend** através do **API Gateway**.

**Tecnologias Recomendadas:**

* **Backend:** Python (Flask, FastAPI), Node.js (Express) - pela vasta disponibilidade de bibliotecas e facilidade de integração com serviços de IA.
* **API de IA:** Google Cloud Vision AI, AWS Rekognition, Azure Computer Vision - serviços robustos e escaláveis com APIs bem documentadas para análise de imagens e documentos.
* **Armazenamento Temporário (para o documento durante o processamento):** AWS S3, Google Cloud Storage, Azure Blob Storage - soluções de armazenamento em nuvem seguras e eficientes.

**Praticidade e Qualidade:**

A utilização de serviços de IA como os mencionados oferece alta precisão e escalabilidade, minimizando a necessidade de desenvolver algoritmos complexos internamente. A arquitetura cliente-servidor permite uma separação clara de responsabilidades, facilitando a manutenção e a evolução do sistema.

### 3️⃣ Tópico 3: Vincular Redes Sociais ao Perfil do Usuário

**Abordagem:**

A vinculação de redes sociais seria implementada utilizando o protocolo OAuth 2.0. Isso permitiria que o usuário concedesse permissão para o nosso sistema acessar informações específicas de suas contas (interações, páginas seguidas, atividades relacionadas a organizações de e-sports como a FURIA) sem a necessidade de compartilhar suas credenciais diretamente conosco.

**Arquitetura Sugerida:**

1.  No **Frontend em React**, o usuário iniciaria o processo de vinculação de uma rede social (ex: clicando em um botão "Conectar com Twitter").
2.  O **Frontend** redirecionaria o usuário para a página de autorização da rede social desejada, passando o ID do nosso aplicativo.
3.  O usuário faria login na rede social e concederia as permissões solicitadas.
4.  A rede social redirecionaria o usuário de volta para o nosso **Backend** (Serviço de Autenticação e Integração), fornecendo um código de autorização.
5.  O **Backend** (poderia ser implementado em Node.js com Passport.js ou Python com frameworks como Django ou Flask com bibliotecas de OAuth) utilizaria esse código para obter um token de acesso da API da rede social.
6.  Com o token de acesso, o **Backend** poderia então fazer requisições à **API da Rede Social** para obter as informações desejadas (seguindo páginas da FURIA, interações recentes, etc.).
7.  Essas informações seriam armazenadas (de forma segura e respeitando a privacidade do usuário) e poderiam ser exibidas no perfil do usuário no **Frontend**.

**Tecnologias Recomendadas:**

* **Backend:** Node.js (Express, Passport.js), Python (Django, Flask com Authlib) - frameworks com excelente suporte para OAuth 2.0.
* **Bibliotecas OAuth:** Passport.js (Node.js), Authlib (Python).
* **APIs das Redes Sociais:** Twitter API v2, Instagram Graph API, Facebook Graph API (para páginas da FURIA), Twitch API (se relevante).

**Praticidade e Qualidade:**

O uso de OAuth 2.0 garante a segurança das credenciais do usuário e permite um acesso granular às informações desejadas. A utilização de bibliotecas OAuth simplifica a implementação do fluxo de autenticação e autorização.

### 4️⃣ Tópico 4: Compartilhar Links de Perfis em Sites de E-sports e Validação com IA

**Abordagem:**

Nesta funcionalidade, o usuário poderia compartilhar links para seus perfis em plataformas de esports. Uma análise de IA seria utilizada para verificar se o conteúdo desses perfis é relevante para o perfil de um fã de esports.

**Arquitetura Sugerida:**

1.  No **Frontend em React**, o usuário forneceria um ou mais links para seus perfis em sites de esports.
2.  Esses links seriam enviados para o **API Gateway**.
3.  O **API Gateway** rotearia a requisição para o **Serviço de Análise de Conteúdo** (poderia ser implementado em Python com bibliotecas como BeautifulSoup e frameworks como Flask ou FastAPI).
4.  O **Serviço de Análise de Conteúdo** faria o seguinte:
    * **Web Scraping (Responsável e Ético):** Buscaria o conteúdo das páginas dos links fornecidos.
    * **Análise de Texto e Conteúdo:** Utilizaria uma **API de IA** especializada em análise de texto e conteúdo web (ou modelos de Machine Learning treinados para essa finalidade) para identificar elementos relevantes ao perfil de um fã de esports (menção a times, participação em comunidades, estatísticas de jogos, conteúdo relacionado a campeonatos, etc.).
5.  A **API de IA** retornaria um score de relevância ou categorias de conteúdo encontradas.
6.  O **Serviço de Análise de Conteúdo** processaria essa informação e enviaria um resultado (link relevante ou não relevante, com justificativa se necessário) de volta para o **Frontend** através do **API Gateway**.

**Tecnologias Recomendadas:**

* **Backend:** Python (Flask, FastAPI), Node.js (Express) - para manipulação de requisições web e integração com bibliotecas de scraping e APIs de IA.
* **Web Scraping:** BeautifulSoup (Python), Cheerio (Node.js) - para analisar a estrutura HTML das páginas. **Importante:** Realizar o scraping de forma ética, respeitando o `robots.txt` dos sites e evitando sobrecarregar os servidores.
* **API de IA (Análise de Texto e Conteúdo Web):**
    * **APIs de Processamento de Linguagem Natural (NLP):** Google Cloud Natural Language API, AWS Comprehend, Azure Text Analytics - podem ser usadas para identificar entidades, sentimentos e tópicos relevantes no conteúdo.
    * **Modelos de Machine Learning Personalizados:** Treinar um modelo para classificar páginas como relevantes ou não relevantes com base em um conjunto de dados de exemplos de perfis de fãs de esports. Bibliotecas como scikit-learn (Python) poderiam ser utilizadas.
* **Alternativa mais simples (com menor precisão):** Análise baseada em palavras-chave e padrões (sem a necessidade de uma API de IA complexa para um protótipo).

**Praticidade e Qualidade:**

A utilização de web scraping (com responsabilidade) combinada com análise de IA permite uma avaliação automatizada da relevância do conteúdo dos perfis. A escolha da API de IA ou da abordagem de análise dependerá do nível de precisão e dos recursos disponíveis.

## 💭 Próximos Passos (Implementação Completa)

Para uma implementação completa desta solução, os próximos passos seriam:

* Desenvolvimento do backend para cada funcionalidade (validação de documentos, autenticação e integração de redes sociais, análise de conteúdo de perfis).
* Integração do frontend React com o backend através de APIs RESTful ou GraphQL.
* Implementação da lógica de persistência dos dados coletados e validados em um banco de dados.
* Implementação da comunicação com as APIs de IA e das redes sociais.
* Testes rigorosos de todas as funcionalidades e tratamento de erros.
* Considerações de segurança e privacidade dos dados dos usuários em todas as etapas do desenvolvimento.

## 🌐 Deploy com Vercel

O projeto está sendo hospedado na plataforma [Vercel](https://vercel.com/), uma ferramenta moderna de *deploy* contínuo focada em aplicações frontend, especialmente projetos criados com frameworks como React, Next.js, Vue e outros.

Na Vercel, o deploy é feito automaticamente a partir de um repositório Git (como GitHub ou GitLab). Sempre que há um novo *push* na branch configurada (geralmente `main`), a Vercel executa o processo de build e publica uma nova versão do site.

No caso deste projeto, o comando `vite build` é usado para gerar os arquivos estáticos da aplicação, que são então servidos por uma CDN global, garantindo alta performance e baixa latência para os usuários.

Além disso, o Vercel oferece:
- URLs automáticas para *preview* de cada *pull request*
- SSL gratuito (HTTPS)
- Deploys instantâneos e reversíveis

Para acessar o projeto em produção, acesse:  
👉 [https://challenge-2-furia.vercel.app/](https://challenge-2-furia.vercel.app/)