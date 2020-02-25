import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store); // pessquisar oq store faz
// toda roda do banco de dados precisa ser await
export default routes;
