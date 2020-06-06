import Knex from 'knex';

export async function up(knex : Knex) {
    // Serve para realizar alterações (e criações?) no banco de dados

    // Criar a tabela
    return knex.schema.createTable('itens_de_coleta', minhaTabela => {
        minhaTabela.increments('id').primary();
        minhaTabela.string('imagem').notNullable();
        minhaTabela.string('titulo').notNullable();
    });
}

export async function down(knex : Knex) {
    // Utilizado para voltar atrás (se criei, deletar). faz o contrário do que o método up() faz.
    return knex.schema.dropTable('itens_de_coleta');
}