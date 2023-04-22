const express = require("express");
const router = express.Router();
require('express-async-errors');

const GetAllAbl = require("../abl/video/getAll-abl");
const GetOneAbl = require("../abl/video/getOne-abl");
const CreateAbl = require("../abl/video/create-abl");
const DeleteAbl = require("../abl/video/delete-abl");
const UpdateAbl = require("../abl/video/update-abl");

router.get("", async (req, res) => {
    await GetAllAbl(req, res);
});

router.get("/:id", async (req, res) =>{
    await GetOneAbl(req, res);
});

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