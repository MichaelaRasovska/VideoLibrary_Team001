const express = require("express");
const router = express.Router();
require('express-async-errors');

const GetAllAbl = require("../abl/genre/getAll-abl");
const GetOneAbl = require("../abl/genre/getOne-abl");

router.get("", async (req, res, next) => {
    await GetAllAbl(req, res);
});

router.get("/:id", async (req, res) =>{
    await GetOneAbl(req, res);
})

module.exports = router;