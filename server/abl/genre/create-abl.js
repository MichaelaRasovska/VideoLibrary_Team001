const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv);
const GenreDao = require("../../dao/genre-dao");
const schema = require("../../validation/genreSchema")
let genreDao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);

async function CreateAbl(req, res){
    if(!ajv.validate(schema, req.body)){
        res.status(400).json({
            message: `Invalid data`,
            reason: ajv.errors
        })

        return;
    }

    let genre = req.body;

    if(await genreDao.existsByName(genre.name)){
        res.status(400).json({
            message: `Genre with name ${genre.name} already exists`
        });

        return;
    }

    let createdVideo = await genreDao.create(genre);

    res.status(201).json(createdVideo);
}

module.exports = CreateAbl;