import Knex from 'knex';

export async function up(knex : Knex) {
    // Serve para realizar alterações (e criações?) no banco de dados

    // Criar a tabela
    return knex.schema.createTable('itens_por_pontos', minhaTabela => {
        minhaTabela.increments('id').primary();

        minhaTabela
            .integer('id_ponto').notNullable()
            .references('id')
            .inTable('pontos_de_coleta');
        
        minhaTabela
            .integer('id_item').notNullable()
            .references('id')
            .inTable('itens_de_coleta');
    });
}

export async function down(knex : Knex) {
    // Utilizado para voltar atrás (se criei, deletar). faz o contrário do que o método up() faz.
    return knex.schema.dropTable('itens_por_pontos');
}