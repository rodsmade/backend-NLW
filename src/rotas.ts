import express from 'express';

// o .Router() permite desacoplar os arquivos do servidor e de rotas, e agora 'rotas' aqui dentro serve como o 'app.§ 
//      no servidor.ts. Ao final, exporto minhas rotas para poder ter acesso dentro do servidor.ts
const minhasRotas = express.Router();

minhasRotas.get('/', (request,response) =>{
    return response.json({"mensagem" : "Olá Mundo! (TBA)"})
})



export default minhasRotas; 