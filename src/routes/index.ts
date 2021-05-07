import { Router } from 'express';

import auth from './auth';
import user from './user';
import mabuthermas from './mabuThermas';
import esolution from './eSolution';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/mabuthermas', mabuthermas);
routes.use('/esolution', esolution); //esolution
routes.use('/040fe584b81c7ebe935785339c9e46c8', esolution); //esolution

export default routes;
