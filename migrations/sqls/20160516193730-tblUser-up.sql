CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(50) NOT NULL,
    fullname VARCHAR(300)
);
CREATE UNIQUE INDEX users_id_uindex ON users (id);
CREATE UNIQUE INDEX users_email_uindex ON users (email);