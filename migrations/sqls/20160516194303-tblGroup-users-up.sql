CREATE TABLE group_user
(
    id SERIAL PRIMARY KEY NOT NULL,
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT group_user_groups_id_fk FOREIGN KEY (group_id) REFERENCES groups (id),
    CONSTRAINT group_user_users_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE UNIQUE INDEX group_user_id_uindex ON group_user (id);