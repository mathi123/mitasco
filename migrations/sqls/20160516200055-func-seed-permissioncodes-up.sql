CREATE OR REPLACE FUNCTION public.func_seed_permissioncodes()
  RETURNS void
AS
$BODY$
  BEGIN
        /* Clean table */
        DELETE FROM permissioncode;

        /* Insert basic records */
        INSERT INTO permissioncode (code) VALUES ('admin');
        INSERT INTO permissioncode (code) VALUES ('testing');
    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;