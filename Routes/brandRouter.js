const { Router } = require('express');
const brandController = require('../Controllers/brandController');

const brandRouter = Router();

brandRouter.get('/', brandController.indexGet);
brandRouter.get('/:brand', brandController.brandGet)

module.exports = brandRouter;