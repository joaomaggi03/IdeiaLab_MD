# 💡 IdeiaLab MD

**Banco de ideias para o projeto de extensão Meninas Digitais — UTFPR**

O IdeiaLab MD é uma aplicação web colaborativa para reunir, organizar e priorizar propostas de oficinas, palestras, dinâmicas e outras ações do projeto Meninas Digitais. As integrantes podem cadastrar ideias, votar, comentar e acompanhar o andamento das propostas. A coordenação pode gerenciar categorias, usuários e o status das ideias.

## Funcionalidades

- Cadastro e autenticação de usuários com JWT; níveis de acesso **membro** e **admin**.
- Cadastro, listagem, pesquisa, edição e exclusão lógica de ideias.
- Votação com um voto por usuário em cada ideia, remoção do voto e ranking de propostas.
- Comentários nas ideias.
- Edição de nome, e-mail e senha pelo próprio usuário.
- Painel administrativo com alteração do status das ideias, gerenciamento de categorias e permissões de usuários.
- Encerramento da sessão (logout).

**Status de uma ideia:** Em análise → Aprovada → Em execução → Concluída.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Front-end | React, Vite, React Router |
| Back-end | Node.js, Express, Sequelize, JWT |
| Banco de dados | PostgreSQL |
| Ferramentas de desenvolvimento | VS Code, Git, GitHub, Thunder Client, Figma |

## Pré-requisitos

- Node.js e npm compatíveis com a versão do Vite definida em `frontend/package.json`.
- PostgreSQL instalado e em execução.
- Git, caso queira clonar o repositório.

> O projeto foi testado localmente. Para uso em produção, ainda são necessárias configurações próprias de implantação, segurança e operação.

## Como executar localmente

### 1. Obter o projeto

```bash
git clone https://github.com/joaomaggi03/IdeiaLab_MD.git
cd IdeiaLab_MD
```

### 2. Criar o banco de dados

Crie um banco PostgreSQL vazio chamado `ideialab_md_final` (ou outro nome de sua preferência). Em seguida, execute, **uma única vez**, os scripts abaixo, **nessa ordem**:

1. `database/first_query.sql` — cria os tipos, tabelas e índices.
2. `database/seeding.sql` — opcional; insere dados fictícios para demonstração.

Exemplo com `psql`, executado na raiz do projeto:

```bash
psql -U postgres -d postgres -c "CREATE DATABASE ideialab_md_final;"
psql -U postgres -d ideialab_md_final -v ON_ERROR_STOP=1 -f database/first_query.sql
psql -U postgres -d ideialab_md_final -v ON_ERROR_STOP=1 -f database/seeding.sql
```

No Windows, caso `psql` não seja reconhecido, utilize o executável do PostgreSQL instalado; por exemplo, no PowerShell com PostgreSQL 18:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d postgres -c "CREATE DATABASE ideialab_md_final;"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d ideialab_md_final -v ON_ERROR_STOP=1 -f database/first_query.sql
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d ideialab_md_final -v ON_ERROR_STOP=1 -f database/seeding.sql
```

Ajuste o caminho conforme a versão instalada. Não execute `first_query.sql` sobre um banco que já possui as tabelas. Mais detalhes em [`database/README_EXECUCAO.md`](database/README_EXECUCAO.md).

### 3. Configurar o back-end

Na pasta `backend`, copie `.env.example` para `.env` e ajuste as variáveis conforme seu computador:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ideialab_md_final
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_LOCAL
JWT_SECRET=DEFINA_UMA_CHAVE_ALEATORIA_COM_PELO_MENOS_32_CARACTERES
DB_SYNC=false
```

**Nunca publique o arquivo `.env` ou credenciais reais.** Mantenha `DB_SYNC=false` porque as tabelas já foram criadas pelo SQL.

Execute em um terminal:

```bash
cd backend
npm install
npm start
```

API: **http://localhost:3001/api**  
Verificação: **http://localhost:3001/api/health**

### 4. Configurar o front-end

Abra **outro terminal** na pasta `frontend`. Se necessário, copie `frontend/.env.example` para `frontend/.env` e mantenha:

```env
VITE_API_URL=http://localhost:3001/api
```

Execute:

```bash
cd frontend
npm install
npm run dev
```

Abra **http://localhost:5173/** no navegador. Deixe os dois terminais em execução.

### 5. Contas e administração

- O cadastro público cria um **membro**, não um administrador.
- Para demonstração, o `seeding.sql` cria contas fictícias; as orientações e a senha **exclusivamente de teste** estão em [`database/README_EXECUCAO.md`](database/README_EXECUCAO.md).
- Para criar uma conta administradora própria, utilize o comando `npm run admin:init` na pasta `backend` com as variáveis `ADMIN_NOME`, `ADMIN_EMAIL` e `ADMIN_PASSWORD`, conforme descrito no guia do banco.

**Não reutilize contas ou senhas de demonstração em produção.**

## Problemas conhecidos de configuração

- **`psql` não reconhecido:** utilize o caminho completo de `psql.exe` no Windows ou adicione a pasta `bin` do PostgreSQL ao `PATH`.
- **Erro de conexão ao banco:** confira serviço do PostgreSQL, nome do banco e credenciais em `backend/.env`.
- **Erro de autenticação:** confirme a existência de uma conta válida e que `JWT_SECRET` foi definido no back-end.
- **Caracteres acentuados incorretos após importar o SQL:** verifique a codificação UTF-8 do arquivo e da sessão `psql`. Para bases de demonstração já importadas com caracteres corrompidos, há scripts de correção em `database/corrigir_acentos_ideialab.sql` e `database/corrigir_status_ideialab.sql`. Use-os somente se o problema ocorrer, preferencialmente após backup.

## Estrutura do repositório

```text
IdeiaLab_MD/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── scripts/
│   ├── .env.example
│   └── package.json
├── database/
│   ├── first_query.sql
│   ├── seeding.sql
│   └── README_EXECUCAO.md
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   └── services/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Divisão do trabalho

O desenvolvimento envolveu design e front-end React, API e integração com a interface, e modelagem do banco PostgreSQL. As alterações foram organizadas em branches no GitHub e incorporadas à `main` por Pull Requests.

**Equipe:** João Lucas Maggi, Gabriel Henrique Scarduelli, Claudinei Soares Júnior, Rafael Romanelo e Filipe Nogueira.

Projeto acadêmico da disciplina **Certificadora de Competência Identitária** — 2026.

## Referências internas

- [Documentação do back-end e endpoints](backend/README_BACKEND.md)
- [Guia de execução do banco de dados](database/README_EXECUCAO.md)
