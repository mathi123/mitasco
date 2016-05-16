CREATE TABLE token
(
    token UUID PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    validuntil TIMESTAMP NOT NULL,
    CONSTRAINT token_users_id_fk FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE UNIQUE INDEX token_token_uindex ON token (token);