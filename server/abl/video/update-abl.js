const path = require("path");
const Ajv = require("ajv").default;
const VideoDao = require("../../dao/video-dao")
let dao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);

// TODO: probably move to shared directory for schemas
const schema = {
    type: "object",
    properties: {
        name: {type: "string", minLength: 1},
        title: {type: "string", minLength: 1},
        duration: {type: "number", multipleOf: 1, minimum: 1},
        description: {type: "string", maxLength: 1000},
        genres: {type: "array", minItems: 1, uniqueItems: true},
        url: {type: "string"},
        picture: {type: "string"}
    },
    required: ["name", "title", "duration", "genres", "url", "picture"]
}

async function UpdateAbl(req, res){
    // TODO Logging
    const ajv = new Ajv();
    if(!ajv.validate(schema, req.body)){
        res.status(400).json({
            message: `Invalid data`,
            reason: ajv.errors
        })

        return;
    }

    let video = req.body;
    video.id = req.params.id;
    // TODO Validate that genres assigned to a video exist

    let updatedVideo = await dao.update(video);

    if(!updatedVideo){
        res.status(404).json({
            message: `Video with id ${video.id} to be updated not found`
        });

        return;
    }

    res.status(201).json(updatedVideo);
}

module.exports = UpdateAbl;