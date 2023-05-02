const path = require("path");

const VideoDao = require("../../dao/video-dao")
const GenreDao = require("../../dao/genre-dao");

let videoDao = new VideoDao(
    path.join(__dirname,"..","..","storage","videos.json")
);
let genreDao = new GenreDao(
    path.join(__dirname,"..","..","storage","genres.json")
);
async function GetAllAbl(req, res){
    let videos = await videoDao.getAll();
    let videosDto = [];

    for (const video of videos){
        videosDto.push({
            ...video,
            genres: await genreDao.getByIds(video.genres)
        });
    }

    res.json(videosDto);
}

module.exports = GetAllAbl