const path = require("path");
const {loadAll, saveAll} = require("./common")
const uuid = require("uuid");

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "genres.json");

class GenreDao{
    constructor(storagePath) {
        this.genreStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }
    
    async getAll(){
        return await loadAll(this.genreStoragePath);
    }

    async getByIds(ids){
        let genres = await loadAll(this.genreStoragePath);
        console.log(ids);
        return genres.filter(x => ids.includes(x.id));
    }

    async getOne(id){
        let genres = await loadAll(this.genreStoragePath);

        return genres.find(x => x.id === id);
    }

    async create(genre){
        genre.id = uuid.v4();
        let genres = await loadAll(this.genreStoragePath);
        genres.push(genre);
        await saveAll(this.genreStoragePath, genres);

        return genre;
    }

    async update(genreUpdate){
        let genres = await loadAll(this.genreStoragePath);
        const genreIdx = genres.findIndex(x => x.id === genreUpdate.id);

        if(genreIdx === -1){
            return null;
        }

        genres[genreIdx] = genreUpdate;
        await saveAll(this.genreStoragePath, genres);

        return genreUpdate;
    }

    async delete(id){
        let genres = await loadAll(this.genreStoragePath);
        const genreToDelete = genres.findIndex(x => x.id === id);

        if(genreToDelete === -1){
            return false;
        }

        genres.splice(genreToDelete, 1);
        await saveAll(this.genreStoragePath, genres);

        return true;
    }

    async existsByName(name){
        let genres = await loadAll(this.genreStoragePath);

        return genres.some(x => x.name === name);
    }

    async allExist(genreIds){
        let genres = await loadAll(this.genreStoragePath);
        let allGenresIds = genres.map(x => x.id);

        return genreIds.every(id => allGenresIds.includes(id));
    }
}

module.exports = GenreDao;