import { Router } from 'express';

import Auth from '../middlewares/Auth';

import ESolutionController from '../controllers/ESolution/ESolutionController';

const routes = Router();

routes.post('/1c83892b-7d8e-4397-b453-9023d8af7ed2', ESolutionController.index);

export default routes;
