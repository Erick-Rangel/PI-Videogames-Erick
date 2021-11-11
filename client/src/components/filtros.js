import React, { useEffect} from 'react'
import style from "./css/principal.module.css";
 import { filterCreated, filterJuegoByGenre, getAll, getGenres } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';


export const Filtros = ({handleOrder,handleOnFilterRating}) => {

    const genres = useSelector((state) => state.genres); 
      const dispatch = useDispatch();

      
  


    useEffect(() => {
      dispatch(getGenres());
    }, [dispatch]);

    function handleClick(e) {
      e.preventDefault();
      dispatch(getAll());
    }


function handleOnFilterGenres(e) {
  dispatch(filterJuegoByGenre(e.target.value)); 
  
}


 function handleFilterCreated(e) {
   dispatch(filterCreated(e.target.value));
 }
 
 
 
 
    return (
      <div className={style.filters}>
        

        <Link to="/videogame" className={style.link}>
          Crear Videojuego
        </Link>

        <button
          className={style.cargar}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Cargar personajes
        </button>

        <Searchbar />

        <span>Genero</span>
        <select onChange={(e) => handleOnFilterGenres(e)}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
          )
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
        <span>Rating</span>
        <select onChange={handleOnFilterRating}>
          <option value="mayor">Mejor rating</option>
          <option value="menor">Peor rating</option>
        </select>
      </div>
    );
}
