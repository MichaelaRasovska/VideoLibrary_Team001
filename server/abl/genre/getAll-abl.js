const path = require("path");

const GenreDao = require("../../dao/genre-dao")
let dao = new GenreDao(
  path.join(__dirname,"..","..","storage","genres.json")
);
async function GetAllAbl(req, res){
    return res.json(await dao.getAll())
}

module.exports = GetAllAbl