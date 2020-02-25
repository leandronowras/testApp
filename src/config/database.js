module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gobarbe',
    define: {
        timestamps: true, // mostra o horario e a data de cada alteracao
        underscored: true, // deixa os arquivos_com_esse_formato
        underscoredAll: true, // deixa as tabelas_com_esse_formato
    },
};
