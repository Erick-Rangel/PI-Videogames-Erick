import React from 'react'
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  filterJuegoByName, getAll,filterJuegoByRating} from '../actions';
import Paginado from "./Paginado";
import styles from "./css/loading.module.css"
import video from "./images/fondoPP.mp4" 
import { Filtros } from './filtros';
import { BuscarId } from './BuscarId';
import style from "./css/principal.module.css";

function PaginaPrinc() {

  const allvideogames = useSelector((state) => state.videogame);
 const dispatch = useDispatch();
  

 const [currentPage, setCurrentPage] = useState(1);
 const [juegosPorPage, setJuegosPorPage] = useState(15);
 const [,setOrden] = useState("");
 const indexOfLastJuego = currentPage * juegosPorPage;
 const indexOfFirstJuego = indexOfLastJuego - juegosPorPage;
 const currentJuegos = allvideogames.slice(indexOfFirstJuego, indexOfLastJuego);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  

  

 const paginado = (pageNumber) => {
   setCurrentPage(pageNumber);
 };


 function handleOrder(e) {
   e.preventDefault();
   dispatch(filterJuegoByName(e.target.value));
   setCurrentPage(1);
   setOrden(`Ordenado ${e.target.value}`);
 } 

 function handleOnFilterRating(e){  
   e.preventDefault()
  dispatch(filterJuegoByRating(e.target.value));
   setCurrentPage(1);
setOrden(`Ordenado ${e.target.value}`)
}

  return (
    <>
      <h1 className={style.cabecera}>Videojuegos Henry</h1>

      <video className={styles.video} src={video} autoPlay loop></video>

      <Filtros
        handleOrder={handleOrder}
        handleOnFilterRating={handleOnFilterRating}
      />

      <Paginado
        /*   key={currentPage} */
        paginado={paginado}
        juegosPorPage={juegosPorPage}
        allvideogames={allvideogames.length}
      />

      <BuscarId
        setJuegosPorPage={setJuegosPorPage}
        currentJuegos={currentJuegos}
      />
    </>
  );
}

export default PaginaPrinc;