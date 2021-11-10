require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const {Videogame, Genre} = require("../../db");
const {Op} = require("sequelize");

//llamada a la api
async function apiAll(){
  
  try{
     const apione =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50&page=1`)
     const apitwo = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50&page=2`)
     const apithre= axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50&page=3`)
     

    let results = await Promise.all([apione,apitwo,apithre])
   results = results.map(res =>  res.data.results)
    get = [].concat(...results);
    
    results = results.flat().map((videojuego) => {
          return {      
            id: videojuego.id,
            name: videojuego.name,
            createdDb: false,
            rating: videojuego.rating,
            image: videojuego.background_image,
           genres: videojuego.genres.map(genre =>{ 
             let map = genre.name.split()
             for( let i = 0; i < map.length; i++){
               if(genre.name[i]) genre.name[i];
               
               
              }
              
              return map;
            
           })
          }
        })   
       
        return results;
    }catch(error){
        console.log(error);
    }
}


const getDbInfo = async() =>{
  return await Videogame.findAll({
    
    include: {
      model: Genre,
      attributes: ["name"],
    } ,


  });
  

}

const getAllJuego =async ()=>{
  let juegos = await apiAll();
  let juegosDb = await getDbInfo();
  let allJuegos = juegos.concat(juegosDb); 

  
  return allJuegos;    
}

const juegoName= async (req,res,next) =>{

  const {name} = req.query;
  
  try{
  const juegoTotal = await getAllJuego();
  if(name){ 
  console.log(juegoTotal)
  
    const juegosFilter = []
    juegoTotal.map(juego => {
      if(juego.name.toLowerCase().includes(name.toLowerCase())) juegosFilter.push(juego)
     
    })

    return res.send(juegosFilter)

  
     
   
  } else {
    res.status(200).send(juegoTotal);
  } }
  catch(err){
    next(err)
  }
}

module.exports = {juegoName}