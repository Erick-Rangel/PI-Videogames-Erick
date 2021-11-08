const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videojuego = require('./videojuegos');
const genero = require("./genero")
const newGame = require("./videojuego")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videojuego);
router.use("/genre", genero)
router.use("/videogame", newGame)
module.exports = router;
