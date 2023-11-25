const db = require('../../database');

class RelationRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT products_providers.*,
      products.description AS product_description,
      products.barcode AS product_barcode,
      providers.name AS provider_name,
      providers.cnpj AS provider_cnpj
      FROM products_providers
      JOIN products ON products.id = products_providers.product_id
      JOIN providers ON providers.id = products_providers.provider_id
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT products_providers.*,
      products.description AS product_description,
      products.barcode AS product_barcode,
      providers.name AS provider_name,
      providers.cnpj AS provider_cnpj
      FROM products_providers
      JOIN products ON products.id = products_providers.product_id
      JOIN providers ON providers.id = products_providers.provider_id
      WHERE products_providers.id = $1
    `, [id]);

    return row;
  }

  async findByReference(reference) {
    const rows = await db.query(`
    SELECT products_providers.*,
    products.description AS product_description,
    products.barcode AS product_barcode,
    providers.name AS provider_name,
    providers.cnpj AS provider_cnpj
    FROM products_providers
    JOIN products ON products.id = products_providers.product_id
    JOIN providers ON providers.id = products_providers.provider_id
    WHERE products_providers.reference = $1
  `, [reference]);

    return rows;
  }

  async findByCNPJ(cnpj) {
    const rows = await db.query(`
    SELECT products_providers.*,
    products.description AS product_description,
    products.barcode AS product_barcode,
    providers.name AS provider_name,
    providers.cnpj AS provider_cnpj
    FROM products_providers
    JOIN products ON products.id = products_providers.product_id
    JOIN providers ON providers.cnpj = $1
    `, [cnpj]);

    return rows;
  }

  async findByReferenceCNPJ(reference, cnpj) {
    const [row] = await db.query(`
    SELECT products_providers.*,
    products.description AS product_description,
    products.barcode AS product_barcode,
    providers.name AS provider_name,
    providers.cnpj AS provider_cnpj
    FROM products_providers
    JOIN products ON products.id = products_providers.product_id
    JOIN providers ON providers.cnpj = $2
    WHERE products_providers.reference = $1
    `, [reference, cnpj]);

    return row;
  }

  async create({
    product_id, provider_id, reference, multiplier,
  }) {
    const [row] = await db.query(`
      INSERT INTO products_providers(product_id, provider_id, reference, multiplier)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [product_id, provider_id, reference, multiplier]);

    return row;
  }

  async update(id, {
    product_id, provider_id, reference, multiplier,
  }) {
    const [row] = await db.query(`
      UPDATE products_providers
      SET product_id = $1, provider_id = $2, reference = $3, multiplier = $4
      WHERE id = $5
      RETURNING *
    `, [product_id, provider_id, reference, multiplier, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM products_providers WHERE id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new RelationRepository();
