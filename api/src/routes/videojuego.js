const express = require("express");
const router = express.Router();

const { crear } = require("./Api/crear");


router.post("/", crear);

module.exports = router;