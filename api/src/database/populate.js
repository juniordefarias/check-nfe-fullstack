const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'stock',
});

client.connect();

/* client.query('SELECT COUNT(*) FROM products').then(console.log); */

const fs = require('fs');

// products
const data = fs.readFileSync('src/database/products.csv', 'utf-8');

/* // providers
const data = fs.readFileSync('src/database/providers.csv', 'utf-8'); */

/* // relations
const data = fs.readFileSync('src/database/relations.csv', 'utf-8'); */

const rows = data.split('\n');

/* client.query('SELECT * FROM products'); */

/* client.query(`
COPY products(description, barcode) FROM  */
/* 'C:\JUNIOR-PC\Downloads\produtos.csv' DELIMITER ';' CSV HEADER
`); */

// products
rows.forEach((row) => {
  const columns = row.split(';');

  client.query(`
    INSERT INTO products(id, description, barcode)
    VALUES($1 ,$2, $3)
  `, [Number(columns[0]), columns[1], columns[2]])
    .catch(console.error);
});

/* // providers
rows.forEach((row) => {
  const columns = row.split(';');

  client.query(`
    INSERT INTO providers(id, name, cnpj)
    VALUES($1 ,$2, $3)
  `, [Number(columns[0]), columns[1], columns[2]])
    .catch(console.error);
}); */

/* //relations
rows.forEach((row) => {
  const columns = row.split(';');

  client.query(`
    INSERT INTO products_providers(id, product_id, provider_id, reference, multiplier)
    VALUES($1, $2, $3, $4, $5)
  `, [Number(columns[0]), Number(columns[1]), Number(columns[2]), columns[3], Number(columns[4])]);
}); */

console.log('its done');
