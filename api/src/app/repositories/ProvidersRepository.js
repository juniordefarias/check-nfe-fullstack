const db = require('../../database');

class ReferencesRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM providers
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM providers WHERE id = $1
    `, [id]);

    return row;
  }

  async findByCNPJ(cnpj) {
    const [row] = await db.query(`
      SELECT * FROM providers WHERE cnpj = $1
    `, [cnpj]);

    return row;
  }

  async create({ name, cnpj }) {
    const [row] = await db.query(`
      INSERT INTO providers(name, cnpj)
      VALUES($1, $2)
      RETURNING *
    `, [name, cnpj]);

    return row;
  }

  async update(id, {
    name, cnpj,
  }) {
    const [row] = await db.query(`
      UPDATE providers
      SET name = $1, cnpj = $2
      WHERE id = $3
      RETURNING *
    `, [name, cnpj, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM providers WHERE id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new ReferencesRepository();
