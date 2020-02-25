import Sequelize from 'sequelize';

import User from '../app/models/User'; // importou o model

import databaseConfig from '../config/database'; // importou o necessario para entrar no bd

const models = [User]; // criou um array com todos os models da aplicacao

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection)); // inicia cada model no array
    }
}

export default new Database();
