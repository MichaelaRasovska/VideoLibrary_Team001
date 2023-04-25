const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv);
const GenreDao = require("../../dao/genre-dao")
const schema = require("../../validation/reqParamSchema");
let dao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);
async function GetOneAbl(req, res){

    if (!ajv.validate(schema, req.params)){
        res.status(400).json({
            message: "Invalid params",
            reason: ajv.errors
        });

        return;
    }

    let genre = await dao.getOne(req.params.id);
    if(!genre){
        res.status(404).json({message: `Genre with id ${req.params.id} not found`});
        return;
    }

    res.json(genre);
}

module.exports = GetOneAbl