# API do IdeiaLab MD — Node.js, Express e Sequelize

Esta API já está integrada ao front-end React do repositório principal e ao esquema SQL PostgreSQL em `database/first_query.sql`.

## Configuração e execução

1. Instale Node.js e PostgreSQL.
2. Crie um banco vazio e aplique `database/first_query.sql`. Para dados de demonstração, aplique depois `database/seeding.sql` — somente uma vez e somente em um banco de testes.
3. Dentro de `backend`, execute `npm install`.
4. Copie `.env.example` para `.env` e ajuste `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` e `JWT_SECRET` (mínimo de 32 caracteres).
5. Mantenha `DB_SYNC=false` se as tabelas já foram criadas pelo SQL.
6. Execute `npm start` ou, durante o desenvolvimento, `npm run dev`.
7. Confira `GET http://localhost:3001/api/health`.

O front-end usa Vite na porta **5173** (`npm run dev` na pasta `frontend`) e a API fica na porta **3001**, salvo alteração no `.env`.

**Segurança:** não versione o `.env`. Não execute `sequelize.sync({ alter: true })` nem `sync({ force: true })` sobre um banco com dados. Para implantação real, use credenciais próprias e HTTPS.

## Autenticação e permissões

- `POST /api/auth/cadastro` cria uma conta `membro`.
- `POST /api/auth/login` retorna JWT e dados públicos da conta.
- Envie `Authorization: Bearer <token>` nas rotas protegidas.
- Usuários `admin` gerenciam categorias, permissões de usuários e status das ideias.
- A primeira conta administrativa pode ser criada com `npm run admin:init`, após definir temporariamente `ADMIN_NOME`, `ADMIN_EMAIL` e `ADMIN_PASSWORD` no terminal. Consulte `database/README_EXECUCAO.md`.

## Principais rotas

| Método | Endpoint | Acesso |
| --- | --- | --- |
| POST | `/api/auth/cadastro` | Público |
| POST | `/api/auth/login` | Público |
| GET, PUT | `/api/usuarios/me` | Autenticado |
| GET | `/api/usuarios` | Admin |
| PUT | `/api/usuarios/:id` | Admin |
| GET | `/api/categorias` | Autenticado |
| GET | `/api/categorias/:id` | Autenticado |
| POST | `/api/categorias` | Admin |
| PUT, DELETE | `/api/categorias/:id` | Admin |
| GET | `/api/ideias` | Autenticado |
| GET | `/api/ideias/ranking` | Autenticado |
| GET, POST | `/api/ideias/:id/votos` | Autenticado |
| DELETE | `/api/ideias/:id/votos` | Autenticado |
| GET, POST | `/api/ideias/:id/comentarios` | Autenticado |
| GET | `/api/ideias/:id` | Autenticado |
| POST | `/api/ideias` | Autenticado |
| PUT, DELETE | `/api/ideias/:id` | Autora ou admin; status somente admin |
| GET | `/api/comentarios/:id` | Autenticado |
| PUT, DELETE | `/api/comentarios/:id` | Autor(a) ou admin |

A exclusão de ideias é **lógica** (`excluida=true`). A exclusão de comentários é física. Não é permitido votar duas vezes na mesma ideia. A listagem de ideias aceita filtros por categoria, status e busca; o ranking ordena por votos.

### Exemplos de payload

Criar ideia, com token:

```http
POST /api/ideias
Content-Type: application/json
Authorization: Bearer <token>

{"titulo":"Oficina de Scratch","descricao":"Introdução à programação","publicoAlvo":"11 a 14 anos","categoriaId":1}
```

Login:

```http
POST /api/auth/login
Content-Type: application/json

{"email":"conta@exemplo.com","senha":"senha-da-conta"}
```

## Testes e observações

A integração principal foi validada localmente com PostgreSQL, incluindo cadastro/login, ideias, votos, comentários, perfil, categorias, usuários e mudança de status no painel admin. Esses testes manuais não substituem uma suíte automatizada ou testes de implantação.

Os modelos Sequelize em `backend/src/models/index.js` usam `underscored: true` na configuração do banco para mapear propriedades camelCase para colunas SQL snake_case. A aplicação utiliza os scripts e exemplos de `database/README_EXECUCAO.md` como referência para preparar um banco novo.
