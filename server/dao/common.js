const fs = require("fs/promises")

async function loadAll(filePath){
    let genres;
    try {
        genres = JSON.parse(await fs.readFile(filePath, "utf-8"));
    } catch (e){
        let err = new Error(
            `Unable to read from storage at ${filePath}`)
        err.cause = e;

        throw err;
    }

    return genres
}

module.exports.loadAll = loadAll;