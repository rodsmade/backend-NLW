import knex, { ConnectionConfig } from 'knex';
// Knex.js is a "batteries included" SQL query builder for alguns BDs relacionais
import path from 'path';
// essa biblioteca ajuda a padronizar nomes de caminhos, ex. no windows as barras são invertidas, se rodar hardcode com '/'
//      de aplicações que construí aqui no mac em algum servidor windows, vai dar ruim.

const conexao = knex({
    client : 'sqlite3',
    connection : {
        filename: path.resolve(__dirname, 'bancoDeDados.sqlite'),
    },
    useNullAsDefault: true,
})

export default conexao;