/* const RelationsRepository = require('../repositories/RelationsRepository'); */
const RelationsRepository = require('../repositoriesMocks/RelationsRepository');

class RelationController {
  async index(request, response) {
    // Listar todos os registros
    const { reference, cnpj } = request.query;

    const relationByReferenceCNPJ = await RelationsRepository.findByReferenceCNPJ(reference, cnpj);

    if (reference && cnpj && !relationByReferenceCNPJ) {
      return response.json({ error: 'Relation not found' });
    }

    if (reference && cnpj && relationByReferenceCNPJ) {
      return response.json(relationByReferenceCNPJ);
    }

    const relationsByCNPJ = await RelationsRepository.filterByCNPJ(cnpj);

    if (cnpj && relationsByCNPJ && relationsByCNPJ.length === 0) {
      return response.json({ error: 'CNPJ not found' });
    }

    if (cnpj && relationsByCNPJ && relationsByCNPJ.length !== 0) {
      return response.json(relationsByCNPJ);
    }

    const relationsByReference = await RelationsRepository.filterByReference(reference);
    if (relationsByReference && relationsByReference.length !== 0) {
      return response.json(relationsByReference);
    }

    const relations = await RelationsRepository.findAll();
    response.json(relations);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const relation = await RelationsRepository.findById(id);

    if (!relation) {
      return response.status(404).json({ error: 'Relation not found' });
    }

    response.json(relation);
  }

  async store(request, response) {
    // Criar um novo registro
    const {
      product_id, provider_id, reference, multiplier,
    } = request.body;

    if (!product_id) {
      return response.status(400).json({ error: 'product_id is required' });
    }
    if (!provider_id) {
      return response.status(400).json({ error: 'provider_id is required' });
    }
    if (!reference) {
      return response.status(400).json({ error: 'Reference is required' });
    }
    if (!multiplier && multiplier !== 0) {
      return response.status(400).json({ error: 'Multiplier is required' });
    }

    const relation = await RelationsRepository.create({
      product_id, provider_id, reference, multiplier,
    });

    response.json(relation);
  }

  async update(request, response) {
    // Editar um registro
    let { id } = request.params;
    id = Number(id);

    const {
      product_id, provider_id, reference, multiplier,
    } = request.body;

    const relationExist = await RelationsRepository.findById(id);

    if (!relationExist) {
      return response.status(404).json({ error: 'Relation not found' });
    }

    if (!product_id) {
      return response.status(400).json({ error: 'product_id is required' });
    }
    if (!provider_id) {
      return response.status(400).json({ error: 'provider_id is required' });
    }
    if (!reference) {
      return response.status(400).json({ error: 'Reference is required' });
    }
    if (!multiplier && multiplier !== 0) {
      return response.status(400).json({ error: 'Multiplier is required' });
    }

    const relation = await RelationsRepository.update(id, {
      product_id, provider_id, reference, multiplier,
    });

    response.json(relation);
  }

  async delete(request, response) {
    // Deletar um registro
    let { id } = request.params;
    id = Number(id);

    await RelationsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new RelationController();
