const { Router } = require('express');
const brandController = require('../Controllers/brandController');

const brandRouter = Router();

brandRouter.get('/', brandController.brandGet);

module.exports = brandRouter;