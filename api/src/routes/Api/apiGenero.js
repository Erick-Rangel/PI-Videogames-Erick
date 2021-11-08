require ("dotenv").config();
const {Router} = require('express');
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const {Genre} = require('../../db');
const {Op} = require('sequelize');
const router = Router();


const data = async ()=>{
    const genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}&page_size=50`);

    return genres.data.results;
}

 router.get("/", async (req, res, next) => {
   
   try {
     
     let generos = await data();
     genres = generos.map((genero) => {
       return {
           name: genero.name,
       };
     });
     await Genre.bulkCreate(genres);
   

      let generosDB = await Genre.findAll();

       res.json(generosDB);
    
   } catch (error) {
     next(error);
   }
 }); 
  
  

  



module.exports = router;