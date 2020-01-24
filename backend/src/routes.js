const { Router } = require('express');
const DevController = require('./controller/DevController')
const SearchController = require('./controller/SearchController')


//usando as rotas do express
const routes = Router();

//METODOS HTTP: GET, POST, PUT, DELETE
//get = buscando informação
//post = criar informação (Salvar produto, Criar usuário)
//put = editar uma informação (Editar produto, Editar Cadastro)
//delete = deletar uma iformação


//Query Params: request.query -> (Filtros, ordenação, paginação, ...)
//Route Params: request.params-> (identificar um recurso na alteração ou remoção)
//Body: request.body-> (dados para criação ou alteração de um registro)

//declarar as rotas
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
//aqui vai os dois pontos, no url não
routes.delete('/devs/:github_username', DevController.destroy);

routes.get('/search',SearchController.index);

//exportar as rotas para serem reconhecidas pelo servidor
module.exports = routes;