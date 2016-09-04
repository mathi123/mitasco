CREATE TABLE group_permission
(
    id SERIAL PRIMARY KEY NOT NULL,
    group_id INTEGER NOT NULL,
    permissioncode_id INTEGER NOT NULL,
    CONSTRAINT group_permission_groups_id_fk FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE,
    CONSTRAINT group_permission_permissioncode_id_fk FOREIGN KEY (permissioncode_id) REFERENCES permissioncode (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX group_permission_id_uindex ON group_permission (id);