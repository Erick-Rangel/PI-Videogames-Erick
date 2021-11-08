const express = require('express');
const router = express.Router();

const { juegoName } = require("../routes/Api/apiAll");
const {getApiID} = require("../routes/Api/apiID");




router.get("/", juegoName);
router.get("/:id", getApiID);


module.exports = router;