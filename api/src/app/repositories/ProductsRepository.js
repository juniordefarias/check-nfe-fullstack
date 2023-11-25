const fs = require('fs');
const db = require('../../database');

const data = fs.readFileSync('src/mocks/PRICETAB.txt', 'utf8');

const rows = data.split('\r\n');
const products = rows.map((row) => {
  const columns = row.split('|');
  return {
    id: columns[0],
    description: columns[1],
    barcode: columns[2],
  };
});

class ReferencesRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(products);
    });
  }
  /* async findAll() {
    const rows = await db.query(`
      SELECT * FROM products
    `);

    return rows;
  } */

  findById(id) {
    return new Promise((resolve) => {
      resolve(products.find((product) => (
        product.id === id
      )));
    });
  }
  /* async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM products WHERE id = $1
    `, [id]);

    return row;
  } */

  findByBarcode(barcode) {
    return new Promise((resolve) => {
      resolve(products.find((product) => (
        product.barcode === barcode
      )));
    });
  }
  /* async findByBarcode(barcode) {
    const [row] = await db.query(`
      SELECT * FROM products WHERE barcode = $1
    `, [barcode]);

    return row;
  } */

  async create({
    description, barcode,
  }) {
    const [row] = await db.query(`
      INSERT INTO products(description, barcode)
      VALUES($1, $2)
      RETURNING *
    `, [description, barcode]);

    return row;
  }

  async update(id, {
    description, barcode,
  }) {
    const [row] = await db.query(`
      UPDATE products
      SET description = $1, barcode = $2
      WHERE id = $3
      RETURNING *
    `, [description, barcode, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM products WHERE id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new ReferencesRepository();
