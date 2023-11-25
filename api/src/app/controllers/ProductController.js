// const ProductsRepository = require('../repositories/ProductsRepository');
const ProductsRepository = require('../repositoriesMocks/ProductsRepository');

class ProductController {
  async index(request, response) {
    // Listar todos os registros
    const { barcode } = request.query;

    const productByBarcode = await ProductsRepository.findByBarcode(barcode);

    if (barcode && productByBarcode) {
      return response.json(productByBarcode);
    }

    const products = await ProductsRepository.findAll();
    response.json(products);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }

    response.json(product);
  }

  async store(request, response) {
    // Criar um novo registro
    const { description, barcode } = request.body;

    if (!description) {
      return response.status(400).json({ error: 'Description is required' });
    }

    if (description.length > 50) {
      return response.status(400).json({ error: 'Maximum number of characters of description is 50' });
    }

    if (!barcode) {
      return response.status(400).json({ error: 'Barcode is required' });
    }

    const productExist = await ProductsRepository.findByBarcode(barcode);

    if (productExist) {
      return response.status(400).json({ error: 'This barcode is already in use' });
    }

    const product = await ProductsRepository.create({ description, barcode });

    response.json(product);
  }

  async update(request, response) {
    // Editar um registro
    let { id } = request.params;
    id = Number(id);

    const {
      description, barcode,
    } = request.body;

    const productExist = await ProductsRepository.findById(id);

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

    const productByBarcode = await ProductsRepository.findByBarcode(barcode);

    if (productByBarcode && productByBarcode.id !== id) {
      return response.status(400).json({ error: 'This barcode is already in use' });
    }

    const product = await ProductsRepository.update(id, {
      description, barcode,
    });

    response.json(product);
  }

  async delete(request, response) {
    // Deletar um registro
    let { id } = request.params;
    id = Number(id);

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return response.status(404).json({ error: 'User not found' });
    }

    await ProductsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ProductController();
