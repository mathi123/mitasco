CREATE TABLE company
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(300) NOT NULL,
    email VARCHAR(50),
    phone VARCHAR(50),
    cell VARCHAR(50),
    fax VARCHAR(50),
    url VARCHAR(300),
    street VARCHAR(300),
    zip VARCHAR(30),
    city VARCHAR(300),
    country_id INTEGER,
    CONSTRAINT company_country_id_fk FOREIGN KEY (country_id) REFERENCES country (id) ON DELETE SET NULL
);
CREATE UNIQUE INDEX company_id_uindex ON company (id);