import express, { response } from 'express';
import cors from 'cors';
import path from 'path'
import rotas from './rotas'
// esse comando de import vai no caminho que passei (./rotas = msm diretório, arquivo "rotas.ts")
//      e importa aquilo que declarei como export no rotas.ts. se tirar o comando export, o import aqui para de funcionar.

const app = express();

app.use(cors()); // desse jeito permite que toda e qqr URL acesse nossa API, em prod (mais pra frente) vamo configurar
                 //     pra que somente nossa aplicação do front (em des: localhost:3000, react native etc.) acesse.
app.listen(3333);
app.use(express.json());
app.use(rotas);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    // crio a rota "uploads" que recebe GETs apenas, e disponibiliza documentos gerais/genéricos para
    //      quem for consumir esta API, no caso, o Front-End, mas qqr pessoa esperta q tente acessar a rota tb.

// // configura que minha aplicação passa a escutar (receber) as requisições
// // que forem enviadas para a porta 3333 do localhost (este computador):
// app.listen(3333);

// // configura o express pra entender o corpo das requisições como formato JSON:
// app.use(express.json());

// // PROTÓTIPO DO Q VAI SER UM BANCO DE DADOS:
// const usuaries = [
//     'Luma',
//     'Rogerio',
//     'Mariane',
//     'Ellen',
//     'Alanis',
//     'Jewel'
// ];
// /* NOTAS SOBRE O BANCO DE DADOS:
//  - vou usar banco de dado relacional. qual? a priori não importa pois usarei um construtor de queries em JS
//     que automaticamente traduz meu código para o banco de dados em questão que estiver utilizando, permitindo
//     versatilidade (mudar de SQL Derver para SQLite ou Oracle ou MariaDB, etc., ver no site do Knex quais BDs ele atende.)
// - SQLite: não precisa instalar nada na máquina pra usar, é o que usarei. (mas já tenho MySQL instalado)
// */

// /* SOBRE PARÂMETROS DE REQUISIÇÕES HTML:
//  - Request Parameters:  fazem parte da rota, por isso mesmo são obrigatórios. Compõem a rota. São a rota.
//  - Query Parameters:    opcionais. São passados em uma rota após um sinal de interrogação: ?
//     por isso mesmo, quem define o nome do parametro da query é quem envia a requisição;
//     na vdd é um contrato. no meu backend vou esperar que a parte requisitante envie um parâmetro
//     com determinado nome. se não vier, ou se vier com outro nome, eu não consigo receber aqui no back.
//     no final das contas quem decide é o back-end também eu hein. 
//     não são únicos, pode aparecer o msm nome de parâmetro mais de 1x numa mesma requisição. Aí vira um
//     Array..............
//  - Request Body:        é o corpo da requisição. são informações encapsuladas que são enviadas junto com a requisição,
//     além da rota que se deseja acessar (e que eventualmente pode conter parâmetros de interrogação).
//     comumente vai no formato JSON que é de objeto: { "chave" : "valor", "outraChave" : "algumValor" }
// */

// //  V---------------- ROTAS DO MÉTODO GET ----------------V 
// // obs. navegadores sempre fazem requisição com o método GET 

// app.get('/usuaries', (request,response) => {
// console.log('rota /usuaries metodo get')

//     const paramDeFiltro = String(request.query.buscaPorLetra);
//     const usuariesFiltrades = paramDeFiltro ? usuaries.filter(u => u.includes(paramDeFiltro)) : "Kd o parâmetro fiote??";

//     // response é o que eu devolvo para quem me requisitou (no caso o navegador)
//     // APIs RESTful: devolvo JSONs, pro navegador (ou quem requisitou) renderizar do jeito q quiser
//     if (usuariesFiltrades){ // NÃO ESTÁ FUNCIONANDO para checar por um array vazio :(
//         return response.json(usuariesFiltrades);
//     } else {
//         return "Sua busca não encontrou nenhum resultado";
//     }
    
//     // tratar Query Parameters:

// });

// app.get('/usuaries/:identificadorUnicoDeUsuarieEuQDecidoEsseNome', (request,response) => {

//     const batata = Number(request.params.identificadorUnicoDeUsuarieEuQDecidoEsseNome);
//     // Number() converte string para formato numérico. tipo cast no java

//     const usuarieRetorno = usuaries[batata];
//     return response.json(usuarieRetorno);
// })


// //  V---------------- ROTAS DO MÉTODO POST ---------------V 

// app.post('/usuaries', (request, response) => {
//     console.log('rota /usuaries metodo post')

//     const corpoDaRequisicao = request.body;

//     const usuarieNove = {
//         nome : corpoDaRequisicao.nome,
//         email : corpoDaRequisicao.email
//     }

//     // inserir algum código para persistir e nove usuarie no BD da aplicação

//     return response.json(usuarieNove);
//     // como melhorar a resposta?
// })

