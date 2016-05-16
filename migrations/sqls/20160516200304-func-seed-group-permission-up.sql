CREATE OR REPLACE FUNCTION public.func_seed_group_permission()
  RETURNS void
AS
$BODY$
  BEGIN
        /* Clean table */
    
        /* Insert basic records */
        INSERT INTO group_permission (group_id, permissioncode_id) VALUES 
          ((SELECT id from groups where description = 'admin' LIMIT 1), 
          (SELECT id from permissioncode where code = 'admin' LIMIT 1));
    
        INSERT INTO group_permission (group_id, permissioncode_id) VALUES 
          ((SELECT id from groups where description = 'test users' LIMIT 1), 
          (SELECT id from permissioncode where code = 'testing' LIMIT 1));
    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;