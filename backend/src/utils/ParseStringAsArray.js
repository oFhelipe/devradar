module.exports = function parseStringAsArray(arrayAsStrig){
    return arrayAsStrig.split(',').map(tech=>tech.trim());
}