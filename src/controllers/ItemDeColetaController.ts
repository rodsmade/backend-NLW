import {Request, Response} from 'express';
import connknex from '../banco_de_dados/conexao'

class ItemDeColetaController {
    async listarTodosItens(request: Request, response: Response){

        const todosOsItens = await connknex('itens_de_coleta').select('*');
        const itensSerializados = todosOsItens.map(item => {    // serializado = iteradamente alterado/construído
            return {
                id: item.id,
                titulo: item.titulo,
                url_imagem: `http://localhost:3333/uploads/${item.imagem}`,
            };
        });
        return response.json(itensSerializados);
    }
}

export default ItemDeColetaController;