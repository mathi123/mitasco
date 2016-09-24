DO
$body$
BEGIN
   IF NOT EXISTS (
      SELECT *
      FROM   pg_catalog.pg_user
      WHERE  usename = 'mitasco') THEN

      CREATE ROLE mitasco LOGIN PASSWORD 'mitasco';
   END IF;
END
$body$;