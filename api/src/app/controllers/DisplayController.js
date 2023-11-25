// const DisplaysRepository = require('../repositories/DisplaysRepository');
const DisplaysRepository = require('../repositoriesMocks/DisplaysRepository');

class DisplayController {
  async index(request, response) {
    // Listar todos os registros
    const { productId } = request.query;

    const displayByProduct = await DisplaysRepository.filterByProduct(productId);

    if (productId && displayByProduct) {
      return response.json(displayByProduct);
    }

    const displays = await DisplaysRepository.findAll();
    response.json(displays);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const display = await DisplaysRepository.findById(id);

    if (!display) {
      return response.status(404).json({ error: 'Display not found' });
    }

    response.json(display);
  }

  /* async store(request, response) {
    // Criar um novo registro
    const { description, barcode } = request.body;

    if (!description) {
      return response.status(400).json({ error: 'Description is required' });
    }

    if (description.length > 50) {
      return response.status(400).json({ error:
        'Maximum number of characters of description is 50'
      });
    }

    if (!barcode) {
      return response.status(400).json({ error: 'Barcode is required' });
    }

    const productExist = await DisplaysRepository.findByBarcode(barcode);

    if (productExist) {
      return response.status(400).json({ error: 'This barcode is already in use' });
    }

    const product = await DisplaysRepository.create({ description, barcode });

    response.json(product);
  }

  async update(request, response) {
    // Editar um registro
    let { id } = request.params;
    id = Number(id);

    const {
      description, barcode,
    } = request.body;

    const productExist = await DisplaysRepository.findById(id);

    if (!productExist) {
      return response.status(404).json({ error: 'Product not found' });
    }

    if (!description) {
      return response.status(400).json({ error: 'Description is required' });
    }

    if (description.length > 50) {
      return response.status(400).json({ error: 'Maximum number of characters of description is 50' });
    }

    if (!barcode) {
      return response.status(400).json({ error: 'Barcode is required' });
    }

    const productByBarcode = await DisplaysRepository.findByBarcode(barcode);

    if (productByBarcode && productByBarcode.id !== id) {
      return response.status(400).json({ error: 'This barcode is already in use' });
    }

    const product = await DisplaysRepository.update(id, {
      description, barcode,
    });

    response.json(product);
  }

  async delete(request, response) {
    // Deletar um registro
    let { id } = request.params;
    id = Number(id);

    const product = await DisplaysRepository.findById(id);

    if (!product) {
      return response.status(404).json({ error: 'User not found' });
    }

    await DisplaysRepository.delete(id);

    response.sendStatus(204);
  } */
}

module.exports = new DisplayController();
