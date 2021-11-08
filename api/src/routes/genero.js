const express = require("express");
const router = express.Router();

const genero = require("./Api/apiGenero")

router.get("/", genero)

module.exports = router;