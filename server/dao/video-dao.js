const path = require("path");
const {loadAll, saveAll} = require("./common")
const uuid = require('uuid');

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "videos.json");

class VideoDao{
    constructor(storagePath) {
        this.videoStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    async getAll(){
        return await loadAll(this.videoStoragePath);
    }

    async getOne(id){
        let videos = await loadAll(this.videoStoragePath);

        return videos.find(x => x.id === id);
    }

    async create(video){
        video.id = uuid.v4();
        let videos = await loadAll(this.videoStoragePath);
        videos.push(video);
        await saveAll(this.videoStoragePath, videos);

        return video;
    }

    async existsByName(name){
        let videos = await loadAll(this.videoStoragePath);

        return videos.some(x => x.name === name);
    }
}

module.exports = VideoDao;