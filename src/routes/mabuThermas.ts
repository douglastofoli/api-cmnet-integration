import { Router } from 'express';

import Auth from '../middlewares/Auth';

import MabuThermasDreController from '../controllers/MabuThermas/DreController';

const routes = Router();

routes.get('/dre/get', [Auth], MabuThermasDreController.index);

routes.get('/dre/get/download', MabuThermasDreController.downloadFile);

export default routes;
