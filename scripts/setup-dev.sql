DO
$body$
BEGIN
   IF NOT EXISTS (
      SELECT *
      FROM   pg_catalog.pg_user
      WHERE  usename = 'my_user') THEN

      CREATE ROLE my_user LOGIN PASSWORD 'my_password';
   END IF;
END
$body$;