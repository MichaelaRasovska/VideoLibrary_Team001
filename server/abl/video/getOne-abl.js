const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv);
const schema = require("../../validation/reqParamSchema")
const VideoDao = require("../../dao/video-dao");
const GenreDao = require("../../dao/genre-dao");

let videoDao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);
let genreDao = new GenreDao(
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

    let video = await videoDao.getOne(req.params.id);
    if(!video){
        res.status(404).json({message: `Video with id ${req.params.id} not found`});
        return;
    }

    // TODO add DAO method that will filter and return genre objects based od video.genres id array
    let genres = await genreDao.getAll();
    video.genres = genres.filter(x => video.genres.includes(x.id))

    res.json(video);
}

module.exports = GetOneAbl