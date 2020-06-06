import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'banco_de_dados', 'bancoDeDados.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'banco_de_dados', 'migracoes')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'banco_de_dados', 'sementes')
    },
    useNullAsDefault: true,
};