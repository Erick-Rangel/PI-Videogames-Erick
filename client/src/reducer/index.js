

const initialState = {
    videogame:[],
    allVideogames:[],
    genres:[],
    
}


function rootReducer(state = initialState, action) {
  
    switch (action.type) {
      case "GET_ALL":
        return {
          ...state,
          videogame: action.payload,
          allVideogames: action.payload,
        };

      case "FILTER_BY_GENRE":
        const allVideogames = state.allVideogames;
        const filteredVideogames = allVideogames.slice(",").filter(
          (videogame) => videogame.genres === action.payload
        );
          console.log(filteredVideogames);
        return {
          ...state,
          videogame: filteredVideogames,
        };
      case "FILTER_BY_CREATED":
        const createdFilter =
          action.payload === "created"
            ? state.allVideogames.filter((videogame) => videogame.createdDb)
            : state.allVideogames.filter((videogame) => !videogame.createdDb);
        return {
          ...state,
          videogame: createdFilter,
        };

      case "ORDER_BY_NAME":
        let sorter =
          action.payload === "asc"
            ? state.videogame.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              })
            : state.videogame.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          videogame: sorter,
        };

      case "GET_NAME":
        return {
          ...state,
          videogame: action.payload,
        };
      case "POST_VIDEOGAME":
        return {
          ...state,
        };
      case "GET_GENRES":
        
        return {
          ...state,
          genres: action.payload,
        };

    

      default:
        return state;
    }

}

export default rootReducer