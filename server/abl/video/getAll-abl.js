const path = require("path");

const VideoDao = require("../../dao/video-dao")
let dao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);
async function GetAllAbl(req, res){
    return res.json(await dao.getAll())
}

module.exports = GetAllAbl