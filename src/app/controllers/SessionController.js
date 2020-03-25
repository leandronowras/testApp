// faz o login
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } }); // verifica se tem esse email

        if (!user) {
            // retorna true se nao existir
            return res.status(401).json({ error: 'User not found' });
        }

        if (!(await user.checkPassword(password))) {
            // eh executada quando o password nao bate com ele msm
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn, // data pra experirar o token
            }), // isso eh um objeto, o segundo parametro precisa ser um texto q eh unico em todas aplicacoes do universo, dica usar o md5 online(usei teste)
        });
    }
}

export default new SessionController();
