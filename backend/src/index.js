const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

//requerindo as rotas criadas em outro arquivo
const routes = require('./routes')
const app = express();

const server = http.Server(app);
const { setupWebsocket } = require('./../websocket')

setupWebsocket(server)

//conexão com o mongoDB
mongoose.connect('mongodb+srv://root:1234@cluster0-jfxvy.gcp.mongodb.net/week10?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true} );

app.use(cors({

}));
//configurando para todas as rotas da aplicação (.use)
app.use(express.json());
//cadastra as rotas do outro arquivo de uma forma geral usando app.use
app.use(routes);

server.listen(3333);









//configuração apenas para as rotas get
//app.get()


//METODOS HTTP: GET, POST, PUT, DELETE
//get = buscando informação
//post = criar informação (Salvar produto, Criar usuário)
//put = editar uma informação (Editar produto, Editar Cadastro)
//delete = deletar uma iformação


//Query Params: request.query -> (Filtros, ordenação, paginação, ...)
//Route Params: request.params-> (identificar um recurso na alteração ou remoção)
//Body: request.body-> (dados para criação ou alteração de um registro)

//MongoDB (Não-relacional)

/*
app.post('/users', (request, response) => {
    console.log(request.body)
    return response.json({message: 'Hello World'});
    
    });
*/



