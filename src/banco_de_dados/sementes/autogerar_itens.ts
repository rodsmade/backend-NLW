// Sementes (seeds) é os dados que já virão default dentro da aplicação qnd ela for baixada/instalada.
// No caso, queremos que já venha com itens default, e não permitiremos que e usuárie (ou ninguém) insira novos itens.
import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('itens_de_coleta').insert([
        { titulo: "lâmpadas", imagem:"lampadas.svg" },
        { titulo: "pilhas e baterias", imagem:"baterias.svg" },
        { titulo: "papéis e papelão", imagem:"papeis-papelao.svg" },
        { titulo: "resíduos eletrônicos", imagem:"eletronicos.svg" },
        { titulo: "resíduos orgânicos", imagem: "organicos.svg" },
        { titulo: "óleo", imagem:"oleo.svg" }  
    ]);
 }