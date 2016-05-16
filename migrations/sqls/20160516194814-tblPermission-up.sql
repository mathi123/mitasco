CREATE TABLE permission
(
    user_id INTEGER NOT NULL,
    permissioncode_id INTEGER PRIMARY KEY NOT NULL,
    permission BIT NOT NULL,
    CONSTRAINT permission_users_id_fk FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT permission_permissioncode_id_fk FOREIGN KEY (permissioncode_id) REFERENCES permissioncode (id)
);