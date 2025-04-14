const { Router } = require('express');
const brandController = require('../Controllers/brandController');

const brandRouter = Router();

brandRouter.get('/', brandController.indexGet);
brandRouter.get('/:brand/bikes', brandController.brandGet);
brandRouter.get('/new', brandController.newBrandGet);
brandRouter.post('/new', brandController.newBrandPost);
brandRouter.get('/:brandId/update', brandController.updateBrandGet);
brandRouter.post('/:brandId/update', brandController.updateBrandPost);
brandRouter.get('/:brandId/delete', brandController.deleteBrandGet);

module.exports = brandRouter;