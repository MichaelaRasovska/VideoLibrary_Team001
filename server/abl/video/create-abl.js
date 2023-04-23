const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv);
const VideoDao = require("../../dao/video-dao");
const GenreDao = require("../../dao/genre-dao");
const schema = require("../../validation/videoSchema")
let videoDao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);

let genreDao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);

async function CreateAbl(req, res){
    // TODO Logging

    if(!ajv.validate(schema, req.body)){
        res.status(400).json({
            message: `Invalid data`,
            reason: ajv.errors
        })

        return;
    }

    let video = req.body;

    if(await videoDao.existsByName(video.name)){
        res.status(400).json({
            message: `Video item with name ${video.name} already exists`
        });

        return;
    }

    if(!(await genreDao.allExist(video.genres))){
        res.status(400).json({
           message: `All selected genres must exist`
        });

        return;
    }

    let createdVideo = await videoDao.create(video);

    res.status(201).json(createdVideo);
}

module.exports = CreateAbl;