const path = require("path");
const {loadAll} = require("./common")

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "videos.json");

class VideoDao{
    constructor(storagePath) {
        this.videoStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    async getAll(){
        return await loadAll(this.videoStoragePath);
    }

    async getOne(id){
        let videos = await loadAll(this.videoStoragePath)

        return videos.find(x => x.id === id);
    }
}

module.exports = VideoDao;