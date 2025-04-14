const { Router } = require('express');
const categoryController = require('../Controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.indexGet);
categoryRouter.get('/:category/bikes', categoryController.categoryGet);
categoryRouter.get('/new', categoryController.newCategoryGet);
categoryRouter.post('/new', categoryController.newCategoryPost);
categoryRouter.get('/:catId/update', categoryController.updateCategoryGet);
categoryRouter.post('/:catId/update', categoryController.updateCategoryPost);
categoryRouter.get('/:categoryId/delete', categoryController.deleteCategoryGet);

module.exports = categoryRouter;