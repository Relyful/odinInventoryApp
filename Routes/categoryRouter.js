const { Router } = require('express');
const categoryController = require('../Controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.indexGet);
categoryRouter.get('/:category', categoryController.categoryGet);

module.exports = categoryRouter;