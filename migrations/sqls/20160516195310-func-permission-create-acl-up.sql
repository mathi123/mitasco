CREATE OR REPLACE FUNCTION public.func_permission_create_acl()
  RETURNS void
AS
$BODY$
  BEGIN
        /* Clean table */
        DELETE FROM permission;
    
        /* Insert basic records */
        INSERT INTO permission (user_id, permissioncode_id, permission)
          SELECT a.id, b.id, '0' FROM users a CROSS JOIN permissioncode b;
        
        /* Update permission */
        with a as
          (SELECT a.permissioncode_id, c.user_id FROM group_permission a
            JOIN groups b ON a.group_id = b.id
            JOIN group_user c on b.id = c.group_id)
        UPDATE permission d
        SET permission = '1' 
        FROM a
        WHERE d.user_id = a.user_id AND d.permissioncode_id = a.permissioncode_id;
          
    
    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;