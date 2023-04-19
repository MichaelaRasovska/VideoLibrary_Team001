const fs = require("fs/promises")

async function loadAll(filePath){
    let genres;
    try {
        genres = JSON.parse(await fs.readFile(filePath, "utf-8"));
    } catch (e){
        let err = new Error(`Unable to read from storage at ${filePath}`);
        err.cause = e;

        throw err;
    }

    return genres
}

async function saveAll(filePath, elements){
    try{
        await fs.writeFile(filePath, JSON.stringify(elements, null, 4))
    } catch (e){
        let err = new Error(`Unable to write to a file ${filePath}`);
        err.cause = e;

        throw err;
    }
}

module.exports = {
    loadAll,
    saveAll
};