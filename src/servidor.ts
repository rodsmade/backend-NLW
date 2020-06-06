import express, { response } from 'express';

const app = express();

app.listen(3333);

// PROTOTIPO DO Q VAI SER NOSSO BANCO DE DADOS
const usuaries = [
    'Luma',
    'Rogerio',
    'Mariane',
    'Ellen',
    'Alanis',
    'Jewel'
];

// On Parameters
// Request Parameters:  fazem parte da rota, por isso mesmo são obrigatórios. Compõem a rota. São a rota.
// Query Parameters:    opcionais. São passados em uma rota após um sinal de interrogação: ?
//                      por isso mesmo, quem define o nome do parametro da query é quem envia a requisição;
//                      na vdd é um contrato. no meu backend vou esperar que a parte requisitante envie um parâmetro
//                      com determinado nome. se não vier, ou se vier com outro nome, eu não consigo receber aqui no back.
//                      no final das contas quem decide é o back-end também eu hein. 
//                      não são únicos, pode aparecer o msm nome de parâmetro mais de 1x numa mesma requisição. Aí vira um
//                      Array..............
// Request Body:        é o corpo da requisição. são informações encapsuladas que são enviadas junto com a requisição,
//                      além da rota que se deseja acessar (e que eventualmente pode conter parâmetros de interrogação).
//                      comumente vai no formato JSON que é de objeto: { "chave" : "valor", "outraChave" : "algumValor" }

//  V---------------- ROTAS DO MÉTODO GET ----------------V 
// obs. navegadores sempre fazem requisição com o método GET 

app.get('/usuaries', (request,response) => {
console.log('rota /usuaries metodo get')

    const paramDeFiltro = String(request.query.buscaPorLetra);
    const usuariesFiltrades = paramDeFiltro ? usuaries.filter(u => u.includes(paramDeFiltro)) : "Sua busca não encontrou nenhum resultado";

    // response é o que eu devolvo para quem me requisitou (no caso o navegador)
    // APIs RESTful: devolvo JSONs, pro navegador (ou quem requisitou) renderizar do jeito q quiser
    return response.json(usuariesFiltrades)

    // tratar Query Parameters:

});

app.get('/usuaries/:identificadorUnicoDeUsuarieEuQDecidoEsseNome', (request,response) => {
    const batata = Number(request.params.identificadorUnicoDeUsuarieEuQDecidoEsseNome);
    const usuarieRetorno = usuaries[batata];
    return response.json(usuarieRetorno);
})


//  V---------------- ROTAS DO MÉTODO POST ---------------V 
app.post('/usuaries', (request, response) => {
    console.log('rota /usuaries metodo post')

    const usuarieNove = {
        nome : 'Andreza',
        email : 'andreza@andreza.com.br'
    }

    return response.json(usuarieNove); 

})

