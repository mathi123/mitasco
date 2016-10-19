CREATE OR REPLACE FUNCTION public.func_seed_languages()
  RETURNS void
AS
$BODY$
    BEGIN

        INSERT INTO language(name_nl, code) VALUES ('Nederlands', 'nl');
        INSERT INTO language(name_nl, code) VALUES ('Frans', 'fr');
        INSERT INTO language(name_nl, code) VALUES ('Duits', 'de');
        INSERT INTO language(name_nl, code) VALUES ('Engels', 'en');

    END;
$BODY$
LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

SELECT func_seed_languages();