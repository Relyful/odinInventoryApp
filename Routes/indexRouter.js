const { Router } = require('express');
const indexController = require('../Controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);

module.exports = indexRouter;