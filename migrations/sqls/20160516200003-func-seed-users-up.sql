CREATE OR REPLACE FUNCTION public.func_seed_users()
  RETURNS void
AS
$BODY$
  BEGIN
        /* Clean table */
        DELETE FROM users;
    
        /* Insert basic records */
        INSERT INTO users (email) VALUES ('admin');
        INSERT INTO users (email) VALUES ('test');
    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;