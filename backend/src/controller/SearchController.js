const Dev = require('./../models/Dev')
const parseStringAsArray = require('./../utils/ParseStringAsArray')

module.exports = {
    async index(request,response){
        //Buscar todos os devs num raio de 10km 
        // filtrar por tecnologias
    
        const {latitude, longitude, techs} = request.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs:{
                //estudar $in
                //mas parece que ele recebe qualquer posição/parametro do techsArray
                //$in é um operador logico do mongoDB
                $in:techsArray,
            },
            location:{
                //operador do MongoDB que representa que esta perto (em relação a distancia)
                $near: {
                    //ele precisa de dois parametros
                    //1 - representa o ponto central da pesquisa
                    $geometry:{
                        type:'Point',
                        coordinates: [longitude,latitude],
                    },
                    //2 - representa a distancia maxima da pesquisa
                    $maxDistance:10000,
                }
            }
        });

        //VER ISSO DNV
        return response.json({devs});
    }
}