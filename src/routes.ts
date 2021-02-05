import { Router } from 'express';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import OracleController from './controllers/OracleController';

import Auth from './middlewares/Auth';

const routes = Router();

// User routes

routes.post('/user/create', UserController.create);
routes.post('/auth/login', AuthController.login);

// Search routes
routes.get('/users/get', [Auth], OracleController.index);

export default routes;
