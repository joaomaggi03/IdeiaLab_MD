# IdeiaLab MD — Frontend

Frontend da plataforma **IdeiaLab MD**, desenvolvida para centralizar, organizar e acompanhar ideias relacionadas ao projeto **Meninas Digitais**.

A aplicação permite futuramente cadastrar ideias, visualizar propostas, votar, acompanhar status e interagir com os conteúdos da plataforma.

---

## 🚀 Tecnologias

* React
* Vite
* JavaScript
* HTML5
* CSS3
* React Router
* Google Fonts

---

## 📁 Estrutura do projeto

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── logo-ideialab.png
│   │
│   ├── components/
│   │
│   ├── pages/
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   │
│   │   ├── Cadastro/
│   │   ├── Listagem/
│   │   ├── Detalhe/
│   │   ├── NovaIdeia/
│   │   ├── Perfil/
│   │   └── Admin/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🎨 Interface

A interface do IdeiaLab MD foi desenvolvida com base no protótipo criado no Figma, buscando manter uma identidade visual consistente entre as telas da aplicação.

As telas planejadas incluem:

* Login
* Cadastro
* Listagem de ideias
* Detalhamento de uma ideia
* Nova ideia
* Perfil
* Administração

---

## ▶️ Como executar

### 1. Instalar as dependências

Dentro da pasta `frontend`, execute:

```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Após iniciar, o Vite disponibilizará a aplicação em um endereço semelhante a:

```text
http://localhost:5173
```

---

## 🔗 Arquitetura do projeto

O frontend será responsável pela interface e interação com o usuário.

A arquitetura planejada é:

```text
React + Vite
      │
      │ HTTP / API
      ▼
Backend Node.js + Express
      │
      ▼
PostgreSQL
```

O frontend não terá acesso direto ao banco de dados. A comunicação será realizada através da API disponibilizada pelo backend.

---

## 🧩 Desenvolvimento

O projeto está sendo desenvolvido de forma modular, separando cada tela e seus respectivos estilos.

Exemplo:

```text
pages/
└── Login/
    ├── Login.jsx
    └── Login.css
```

Essa organização facilita a manutenção e a evolução da aplicação.

---

## 📌 Status

### Login

* [x] Estrutura da tela
* [x] Painel de apresentação
* [x] Logo
* [x] Campos de e-mail e senha
* [x] Recuperação de senha
* [x] Botão de login
* [x] Divisor
* [x] Link de cadastro
* [x] Estilização baseada no Figma

### Próximas telas

* [ ] Cadastro
* [ ] Listagem de ideias
* [ ] Detalhamento de ideia
* [ ] Nova ideia
* [ ] Perfil
* [ ] Administração

---

## 👥 Projeto

**IdeiaLab MD**

Projeto relacionado ao **Meninas Digitais**, desenvolvido como uma plataforma para organização e gerenciamento de ideias.

---

## 📄 Licença

Projeto acadêmico.
