const path = require("path");

const GenreDao = require("../../dao/genre-dao")
let dao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);
async function GetOneAbl(req, res){
    // TODO: validator for req params
    if (!req.params.id){
        res.status(400).json({message: "Id of a genre must be present"});
    }

    let genre = await dao.getOne(req.params.id);
    if(!genre){
        res.status(404).json({message: `Genre with id ${req.params.id} not found`});
        return;
    }

    res.json(genre);
}

module.exports = GetOneAbl