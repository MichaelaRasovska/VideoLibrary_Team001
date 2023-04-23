const express = require("express");
const router = express.Router();
require('express-async-errors');

const GetAllAbl = require("../abl/genre/getAll-abl");
const GetOneAbl = require("../abl/genre/getOne-abl");
const CreateAbl = require("../abl/genre/create-abl");
const UpdateAbl = require("../abl/genre/update-abl");
const DeleteAbl = require("../abl/genre/delete-abl");

router.get("", async (req, res, next) => {
    await GetAllAbl(req, res);
});

router.get("/:id", async (req, res) =>{
    await GetOneAbl(req, res);
})

router.post("", async (req, res) => {
    await CreateAbl(req, res);
});

router.put("/:id", async (req, res) => {
    await UpdateAbl(req, res);
});

router.delete("/:id", async (req, res) => {
    await DeleteAbl(req, res);
});

module.exports = router;