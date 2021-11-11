require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const { Videogame, Genre } = require("../../db");

const apiID = async (id) => {
  try {
    const result = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

    const juego = result.data;

    const info = {
      id: juego.id,
      image: juego.background_image,
      name: juego.name,
      description: juego.description.replace(/<[^>]*>?/g, ""),
      genres: juego.genres
        .map(genre =>{
              return {
            
                name: genre.name
              }
            }),

      released: juego.released,
      rating: juego.rating,
      platforms: juego.platforms.map((platform) => platform.platform.name),
    };

    return info;
  } catch (error) {
    console.log(error);
  }
};

async function getApiID(req, res, next) {
  try {
    const info = await apiID(req.params.id);
    if (info) res.json(info);
    else {
      try {
        const juego = await Videogame.findByPk(req.params.id, {
         include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: []
      }
    } ,

        });
        if (juego) return res.json(juego);
        res.status(404).json({ error: "Id no encontrado" });
        console.log(Videogame);
      } catch (error) {
        console.log(error);
      }
    }
  } catch {
    (error) => next(error);
  }
}
module.exports = { getApiID };
