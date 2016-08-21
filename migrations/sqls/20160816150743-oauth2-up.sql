
CREATE TABLE oauth_access_tokens (
    access_token text NOT NULL,
    client_id text NOT NULL,
    user_id int NOT NULL,
    expires timestamp without time zone NOT NULL
);

ALTER TABLE ONLY oauth_access_tokens
    ADD CONSTRAINT oauth_access_tokens_pkey PRIMARY KEY (access_token);

CREATE TABLE oauth_clients (
    client_id text NOT NULL,
    client_secret text NOT NULL,
    redirect_uri text NOT NULL
);

ALTER TABLE ONLY oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (client_id, client_secret);

CREATE TABLE oauth_refresh_tokens (
    refresh_token text NOT NULL,
    client_id text NOT NULL,
    user_id int NOT NULL,
    expires timestamp without time zone NOT NULL
);

ALTER TABLE ONLY oauth_refresh_tokens
    ADD CONSTRAINT oauth_refresh_tokens_pkey PRIMARY KEY (refresh_token);
