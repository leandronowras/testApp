import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // pessquisar oq store faz
// toda roda do banco de dados precisa ser await
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // so eh valido para as rotas que estao abaixo dele

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ ok: true });
});

export default routes;
