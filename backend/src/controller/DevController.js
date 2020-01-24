const axios = require('axios')
const Dev = require('./../models/Dev')
const parseStringAsArray = require('./../utils/ParseStringAsArray')
const {findConnections, sendMessage} = require('./../../websocket')


//5 funcoes
//index, show, store, uptade, destroy
//index: quando quier mostrar uma lista do recurso (no caso Dev)
//show: quando quiser mostrar um unico desenvolvedor
//store quando quiser criar
//updade: editar
//destroy: deletar

module.exports = {
    async destroy(request, response){
        const github_username = request.params.github_username

         const removeUser = await Dev.deleteOne({github_username})

        response.json({removeUser})
        

    },

    async update(request, response){

        /*req.body é para ser utilizado quando você vai fazer alguma alteração ou inserção e precisar pegar alguma informação do corpo da requisição.
        req.params normalmente é utilizado para receber parâmetros como id, por exemplo. O req.params é o responsável por filtrar o conteúdo que você deseja buscar. */
        
        const {name,bio,github_username} = request.body
        
       // caso queira passa o id via parametro 
      //const _id = request.param.id

        const dev = await Dev.findOne({github_username});
        
        //let elvisLives = Math.PI > 4 ? "Yep" : "Nope";
          let newName = name == dev.name ? dev.name : name;
          let newBio = bio == dev.bio ? dev.bio : bio;

         const Newdev = await Dev.updateOne({github_username},{bio:newBio, name: newName}) 
          

         response.json({dev})

    },

    async index(request, response){
        //puxa todos os devs que existem usando o find()
        //lembrando que isso é do mongoDB
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
    
    
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username});
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
            //conceito de desestruturação const {} = variavel
            //name = login caso o name esteja vazio ele assume a propriedade login do resultado
            const {name = login, bio, avatar_url} = apiResponse.data

            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type:'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs:techsArray,
                location
            })

            //Filtar a conexões que estão há o maximo a 10km de distancia e que o novo tech tenha pelo menos 1 das techs
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }
    
        
        return response.json(dev);
        
        }
}