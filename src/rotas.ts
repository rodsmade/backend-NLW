import express, { response } from 'express';
import connknex from './banco_de_dados/conexao'

// o .Router() permite desacoplar os arquivos do servidor e de rotas, e agora 'rotas' aqui dentro serve como o 'app.§ 
//      no servidor.ts. Ao final, exporto minhas rotas para poder ter acesso dentro do servidor.ts
const minhasRotas = express.Router();

minhasRotas.get('/itens', async (request,response) =>{

    const todosOsItens = await connknex('itens_de_coleta').select('*');
    const itensSerializados = todosOsItens.map(item => {
        return {
            id: item.id,
            titulo: item.titulo,
            url_imagem: `http://localhost:3333/uploads/${item.imagem}`,
        };
    });
    return response.json(itensSerializados);
})

minhasRotas.post('/pontos', async (request,response) => {
    const {
        nome,
        email,
        nagazap,
        latitude,
        longitude,
        rua,
        numero,
        cidade,
        unidade_federativa,
        itens
    } = request.body;
    // isso que fiz foi uma desintegração (de um objeto em variáveis), onde meio que criei uma variável para cada campo que me interessa do body
    //      é como se estivesse fazendo:
    //          const name = request.body.name;
    //          const email = request.body.email;
    //          ... etc.

    const trx = await connknex.transaction();
    // essa constante serve pra meio que amarrar as transações / criar sincronia, se uma falhar, a outra não é efetivada. 

    // idDoItemCriado Eh um array de retorno do método insert() com os ids de tds os registros criados 
    const idDoItemCriado = await trx('pontos_de_coleta').insert({
        imagem: "dummy",
        nome,
        email,
        nagazap,
        latitude,
        longitude,
        rua, 
        numero,
        cidade,
        unidade_federativa,
    })
    // ATENSSAU: o que foi feito aqui se chama Short Syntax !!!!!
    //      é como se estivesse fazendo:
    //          name : name,
    //          email : email,
    //          ... etc.
    //      o nome da variável (direita) é igual ao nome da propriedade do objeto (esquerda).

    // adicionar a relação n:n na tabela intermediária
    
    const id_ponto = idDoItemCriado[0];
    const itensPorPonto = itens.map((id_item: number) => {
        return {
            id_item,
            id_ponto,
        };
    })
    
    await trx('itens_por_pontos').insert(itensPorPonto)

    return response.json({ success : true})

})


export default minhasRotas; 