CREATE TABLE groups
(
    id SERIAL PRIMARY KEY NOT NULL,
    description VARCHAR(100)
);
CREATE UNIQUE INDEX groups_id_uindex ON groups (id);