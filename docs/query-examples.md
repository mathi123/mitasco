// Query examples

CREATE TABLE xxx
(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(50) NOT NULL,
    fullname VARCHAR(300)
);
CREATE UNIQUE INDEX xxx_id_uindex ON users (id);
CREATE UNIQUE INDEX xxx_email_uindex ON users (email);

DROP TABLE users;