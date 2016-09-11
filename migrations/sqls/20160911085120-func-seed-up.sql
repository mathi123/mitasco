CREATE OR REPLACE FUNCTION public.func_seed()
  RETURNS void
AS
$BODY$
  BEGIN
        /* Insert basic group records */
        INSERT INTO groups (description) VALUES ('admin');
        INSERT INTO groups (description) VALUES ('test users');

        /* Insert basic permissioncode records */
        INSERT INTO permissioncode (code, description) VALUES ('admin', 'System administrator permissions.');
        INSERT INTO permissioncode (code, description) VALUES ('testing', 'Test permissions.');
    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

SELECT func_seed();