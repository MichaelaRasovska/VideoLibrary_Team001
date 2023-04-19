const path = require("path");
const Ajv = require("ajv").default;
const VideoDao = require("../../dao/video-dao")
let dao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);

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

async function CreateAbl(req, res){
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

    if(await dao.existsByName(video.name)){
        res.status(400).json({
            message: `Video item with name ${video.name} already exists`
        });

        return;
    }

    // TODO Validate that genres assigned to a video exist

    let createdVideo = await dao.create(video);

    res.status(201).json(createdVideo);
}

module.exports = CreateAbl;