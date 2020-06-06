import express, { request } from 'express';
import connknex from './banco_de_dados/conexao';
import PontoDeColetaController from './controllers/PontoDeColetaController';

// o .Router() permite desacoplar os arquivos do servidor e de rotas, e agora 'rotas' aqui dentro serve como o 'app.§ 
//      no servidor.ts. Ao final, exporto minhas rotas para poder ter acesso dentro do servidor.ts
const minhasRotas = express.Router();

// Aparentemente ainda não instanciei a classe PontoDeColetaController, tem que instanciar:
const pontoDeColetaController = new PontoDeColetaController();

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

minhasRotas.post('/pontos', pontoDeColetaController.adicionarNovoPonto);
// Obs.: Os argumentos (request, response) da função adicionarNovoPonto estão dentro do Controller,
//      então aqui eu só chamo a assinatura do método mesmo.


export default minhasRotas; 