import { Router } from 'express';

import auth from './auth';
import user from './user';
import mabuthermas from './mabuThermas';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/mabuthermas', mabuthermas);

export default routes;
