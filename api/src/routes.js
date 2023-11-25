const { Router } = require('express');
const ProductController = require('./app/controllers/ProductController');
const ProviderController = require('./app/controllers/ProviderController');

const RelationController = require('./app/controllers/RelationController');

const DisplayController = require('./app/controllers/DisplayController');

const router = Router();

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

router.get('/providers', ProviderController.index);
router.get('/providers/:id', ProviderController.show);
router.post('/providers', ProviderController.store);
router.put('/providers/:id', ProviderController.update);
router.delete('/providers/:id', ProviderController.delete);

router.get('/relations', RelationController.index);
router.get('/relations/:id', RelationController.show);
router.post('/relations', RelationController.store);
router.put('/relations/:id', RelationController.update);
router.delete('/relations/:id', RelationController.delete);

router.get('/displays', DisplayController.index);
router.get('/displays/:id', DisplayController.show);

module.exports = router;
