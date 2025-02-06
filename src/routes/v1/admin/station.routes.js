import express from 'express';
import StationController from '../../../controllers/admin/station.controller.js';
import isAdminApiKey from '../../../middlewares/apiKey.middleware.js';
import authMiddleware from '../../../middlewares/verifyToken.middleware.js';

const stationRouter = express.Router();

// Public Routes
stationRouter.post('/', isAdminApiKey, StationController.create);
stationRouter.get('/', authMiddleware, StationController.getAll);
stationRouter.get('/:stationId', authMiddleware, StationController.getById);
stationRouter.put('/:stationId/location', isAdminApiKey, StationController.updateLocation);
stationRouter.delete('/:stationId', isAdminApiKey, StationController.delete);

export default stationRouter;
