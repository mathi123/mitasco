CREATE OR REPLACE FUNCTION public.func_seed()
  RETURNS void
AS
$BODY$
  BEGIN
        /* Insert basic group records */
        INSERT INTO groups (description) VALUES ('admin');
        INSERT INTO groups (description) VALUES ('test users');

        /* Insert basic permissioncode records */
        INSERT INTO permissioncode (code) VALUES ('admin');
        INSERT INTO permissioncode (code) VALUES ('testing');
    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;