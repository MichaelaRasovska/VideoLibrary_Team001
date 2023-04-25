const Ajv = require("ajv").default;
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv);
const GenreDao = require("../../dao/genre-dao")
const schema = require("../../validation/reqParamSchema");
const path = require("path");
let genreDao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);
const VideoDao = require("../../dao/video-dao")
let videoDao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);

async function DeleteAbl(req, res){
    // TODO CANNOT DELETE A GENRE if it is a part of any video
    if (!ajv.validate(schema, req.params)){
        res.status(400).json({
            message: "Invalid params",
            reason: ajv.errors
        });

        return;
    }

    if (await videoDao.anyVideoContainsGenre(req.params.id)){
        res.status(400).json({
            message: `Cannot delete genre with id ${req.params.id} that is assigned to a video`
        });

        return;
    }

    let deleted = await genreDao.delete(req.params.id);

    deleted ?
        res.status(200).send() :
        res.status(404).json({
            message: `Genre with id ${req.params.id} not found`
        });

}
module.exports = DeleteAbl;