import React, { useEffect } from 'react'
import style from "./css/principal.module.css";
 import { filterCreated, filterJuegoByGenre, getGenres } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
 

export const Filtros = ({handleOrder}) => {

    const genres = useSelector((state) => state.genres); 
      const dispatch = useDispatch();

      
  


    useEffect(() => {
      dispatch(getGenres());
    }, [dispatch]);

function handleOnFilterGenres(e) {
  dispatch(filterJuegoByGenre(e.target.value));
}
 function handleFilterCreated(e) {
   dispatch(filterCreated(e.target.value));
 }

 


    return (
      
        <div className={style.filters}>
          <span>Genero</span>

          <select onChange={(e) => handleOnFilterGenres(e)}>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
            ) console.log(typeof(genres))
          </select>

          <span>Videojuego</span>

          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="All">Todos</option>
            <option value="api">Reales</option>
            <option value="created">Creados</option>
          </select>
          <span>Ordenar</span>
          <select onChange={handleOrder}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
    
    );
}
