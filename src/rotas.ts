import express, { request } from 'express';
import PontoDeColetaController from './controllers/PontoDeColetaController';
import ItemDeColetaController from './controllers/ItemDeColetaController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';


// o .Router() permite desacoplar os arquivos do servidor e de rotas, e agora 'rotas' aqui dentro serve como o 'app.§ 
//      no servidor.ts. Ao final, exporto minhas rotas para poder ter acesso dentro do servidor.ts
const minhasRotas = express.Router();

const upload = multer(multerConfig);

// Aparentemente ainda não instanciei a classe PontoDeColetaController, tem que instanciar:
const pontoDeColetaController = new PontoDeColetaController();
const itemDeColetaController = new ItemDeColetaController();

/*  existe esse padrão anglicizado de nomear os métodos:
        index   :   listarTodos // pesquisar
        show    :   exibir (um único registro)
        create  :   adicionarNovo
        update  :   atualizar (um único registro)
        delete  :   deletar
*/

//  V---------------- ROTAS DO MÉTODO GET  ----------------V 
minhasRotas.get('/itens', itemDeColetaController.listarTodosItens);
// Obs.: Os argumentos (request, response) da função listarTodosItens estão dentro do Controller,
//      então aqui eu só chamo a assinatura do método mesmo.

minhasRotas.get('/pontos/:id', pontoDeColetaController.exibirPontoDeColeta);

minhasRotas.get('/pontos', pontoDeColetaController.pesquisarPontoDeColeta);

//  V---------------- ROTAS DO MÉTODO POST ----------------V 
minhasRotas.post(
        '/pontos', 
        upload.single('imagem'),
        celebrate({
                body: Joi.object().keys({
                        nome: Joi.string().required(),
                        email: Joi.string().required().email(),
                        nagazap: Joi.number().required(),
                        latitude: Joi.number().required(),
                        longitude: Joi.number().required(),
                        cidade: Joi.string().required(),
                        unidade_federativa: Joi.string().required().max(2),
                        itens: Joi.string().required(),
                })
        }, {
                abortEarly: false, // pra retornar todos os erros, não apenas o primeiro q encontrar
        }), 
        pontoDeColetaController.adicionarNovoPonto);

export default minhasRotas;