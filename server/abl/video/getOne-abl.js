const path = require("path");

const VideoDao = require("../../dao/video-dao");
const GenreDao = require("../../dao/genre-dao");

let videoDao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);
let genreDao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);
async function GetOneAbl(req, res){
    // TODO: validator for req params
    if (!req.params.id){
        res.status(400).json({"message": "Id of a video must be present"});
    }

    let video = await videoDao.getOne(req.params.id);
    if(!video){
        res.status(404).json({"message": `Video with id ${req.params.id} not found`});
        return;
    }

    // TODO add DAO method that will filter and return genre objects based od video.genres id array
    let genres = await genreDao.getAll();
    console.log(genres);
    video.genres = genres.filter(x => video.genres.includes(x.id))

    res.json(video);
}

module.exports = GetOneAbl