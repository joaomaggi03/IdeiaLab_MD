
BEGIN;

-- 1. USUÁRIOS
INSERT INTO usuarios (nome, email, senha_hash, perfil, ativo)
VALUES
  ('Ana Souza', 'ana.teste@ideialab.local', '$2b$10$hashFicticioAna', 'membro', true),
  ('Bruno Lima', 'bruno.teste@ideialab.local', '$2b$10$hashFicticioBruno', 'membro', true),
  ('Carla Mendes', 'carla.teste@ideialab.local', '$2b$10$hashFicticioCarla', 'membro', true),
  ('Admin Teste', 'admin.teste@ideialab.local', '$2b$10$hashFicticioAdmin', 'admin', true);

-- 2. CATEGORIAS
INSERT INTO categorias (nome, descricao)
VALUES
  ('Tecnologia', 'Soluções digitais e inovação tecnológica'),
  ('Educação', 'Ideias para melhorar o ensino e a aprendizagem'),
  ('Sustentabilidade', 'Projetos voltados ao meio ambiente'),
  ('Saúde', 'Iniciativas para promover saúde e bem-estar');

-- 3. IDEIAS
-- Os IDs abaixo pressupõem que o banco estava vazio.
-- Se já houver registros, veja a observação após o script.
INSERT INTO ideias
  (titulo, descricao, publico_alvo, status, autora_id, categoria_id)
VALUES
  (
    'Plataforma de monitoria acadêmica',
    'Aplicação para conectar estudantes que precisam de ajuda com colegas que dominam determinadas disciplinas.',
    'Estudantes universitários',
    'Em análise',
    (SELECT id FROM usuarios WHERE email = 'ana.teste@ideialab.local'),
    (SELECT id FROM categorias WHERE nome = 'Educação')
  ),
  (
    'Mapa de descarte sustentável',
    'Sistema para localizar pontos de coleta seletiva e descarte correto de resíduos.',
    'Moradores da cidade',
    'Aprovada',
    (SELECT id FROM usuarios WHERE email = 'bruno.teste@ideialab.local'),
    (SELECT id FROM categorias WHERE nome = 'Sustentabilidade')
  ),
  (
    'Aplicativo de organização de estudos',
    'Ferramenta para planejar horários, acompanhar metas e registrar o progresso dos estudos.',
    'Estudantes',
    'Em execução',
    (SELECT id FROM usuarios WHERE email = 'carla.teste@ideialab.local'),
    (SELECT id FROM categorias WHERE nome = 'Tecnologia')
  ),
  (
    'Agenda de campanhas de saúde',
    'Plataforma para divulgar campanhas de vacinação, prevenção e atendimento comunitário.',
    'Comunidade local',
    'Concluída',
    (SELECT id FROM usuarios WHERE email = 'ana.teste@ideialab.local'),
    (SELECT id FROM categorias WHERE nome = 'Saúde')
  );

-- 4. VOTOS
-- Cada usuário pode votar uma única vez em cada ideia.
INSERT INTO votos (usuario_id, ideia_id)
SELECT u.id, i.id
FROM (
  VALUES
    ('ana.teste@ideialab.local', 'Mapa de descarte sustentável'),
    ('ana.teste@ideialab.local', 'Aplicativo de organização de estudos'),
    ('bruno.teste@ideialab.local', 'Plataforma de monitoria acadêmica'),
    ('bruno.teste@ideialab.local', 'Agenda de campanhas de saúde'),
    ('carla.teste@ideialab.local', 'Plataforma de monitoria acadêmica'),
    ('carla.teste@ideialab.local', 'Mapa de descarte sustentável'),
    ('admin.teste@ideialab.local', 'Aplicativo de organização de estudos')
) AS dados(email, titulo)
JOIN usuarios u ON u.email = dados.email
JOIN ideias i ON i.titulo = dados.titulo;

-- 5. COMENTÁRIOS
INSERT INTO comentarios (texto, usuario_id, ideia_id)
SELECT dados.texto, u.id, i.id
FROM (
  VALUES
    (
      'A ideia pode ajudar bastante os estudantes.',
      'bruno.teste@ideialab.local',
      'Plataforma de monitoria acadêmica'
    ),
    (
      'Seria interessante incluir um mapa interativo.',
      'carla.teste@ideialab.local',
      'Mapa de descarte sustentável'
    ),
    (
      'Uma integração com calendário seria muito útil.',
      'ana.teste@ideialab.local',
      'Aplicativo de organização de estudos'
    ),
    (
      'A divulgação das campanhas é um ótimo diferencial.',
      'bruno.teste@ideialab.local',
      'Agenda de campanhas de saúde'
    )
) AS dados(texto, email, titulo)
JOIN usuarios u ON u.email = dados.email
JOIN ideias i ON i.titulo = dados.titulo;

COMMIT;
