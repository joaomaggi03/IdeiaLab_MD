# Back-end do IdeiaLab MD — Filipe Nogueira

## Escopo e preservação
Todos os arquivos de código adicionados estão dentro de `backend/`. **Nenhum arquivo em `frontend/` foi alterado.** Este pacote inclui uma proposta de modelos Sequelize apenas para possibilitar o funcionamento local. **Antes de integrar no repositório principal, alinhe o esquema com Rafael**, responsável pelos modelos e banco de dados. Não execute migrations, `sync({alter:true})` ou `sync({force:true})` em banco compartilhado.

## Rodar localmente
1. Instalar Node.js e PostgreSQL.
2. Criar no PostgreSQL um banco vazio chamado `ideialab_md` (ou usar um banco de TESTES à parte).
3. No VS Code, abrir terminal dentro da pasta `backend`.
4. Executar `npm install`.
5. Copiar `.env.example` para `.env` e completar credenciais do PostgreSQL, senha e `JWT_SECRET` (mínimo 32 caracteres).
6. **Somente no banco local vazio**, colocar `DB_SYNC=true` para criar as tabelas de teste. No banco de Rafael, manter `DB_SYNC=false` e alinhar os modelos.
7. Executar `npm run dev` e visitar `http://localhost:3001/api/health`.
8. Para login/cadastro, usar Thunder Client ou Insomnia. As rotas protegidas exigem `Authorization: Bearer SEU_TOKEN`.

**Nota:** A interface React utiliza Vite (`npm run dev`, porta padrão 5173). O README inicial do projeto traz instruções genéricas e não atualizadas para a interface.

## Endpoints
| Método | Caminho | Permissão |
| --- | --- | --- |
| POST | /api/auth/cadastro | público, cria membro |
| POST | /api/auth/login | público, recebe token JWT |
| GET, PUT | /api/usuarios/me | autenticada |
| GET | /api/usuarios | admin |
| PUT | /api/usuarios/:id | admin (perfil/ativo) |
| GET | /api/categorias | autenticada |
| GET | /api/categorias/:id | autenticada |
| POST, PUT, DELETE | /api/categorias, /api/categorias/:id | admin |
| GET | /api/ideias | autenticada (filtros: categoriaId, status, busca, ordenar=votos) |
| GET | /api/ideias/ranking | autenticada |
| GET | /api/ideias/:id | autenticada |
| POST | /api/ideias | autenticada |
| PUT, DELETE | /api/ideias/:id | autora ou admin (status só admin) |
| GET, POST, DELETE | /api/ideias/:id/votos | autenticada, um voto por usuária |
| GET, POST | /api/ideias/:id/comentarios | autenticada |
| GET, PUT, DELETE | /api/comentarios/:id | autenticada; alteração/exclusão autora ou admin |

**DELETE de ideia é lógico**, pelo campo `excluida`. **DELETE de comentário e de categoria é físico**; categoria em uso não pode ser apagada. Votação usa `POST` para votar e `DELETE` para retirar voto; `PUT` em voto não faz sentido porque não há dados editáveis. A restrição de unicidade no banco impede duplicidade mesmo em duas requisições simultâneas.

## Exemplos de testes no Thunder Client
1. `POST http://localhost:3001/api/auth/cadastro` com JSON `{"nome":"Teste","email":"teste@example.com","senha":"senha1234"}`.
2. `POST http://localhost:3001/api/auth/login` com JSON `{"email":"teste@example.com","senha":"senha1234"}`. Copie `token`.
3. `GET http://localhost:3001/api/ideias` com `Authorization: Bearer <token>`.
4. Para cadastrar ideias, uma categoria precisa existir (somente admin pode criar). Peça a Rafael/coordenação que configure a primeira conta administrativa em um banco de testes de maneira segura; o cadastro público não pode conceder permissão de admin.
5. `POST /api/ideias` com JSON `{"titulo":"Oficina Scratch","descricao":"Introdução à lógica de programação","publicoAlvo":"11 a 14 anos","categoriaId":1}`.
6. `POST /api/ideias/1/votos` sem corpo; repetir retorna 409. `GET /api/ideias/ranking` lista as ideias priorizadas.
7. `POST /api/ideias/1/comentarios` com JSON `{"texto":"Ótima proposta!"}`.

## Contrato para integração com React
API base: `http://localhost:3001/api`. Os componentes React existentes ainda estão com valores estáticos e não consomem a API; **não é possível dizer que a comunicação foi integrada sem editar esses componentes**. Combine com Claudinei a ligação das páginas à API. Para login, salvar/gerenciar token de forma adequada para o ambiente; em requisições autenticadas enviar `Authorization: Bearer <token>`. Vite normalmente roda em `http://localhost:5173`, origem liberada por `FRONTEND_URL`.

## Próximas revisões com o grupo
- Rafael: confirmar nomes e tipos de campos, índices, relacionamentos e migrações. Não usar `DB_SYNC=true` no banco dele.
- Claudinei: adaptar formulários, listagens e detalhes que hoje têm dados fixos; verificar em especial imports de imagens e nomes de campos.
- Grupo: definir como provisionar a primeira usuária administradora, política de edição/exclusão e regras finais de votação.
- Segurança para produção: testes automatizados, política de senha, HTTPS, controle de sessão, gerenciamento de segredo e validação de implantação.
