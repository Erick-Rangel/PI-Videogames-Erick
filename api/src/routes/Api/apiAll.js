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
            genres: videojuego.genres.map(genre => genre.name),
          };
        });   
       
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

const juegoName= async (req,res) =>{

  const {name} = req.query;

  

  
  const juegoTotal = await getAllJuego();
  if(name){ 
  
    const juegos = juegoTotal.filter(juego => juego.name.toLowerCase().includes(name.toLowerCase()))
  
    
    juegos.length ? res.send(juegos) : res.json([`No se encontraron juegos con el nombre ${name}`]);
     
   
  } else {
    res.status(200).send(juegoTotal);
  } 
}

module.exports = {juegoName}