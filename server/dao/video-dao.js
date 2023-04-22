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

    async update(videoUpdate){
        let videos = await loadAll(this.videoStoragePath);
        const videoIdx = videos.findIndex(x => x.id === videoUpdate.id);

        if(videoIdx === -1){
            return null;
        }

        videos[videoIdx] = videoUpdate;
        await saveAll(this.videoStoragePath, videos);

        return videoUpdate;
    }

    async delete(id){
        let videos = await loadAll(this.videoStoragePath);
        const videoToDelete = videos.findIndex(x => x.id === id);

        if(videoToDelete === -1){
            return false;
        }

        videos.splice(videoToDelete, 1);
        await saveAll(this.videoStoragePath, videos);

        return true;
    }

    async existsByName(name){
        let videos = await loadAll(this.videoStoragePath);

        return videos.some(x => x.name === name);
    }
}

module.exports = VideoDao;