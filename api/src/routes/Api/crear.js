
const { Videogame, Genre } = require("../../db");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const crear = async (req,res,next) =>{
    let {name, platforms, image, description, fecha, rating, genres } = req.body;    
   if(!name || !platforms || !image || !description || !fecha || !rating || !genres){
       res.status(400).send({
           message: "Faltan datos"
       })
   }
  
try{
        let id = uuidv4();
        let game = await Videogame.create({
          ...req.body,
          id: id,
         name: name,
          description: description,
          fecha: fecha,
          rating: rating,
          platforms: platforms,
          image: image
            ? image
            : "https://tse1.mm.bing.net/th?id=OIP.2K7O9spz-DMGu82FqEhDVwHaEH&pid=Api",
          createdDb: true,
        });
            
      let generoDb= await Genre.findAll({
        where: {
          name: genres
        },  

      
      });
           game.addGenre(generoDb); 
        
        
        res.send({"Juego creado": game});
    
   } catch (error) {
        next(error);
    }
  
}


module.exports = {crear};