import Knex from 'knex';

export async function up(knex : Knex) {
    // Serve para realizar alterações (e criações?) no banco de dados

    // Criar a tabela
    return knex.schema.createTable('pontos_de_coleta', minhaTabela => {
        minhaTabela.increments('id').primary();
        minhaTabela.string('imagem').notNullable();
        minhaTabela.string('nome').notNullable();
        minhaTabela.string('email').notNullable();
        minhaTabela.string('nagazap').notNullable();
        minhaTabela.decimal('latitude').notNullable;
        minhaTabela.decimal('longitude').notNullable;
        minhaTabela.string('rua').notNullable();
        minhaTabela.string('número').notNullable();
        minhaTabela.string('cidade').notNullable();
        minhaTabela.string('unidade_federativa', 2).notNullable();

    });
}

export async function down(knex : Knex) {
    // Utilizado para voltar atrás (se criei, deletar). faz o contrário do que o método up() faz.
    return knex.schema.dropTable('pontos_de_coleta');
}

