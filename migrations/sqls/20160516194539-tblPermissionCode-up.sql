CREATE TABLE permissioncode
(
    id SERIAL PRIMARY KEY NOT NULL,
    code VARCHAR(30) NOT NULL,
    description VARCHAR(100)
);
CREATE UNIQUE INDEX permissioncode_id_uindex ON permissioncode (id);
CREATE UNIQUE INDEX permissioncode_code_uindex ON permissioncode (code);