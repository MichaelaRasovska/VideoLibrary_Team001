const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv);
const VideoDao = require("../../dao/video-dao")
const schema = require("../../validation/reqParamSchema");
let dao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);

async function DeleteAbl(req, res){
    if (!ajv.validate(schema, req.params)){
        res.status(400).json({
            message: "Invalid params",
            reason: ajv.errors
        });

        return;
    }
    let deleted = await dao.delete(req.params.id);

    deleted ?
        res.status(200).send() :
        res.status(404).json({
            message: `Video with id ${req.params.id} not found`
        });
}

module.exports = DeleteAbl;