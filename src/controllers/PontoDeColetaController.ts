import {Request, Response} from 'express'
import connknex from '../banco_de_dados/conexao'

class PontoDeColetaController {
    
    async pesquisarPontoDeColeta(request: Request, response: Response){
        const {cidade, unidade_federativa, itens } = request.query;
        
        const parsedItems = String(itens)
            .split(',')
            .map(i => Number(i.trim()));

        const points = await connknex('pontos_de_coleta')
            .join('itens_por_pontos', 'pontos_de_coleta.id', '=', 'itens_por_pontos.id_ponto')
            .whereIn('itens_por_pontos.id_item', parsedItems)
            .where('cidade', String(cidade))
            .where('unidade_federativa', String(unidade_federativa))
            .distinct()
            .select('pontos_de_coleta.*');

        const pontosSerializados = points.map(ponto => {    // serializado = iteradamente alterado/construído
            return {
                ...ponto,
                url_imagem: `http://localhost:3333/uploads/${ponto.imagem}`,
            };
        });

        return response.json(pontosSerializados);

    };
    
    async exibirPontoDeColeta(request: Request, response: Response){
        const { id } = request.params; // desestruturação, o mesmo que: const id = request.params.id;
        const pontoBuscado = await connknex('pontos_de_coleta').where('id', id).first(); 
        
        if(!pontoBuscado){
            return response.status(400).json({mensagem : 'Ponto não encontrado'});
        }
        
        const pontoSerializado = {
                ...pontoBuscado,
                url_imagem: `http://localhost:3333/uploads/${pontoBuscado.imagem}`,
            };

        const itensDoPonto = await connknex('itens_de_coleta')
        .join('itens_por_pontos', 'itens_de_coleta.id', '=', 'itens_por_pontos.id_item')
            .where('itens_por_pontos.id_ponto', id)
            .select('itens_de_coleta.titulo')
            
            return response.json({pontoSerializado, itensDoPonto});
        }
        
    async adicionarNovoPonto(request: Request,response: Response) {
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
        // Isso é uma desintegração (de um objeto em variáveis), onde meio que criei uma variável para cada campo que me interessa do body
        //      é como se estivesse fazendo:
        //          const name = request.body.name;
        //          const email = request.body.email;
        //          ... etc.
        //      isto é, criando uma variável pra receber cada parte do body.
    
        const novoPontoDeColeta = { // estou criando o objeto (inclui imagem, que no momento NÃO VEM na requisição)
            imagem: request.file.filename,
            nome,
            email,
            nagazap,
            latitude,
            longitude,
            rua, 
            numero,
            cidade,
            unidade_federativa,
        }
        // ATENSSAU: o que foi feito aqui se chama Short Syntax !!!!!
        //      é como se estivesse fazendo:
        //          name : name,
        //          email : email,
        //          ... etc.
        //      o nome da variável (direita) é igual ao nome da propriedade do objeto (esquerda).

        const trx = await connknex.transaction();
        // essa constante serve pra meio que amarrar as transações / criar sincronia, se uma falhar, a outra não é efetivada. 
    
        // adiciona novo ponto de coleta na tabela pontos_de_coleta:
        const idDoPontoCriado = await trx('pontos_de_coleta').insert(novoPontoDeColeta)
        // idDoPontoCriado é um array de retorno do método insert() com os ids de tds os registros criados
        
        const id_ponto = idDoPontoCriado[0];    
        const itensPorPonto = itens
                                .split(',')
                                .map((i: string) => Number(i.trim()))
                                .map((id_item: number) => {
            return {
                id_item,
                id_ponto,
            };
        })
        // itensPorPonto é um array de objetos, cada objeto é um parzinho de ids,
        //      que no fim é cada um dos registros que precisam ser inseridos na tabela intermediária de relacionamento
        
        // adicionar a relação n:n na tabela intermediária itens_por_pontos:
        await trx('itens_por_pontos').insert(itensPorPonto)

        await trx.commit();
    
        return response.json({
            id : id_ponto,
            ... novoPontoDeColeta,  // ... : Spread Operator, "todos os dados de [um objeto]"
        })
        // ou seja, a requisição foi enviada sem URL, e junto com uma lista de itens a serem relacionados ao novo ponto
        //      que se deseja criar. a resposta é todas as informações do ponto criado: o id, gerado automaticamente;
        //      a URL - que no momento é dummy, mas em breve será implementada; e o resto das informações, que havia sindo
        //      enviada no pedido de criação de novo ponto (endereço, email, etc.)
    
    }

 };

 export default PontoDeColetaController;