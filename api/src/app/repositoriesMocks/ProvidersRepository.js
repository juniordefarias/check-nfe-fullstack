const fs = require('fs');

const data = fs.readFileSync('src/database/mocks/fornecedores.csv', 'utf8');

const rows = data.split('\n');
const providers = rows.map((row) => {
  const columns = row.split(';');
  return {
    id: columns[0],
    name: columns[1],
    cnpj: columns[2],
  };
});

class ReferencesRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(providers);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(providers.find((provider) => (
        provider.id === id
      )));
    });
  }

  findByCNPJ(cnpj) {
    return new Promise((resolve) => {
      resolve(providers.find((provider) => (
        provider.cnpj === cnpj
      )));
    });
  }
}

module.exports = new ReferencesRepository();
