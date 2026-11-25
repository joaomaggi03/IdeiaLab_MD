-- Tipos ENUM usados pelos modelos
CREATE TYPE perfil_enum AS ENUM ('admin', 'membro');
CREATE TYPE ideia_status_enum AS ENUM ('Em análise', 'Aprovada', 'Em execução', 'Concluída');

-- Tabela usuarios
CREATE TABLE usuarios (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome varchar(150) NOT NULL,
  email varchar(200) NOT NULL UNIQUE,
  senha_hash varchar(255) NOT NULL,
  perfil perfil_enum NOT NULL DEFAULT 'membro',
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela categorias
CREATE TABLE categorias (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome varchar(100) NOT NULL UNIQUE,
  descricao text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela ideias
CREATE TABLE ideias (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo varchar(200) NOT NULL,
  descricao text NOT NULL,
  publico_alvo varchar(120) NOT NULL,
  status ideia_status_enum NOT NULL DEFAULT 'Em análise',
  excluida boolean NOT NULL DEFAULT false,
  autora_id integer NOT NULL,
  categoria_id integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_ideias_autora FOREIGN KEY (autora_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
  CONSTRAINT fk_ideias_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);

-- Tabela votos
CREATE TABLE votos (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id integer NOT NULL,
  ideia_id integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_votos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
  CONSTRAINT fk_votos_ideia FOREIGN KEY (ideia_id) REFERENCES ideias(id) ON DELETE RESTRICT
);

-- Índice único para evitar votos duplicados por usuário/ideia
CREATE UNIQUE INDEX votos_usuario_ideia_uq ON votos (usuario_id, ideia_id);

-- Tabela comentarios
CREATE TABLE comentarios (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  texto text NOT NULL,
  usuario_id integer NOT NULL,
  ideia_id integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_comentarios_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
  CONSTRAINT fk_comentarios_ideia FOREIGN KEY (ideia_id) REFERENCES ideias(id) ON DELETE RESTRICT
);