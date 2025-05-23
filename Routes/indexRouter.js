const { Router } = require('express');
const indexController = require('../Controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.get('/newBike', indexController.newBikeGet);
indexRouter.post('/newBike', indexController.newBikePost);
indexRouter.get('/:bikeId/updateBike', indexController.updateBikeGet)
indexRouter.post('/:bikeId/updateBike', indexController.updateBikePost);
indexRouter.get('/allBikes', indexController.allBikesGet);
indexRouter.get('/:bikeId/deleteBike', indexController.deleteBikeGet);

module.exports = indexRouter;