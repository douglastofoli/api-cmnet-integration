import { Router } from 'express';

import Auth from '../middlewares/Auth';

import MabuThermasDreController from '../controllers/MabuThermas/DreController';

const routes = Router();

routes.get('/dre/get', [Auth], MabuThermasDreController.index);

export default routes;
