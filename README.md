\# 💡 IdeiaLab MD



> Banco de Ideias para o Projeto de Extensão \*\*Meninas Digitais\*\* (UTFPR)



O \*\*IdeiaLab MD\*\* é uma aplicação web que visa \*\*centralizar, organizar e priorizar\*\* as ideias de atividades, oficinas, dinâmicas e conteúdos propostos para o projeto de extensão \*Meninas Digitais\* da UTFPR — projeto que tem como objetivo aproximar meninas e adolescentes da área de tecnologia.



O sistema ajuda a coordenação e as voluntárias a reunir em um único lugar as ideias sugeridas pela equipe, permitindo que sejam \*\*discutidas, votadas e priorizadas\*\* de forma colaborativa — desde o registro da ideia até a definição de quais atividades serão efetivamente realizadas com as participantes.



\---



\## 📑 Sumário



\- \[Sobre o Projeto](#-sobre-o-projeto)

\- \[Funcionalidades](#-funcionalidades)

\- \[Perfis de Usuário](#-perfis-de-usuário)

\- \[Tecnologias](#-tecnologias)

\- \[Como Executar](#-como-executar)

\- \[Estrutura do Projeto](#-estrutura-do-projeto)

\- \[Divisão do Desenvolvimento](#-divisão-do-desenvolvimento)

\- \[Equipe](#-equipe)



\---



\## 📖 Sobre o Projeto



O que o IdeiaLab MD pretende atender:



\- 🗂️ \*\*Centralizar\*\* em um único espaço as ideias de atividades, oficinas e dinâmicas propostas para o projeto.

\- 🗳️ \*\*Priorizar\*\* as ideias por meio de votação, indicando o interesse coletivo em cada proposta.

\- 📝 \*\*Registrar de forma estruturada\*\* as sugestões da equipe, complementando as trocas informais feitas hoje pelo WhatsApp.

\- 👀 \*\*Dar visibilidade\*\* ao status de cada ideia (em análise, aprovada, em execução ou concluída) para todas as integrantes envolvidas.



\---



\## ✨ Funcionalidades



| Módulo | Descrição |

|--------|-----------|

| \*\*Controle de Ideias\*\* | Cadastrar, listar, atualizar e excluir (exclusão lógica) ideias de atividades. Cada ideia possui código, título, descrição, categoria, público-alvo, autora, data de cadastro e status. |

| \*\*Votação e Priorização\*\* | Votação nas ideias cadastradas com atualização automática da contagem de votos e ranking das ideias mais votadas. |

| \*\*Comentários em Ideias\*\* | Registro de comentários nas ideias para discutir detalhes, sugerir melhorias e esclarecer dúvidas. |

| \*\*Gerenciamento de Categorias\*\* | Administradores podem cadastrar, listar, atualizar e excluir categorias (ex.: oficinas, palestras, dinâmicas e materiais). |

| \*\*Gerenciamento de Usuários\*\* | Cadastro de usuários com diferentes níveis de permissão, garantindo segurança e controle de acesso. |



\---



\## 👥 Perfis de Usuário



\- \*\*Administradores (Coordenação do Projeto):\*\* acesso total às funcionalidades, incluindo controle de ideias, usuários, categorias e definição do status das ideias.

\- \*\*Membros do Projeto e Voluntárias:\*\* permissões limitadas — podem cadastrar novas ideias, comentar e votar nas ideias existentes, sem acesso às configurações avançadas.



\---



\## 🛠️ Tecnologias



\*\*Front-end\*\*

\- \[React](https://react.dev/)



\*\*Back-end\*\*

\- \[Node.js](https://nodejs.org/)

\- \[Express.js](https://expressjs.com/)



\*\*Banco de Dados\*\*

\- \[PostgreSQL](https://www.postgresql.org/)

\- \[Sequelize](https://sequelize.org/) (ORM)



\*\*Ferramentas\*\*

\- \[Visual Studio Code](https://code.visualstudio.com/) (IDE)

\- \[Figma](https://figma.com/) (design das telas)

\- \[GitHub](https://github.com/) (versionamento)



\---



\## 🚀 Como Executar



> \*\*Pré-requisitos:\*\* \[Node.js](https://nodejs.org/) e \[PostgreSQL](https://www.postgresql.org/) instalados.



\### 1. Clonar o repositório



```bash

git clone https://github.com/joaomaggi03/IdeiaLab\_MD.git

cd IdeiaLab\_MD

```



\### 2. Configurar o Back-end



```bash

cd backend

npm install

```



Crie um arquivo `.env` na pasta do back-end com as credenciais do banco:



```env

DB\_HOST=localhost

DB\_PORT=5432

DB\_NAME=ideialab\_md

DB\_USER=seu\_usuario

DB\_PASSWORD=sua\_senha

PORT=3000

```



Inicie o servidor:



```bash

npm start

```



\### 3. Configurar o Front-end



```bash

cd frontend

npm install

npm start

```



A aplicação estará disponível no navegador (por padrão em `http://localhost:3000`).



> ℹ️ Os comandos e caminhos acima são um modelo padrão para uma stack Node.js + React. Ajuste conforme a estrutura real do repositório à medida que o projeto for desenvolvido.



\---



\## 📁 Estrutura do Projeto



```

IdeiaLab\_MD/

├── backend/          # API (Node.js + Express + Sequelize)

│   ├── models/       # Modelos do banco de dados

│   ├── routes/       # Rotas da API

│   └── controllers/  # Lógica de negócios

├── frontend/         # Aplicação React

│   ├── src/

│   │   ├── components/

│   │   └── pages/

└── README.md

```



> A estrutura acima é uma sugestão inicial e pode ser adaptada ao longo do desenvolvimento.



\---



\## 🧩 Divisão do Desenvolvimento



O desenvolvimento foi dividido em \*\*3 partes básicas\*\*, com tarefas fragmentadas e atribuídas individualmente:



\- \*\*Front-end\*\* — design das telas (Figma) e desenvolvimento (React), incluindo integração com a API.

\- \*\*Back-end\*\* — criação da API (métodos GET, POST, PUT e DELETE) para ideias, categorias, votação e comentários, além das rotas e conexão com o front-end.

\- \*\*Banco de Dados\*\* — modelagem (diagramas de entidades e relacionamentos), implementação dos modelos no código e integração com as funcionalidades.



> Embora cada tarefa esteja atribuída a uma pessoa, todos poderão transitar entre as partes conforme a necessidade, visando um melhor aprendizado de todos os integrantes.



\---



\## 👨‍💻 Equipe



\- João Lucas Maggi

\- Gabriel Henrique Scarduelli

\- Claudinei Soares Júnior

\- Rafael Romanelo



\---



\## 🎓 Contexto Acadêmico



Projeto desenvolvido na disciplina \*\*Certificadora de Competência Identitária\*\*.



\*\*Paraná — 2026\*\*

