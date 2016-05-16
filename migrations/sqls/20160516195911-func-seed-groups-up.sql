CREATE OR REPLACE FUNCTION public.func_seed_groups()
  RETURNS void
AS
$BODY$
  BEGIN
        /* Clean table */
        DELETE FROM groups;
    
        /* Insert basic records */
        INSERT INTO groups (description) VALUES ('admin');
        INSERT INTO groups (description) VALUES ('test users');
    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;