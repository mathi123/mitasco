CREATE TABLE todo
(
    id SERIAL PRIMARY KEY NOT NULL,
    todo VARCHAR(50) NOT NULL,
    isDone BIT
);
CREATE UNIQUE INDEX todo_id_uindex ON todo (id);