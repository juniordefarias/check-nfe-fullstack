CREATE DATABASE stock;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  description VARCHAR(50) NOT NULL,
  barcode VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE providers (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  cnpj VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE products_providers (
  id  SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  provider_id INTEGER NOT NULL,
  reference VARCHAR NOT NULL,
  multiplier NUMERIC(15, 3) DEFAULT 0 NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id),
  FOREIGN KEY(provider_id) REFERENCES providers(id)
);
