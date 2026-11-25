-- IdeiaLab MD — reparo pontual de textos importados com codificacao incorreta.
-- Execute no banco ideialab_md_final com cliente configurado para UTF8.
-- Corrige somente campos contendo a sequencia tipica de mojibake "Ã".
-- Nao altera IDs, votos, senhas, datas, categorias corretamente acentuadas
-- nem a coluna status (ENUM; corrigida anteriormente).

\encoding UTF8
BEGIN;

UPDATE usuarios
SET nome = convert_from(convert_to(nome, 'WIN1252'), 'UTF8')
WHERE position('Ã' in nome) > 0;

UPDATE categorias
SET nome = convert_from(convert_to(nome, 'WIN1252'), 'UTF8')
WHERE position('Ã' in nome) > 0;

UPDATE categorias
SET descricao = convert_from(convert_to(descricao, 'WIN1252'), 'UTF8')
WHERE descricao IS NOT NULL AND position('Ã' in descricao) > 0;

UPDATE ideias
SET titulo = convert_from(convert_to(titulo, 'WIN1252'), 'UTF8')
WHERE position('Ã' in titulo) > 0;

UPDATE ideias
SET descricao = convert_from(convert_to(descricao, 'WIN1252'), 'UTF8')
WHERE position('Ã' in descricao) > 0;

UPDATE ideias
SET publico_alvo = convert_from(convert_to(publico_alvo, 'WIN1252'), 'UTF8')
WHERE position('Ã' in publico_alvo) > 0;

UPDATE comentarios
SET texto = convert_from(convert_to(texto, 'WIN1252'), 'UTF8')
WHERE position('Ã' in texto) > 0;

COMMIT;
