CREATE TABLE todo
(
    id SERIAL PRIMARY KEY NOT NULL,
    description VARCHAR(50) NOT NULL,
    isDone BIT
);
CREATE UNIQUE INDEX todo_id_uindex ON todo (id);