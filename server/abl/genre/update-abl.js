const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv);
const genreSchema = require("../../validation/genreSchema");
const reqParamsSchema = require("../../validation/reqParamSchema");
const GenreDao = require("../../dao/genre-dao");
let genreDao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);
async function UpdateAbl(req, res){
    if (!ajv.validate(reqParamsSchema, req.params) && !ajv.validate(genreSchema, req.body)){
        res.status(400).json({
            message: "Invalid data",
            reason: ajv.errors
        });

        return;
    }

    let genre = {
        ...req.body,
        id: req.params.id
    };

    let updatedGenre = await genreDao.update(genre);

    if(!updatedGenre){
        res.status(404).json({
            message: `Genre with id ${genre.id} to be updated not found`
        });

        return;
    }

    res.json(updatedGenre);
}
module.exports = UpdateAbl;