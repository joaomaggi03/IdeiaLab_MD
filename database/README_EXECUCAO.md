# Banco de dados — IdeiaLab MD

Os scripts SQL são para **PostgreSQL** e foram integrados à API Node.js + Sequelize.

## Banco novo (recomendado para demonstração)

1. No pgAdmin ou `psql`, crie um banco vazio chamado `ideialab_md_final`.
2. Conecte-se a ele e execute `first_query.sql` **uma única vez**.
3. Opcionalmente, execute `seeding.sql` **uma única vez**. Ele cria contas e ideias fictícias. A senha **apenas dessas contas de teste** é `IdeiaLab123!`.
4. Configure `backend/.env` com `DB_NAME=ideialab_md_final`, seu usuário e senha do PostgreSQL, `PORT=3001`, `FRONTEND_URL=http://localhost:5173` e `DB_SYNC=false`.
5. Defina um `JWT_SECRET` aleatório com pelo menos 32 caracteres no `.env`.
6. Rode `npm install` e `npm start` dentro da pasta `backend`.

Para criar sua própria conta administradora, em um terminal PowerShell, dentro do backend:

```powershell
$env:ADMIN_NOME = 'Coordenação Meninas Digitais'
$env:ADMIN_EMAIL = 'coordenacao@exemplo.com'
$env:ADMIN_PASSWORD = 'escolha-uma-senha-forte'
npm run admin:init
Remove-Item Env:ADMIN_PASSWORD
```

A conta criada pelo cadastro público tem sempre perfil `membro`; somente a administração pode promover usuários.

## Banco anterior dos testes

**Não execute `first_query.sql` sobre o banco `ideialab_md` que já contém tabelas.** O script usa CREATE TABLE/TYPE e falhará se os objetos já existirem. As tabelas desse projeto seguem o mesmo esquema de nomes e campos dos modelos já utilizados. Para não perder dados, mantenha o banco anterior e use o banco novo para testar a versão final. Não habilite `DB_SYNC=true` ao usar os scripts SQL.

Os modelos Sequelize usam `define: { underscored: true }`, mapeando `createdAt` para `created_at`, `senhaHash` para `senha_hash`, etc. Não substitua o `database.js` por um que remova essa opção.

**Atenção:** os hashes no `seeding.sql` original da branch `database` eram apenas placeholders. Esta versão utiliza hashes bcrypt válidos para demonstração. Não reutilize essas credenciais em uma implantação real.
