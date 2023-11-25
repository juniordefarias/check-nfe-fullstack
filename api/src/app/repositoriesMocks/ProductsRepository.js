const fs = require('fs');

const data = fs.readFileSync('src/database/mocks/produtos.csv', 'utf8');

const rows = data.split('\n');
const products = rows.map((row) => {
  const columns = row.split(';');
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

  findById(id) {
    return new Promise((resolve) => {
      resolve(products.find((product) => (
        product.id === id
      )));
    });
  }

  findByBarcode(barcode) {
    return new Promise((resolve) => {
      resolve(products.find((product) => (
        product.barcode === barcode
      )));
    });
  }
}

module.exports = new ReferencesRepository();
