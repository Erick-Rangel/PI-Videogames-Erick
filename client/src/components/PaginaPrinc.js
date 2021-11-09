import React, { useMemo } from 'react'
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  filterJuegoByName, getAll} from '../actions';
import { Card } from './Card';
import Paginado from "./Paginado";
import Searchbar from './Searchbar';
import styles from "./css/loading.module.css"
import video from "./images/fondoPP.mp4"  
import style from "./css/principal.module.css"
import { Filtros } from './filtros';


function PaginaPrinc({history}) {
console.log(history)
  const allvideogames = useSelector((state) => state.videogame);
 const dispatch = useDispatch();
  

 const [currentPage, setCurrentPage] = useState(1);
 const [juegosPorPage, setJuegosPorPage] = useState(15);
 const [,setOrden] = useState("");

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAll());
  }

 const indexOfLastJuego = currentPage * juegosPorPage;
 const indexOfFirstJuego = indexOfLastJuego - juegosPorPage;
 const currentJuegos = allvideogames.slice(indexOfFirstJuego, indexOfLastJuego);

 const paginado = (pageNumber) => {
   setCurrentPage(pageNumber);
 };


 function handleOrder(e) {
   e.preventDefault();
   dispatch(filterJuegoByName(e.target.value));
   setCurrentPage(1);
   setOrden(`Ordenado ${e.target.value}`);
 } 

  return (
    <>
      <h1 className={style.cabecera}>Videojuegos Henry</h1>


        <Link to="/videogame" className={style.link}>Crear Videojuego</Link>


      <video className={styles.video} src={video} autoPlay loop></video>

      <button
      className={style.cargar}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Cargar personajes
      </button>
      <Searchbar /> 
       <Filtros handleOrder={handleOrder}/>
      <Paginado      
        key={currentPage}
        paginado={paginado}
        juegosPorPage={juegosPorPage}
        allvideogames={allvideogames.length}
      />

      {useMemo(currentJuegos?.map(({ id, name, image, genres, rating, img }) => { 
       
        return (
          <>
            <Link to={`/${id}`}>
              <Card
                key={id}
                set={setJuegosPorPage}
                name={name}
                image={img ? img : image}
                rating={rating}
                genres={genres.map((genre) => genre.name).filter(genre => genre)}
              />
            </Link>
          </>
        );
      }))}
    </>
  );
}

export default PaginaPrinc;