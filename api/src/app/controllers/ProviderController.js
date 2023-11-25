/* const ProvidersRepository = require('../repositories/ProvidersRepository'); */
const ProvidersRepository = require('../repositoriesMocks/ProvidersRepository');

class ProviderController {
  async index(request, response) {
    const { cnpj } = request.query;

    const providerByCNPJ = await ProvidersRepository.findByCNPJ(cnpj);

    if (providerByCNPJ) {
      return response.json(providerByCNPJ);
    }

    const providers = await ProvidersRepository.findAll();
    response.json(providers);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const provider = await ProvidersRepository.findById(id);

    if (!provider) {
      return response.status(404).json({ error: 'Provider not found' });
    }

    response.json(provider);
  }

  async store(request, response) {
    const { name, cnpj } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!cnpj) {
      return response.status(400).json({ error: 'cnpj is required' });
    }

    if (cnpj.length !== 14) {
      return response.status(400).json({ error: `Number of characters of cnpj is ${cnpj.length}` });
    }

    const providerExist = await ProvidersRepository.findByCNPJ(cnpj);

    if (providerExist) {
      return response.status(400).json({ error: 'This cnpj is already in use' });
    }

    const provider = await ProvidersRepository.create({ name, cnpj });

    response.json(provider);
  }

  async update(request, response) {
    // Editar um registro
    let { id } = request.params;
    id = Number(id);

    const { name, cnpj } = request.body;

    const providerExist = await ProvidersRepository.findById(id);

    if (!providerExist) {
      return response.status(404).json({ error: 'Provider not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (!cnpj) {
      return response.status(400).json({ error: 'CNPJ is required' });
    }

    if (cnpj.length !== 14) {
      return response.status(400).json({ error: `Number of characters of cnpj is ${cnpj.length}` });
    }

    const providerByCNPJ = await ProvidersRepository.findByCNPJ(cnpj);

    if (providerByCNPJ && providerByCNPJ.id !== id) {
      return response.status(400).json({ error: 'This cnpj is already in use' });
    }

    const provider = await ProvidersRepository.update(id, {
      name, cnpj,
    });

    response.json(provider);
  }

  async delete(request, response) {
    // Deletar um registro
    let { id } = request.params;
    id = Number(id);

    const provider = await ProvidersRepository.findById(id);

    if (!provider) {
      return response.status(404).json({ error: 'Provider not found' });
    }

    await ProvidersRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ProviderController();
