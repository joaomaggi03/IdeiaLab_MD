-- Ajusta apenas os rótulos do ENUM de status que possam ter sido importados
-- com codificação incorreta. Não recria tabelas nem apaga registros.
DO $ideialab$
DECLARE
    item RECORD;
    corrigido TEXT;
BEGIN
    FOR item IN
        SELECT e.enumlabel::text AS antigo
        FROM pg_enum e
        JOIN pg_type t ON t.oid = e.enumtypid
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = 'public' AND t.typname = 'ideia_status_enum'
    LOOP
        IF item.antigo NOT IN ('Em análise', 'Aprovada', 'Em execução', 'Concluída') THEN
            corrigido := NULL;
            BEGIN
                corrigido := convert_from(convert_to(item.antigo, 'WIN1252'), 'UTF8');
            EXCEPTION WHEN others THEN
                -- Não altera rótulos desconhecidos.
                corrigido := NULL;
            END;
            IF corrigido IN ('Em análise', 'Aprovada', 'Em execução', 'Concluída')
               AND corrigido <> item.antigo THEN
                EXECUTE format('ALTER TYPE public.ideia_status_enum RENAME VALUE %L TO %L', item.antigo, corrigido);
                RAISE NOTICE 'Status corrigido: % -> %', item.antigo, corrigido;
            END IF;
        END IF;
    END LOOP;
END
$ideialab$;

-- Mostra os valores disponíveis após a correção.
SELECT enumlabel AS status_disponivel
FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
WHERE t.typname = 'ideia_status_enum' ORDER BY enumsortorder;
