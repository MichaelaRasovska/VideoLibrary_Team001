const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv);
const videoSchema = require("../../validation/videoSchema");
const reqParamsSchema = require("../../validation/reqParamSchema");
const VideoDao = require("../../dao/video-dao");
const GenreDao = require("../../dao/genre-dao");
let videoDao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);
let genreDao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);



async function UpdateAbl(req, res){
    // TODO Logging

    if (!ajv.validate(reqParamsSchema, req.params)){
        res.status(400).json({
            message: "Invalid params",
            reason: ajv.errors
        });

        return;
    }

    if(!ajv.validate(videoSchema, req.body)){
        res.status(400).json({
            message: `Invalid data`,
            reason: ajv.errors
        })

        return;
    }

    let video = {
        ...req.body,
        id: req.params.id
    };

    if(!(await genreDao.allExist(video.genres))){
        res.status(400).json({
            message: `All selected genres must exist`
        });

        return;
    }

    let updatedVideo = await videoDao.update(video);

    if(!updatedVideo){
        res.status(404).json({
            message: `Video with id ${video.id} to be updated not found`
        });

        return;
    }

    res.json(updatedVideo);
}

module.exports = UpdateAbl;