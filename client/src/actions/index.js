import axios from 'axios';

export function getAll() {

  return async function(dispatch) {
   let json = await axios('http://localhost:3001/videogames'); 
       return dispatch({
        type: 'GET_ALL',
        payload: json.data
    });
}
      
}

export function getGenres(){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/genre');
        return dispatch({
          type: "GET_GENRES",
          payload: info.data,
        });
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        const data = await axios.post('http://localhost:3001/videogame',payload)
        return data
}
}

export function getName(name) {
    return async function (dispatch) {
         let json = await axios.get('http://localhost:3001/videogames?name=' + name);
      
       return dispatch({
           type: 'GET_NAME',
            payload: json.data
       }) 
   }
}

export function filterJuegoByGenre(payload){     
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}


export function filterJuegoByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function filterJuegoByRating(payload){    
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}









