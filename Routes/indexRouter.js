const { Router } = require('express');
const indexController = require('../Controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.get('/newBike', indexController.newBikeGet);

module.exports = indexRouter;