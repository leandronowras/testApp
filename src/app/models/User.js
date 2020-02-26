import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL, // virtual significa q nao vai existir no bd
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async user => {
            // eh um codigo q eh executado antes da informacao ir para o bd
            if (user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        });

        return this;
    }
}

export default User;
