const path = require("path");
const {loadAll} = require("./common")

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "genres.json");

class GenreDao{
    constructor(storagePath) {
        this.genreStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }
    
    async getAll(){
        return await loadAll(this.genreStoragePath);
    }

    async getOne(id){
        let genres = await loadAll(this.genreStoragePath)

        return genres.find(x => x.id === id);
    }
}

module.exports = GenreDao;