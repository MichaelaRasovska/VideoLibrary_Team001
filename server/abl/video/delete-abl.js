const path = require("path");
const Ajv = require("ajv").default;
const VideoDao = require("../../dao/video-dao")
let dao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);

async function DeleteAbl(req, res){
    // TODO validate that id param is set?
    let deleted = await dao.delete(req.params.id);

    deleted ?
        res.status(200).send() :
        res.status(404).json({
            message: `Video with id ${req.params.id} not found`
        });
}

module.exports = DeleteAbl;