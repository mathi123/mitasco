
CREATE TABLE country
(
    id SERIAL PRIMARY KEY NOT NULL,
    code VARCHAR(2) NOT NULL,
    name_nl VARCHAR(300) NOT NULL,
    priority BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE UNIQUE INDEX country_id_uindex ON country (id);
CREATE UNIQUE INDEX country_code_uindex ON country (code);
