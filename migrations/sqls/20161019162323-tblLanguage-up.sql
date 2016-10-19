CREATE TABLE language
(
    id SERIAL PRIMARY KEY NOT NULL,
    code VARCHAR(2) NOT NULL,
    name_nl VARCHAR(300) NOT NULL
);
CREATE UNIQUE INDEX language_id_uindex ON language (id);
CREATE UNIQUE INDEX language_code_uindex ON language (code);