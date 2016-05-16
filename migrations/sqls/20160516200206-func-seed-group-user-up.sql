CREATE OR REPLACE FUNCTION public.func_seed_group_user()
  RETURNS void
AS
$BODY$
  BEGIN
        /* Clean table */
    
        /* Insert basic records */
        INSERT INTO group_user (group_id, user_id) VALUES 
          ((SELECT id from groups where description = 'admin' LIMIT 1), 
          (SELECT id from users where email = 'admin' LIMIT 1));
    
        INSERT INTO group_user (group_id, user_id) VALUES 
              ((SELECT id from groups where description = 'test users' LIMIT 1), 
              (SELECT id from users where email = 'admin' LIMIT 1));
    
        INSERT INTO group_user (group_id, user_id) VALUES 
              ((SELECT id from groups where description = 'test users' LIMIT 1), 
              (SELECT id from users where email = 'test' LIMIT 1));
    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;