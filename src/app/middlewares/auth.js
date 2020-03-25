import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // util ja vem com o node, promisify pega uma funcao de call back e a transforma em async e await

import authConfig from '../../config/auth'; // tem q ser importado pois eh aqui q estao o segredo

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' '); // so para dividir melhor as informacoes retornadas pelo terminal
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};
