import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store); // pessquisar oq store faz
// toda roda do banco de dados precisa ser await
routes.post('/sessions', UserController.store);
export default routes;
