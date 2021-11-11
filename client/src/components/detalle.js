import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/detalle.module.css"
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";

export default function Detalle({history}) {
 
const [state, setstate] = useState(null)
let {id} = useParams();
  console.log(state)

  useEffect(() => {
   axios.get("http://localhost:3001/videogames/" +id)
   .then((videogame)=>{
     setstate(videogame.data)
   })
  }, [id]);

  const handleReturn= ()=>{
    history.goBack();
  }

    return (
      <div>
        {state ? (
          <>
            <div className={styles.div}>
              <img src={state.image} alt="imagen" className={styles.deta} />
            </div>
            <div className={styles.recursos}>
              <h1>Nombre: {state.name}</h1>
              <h4>Genero: </h4>{" "}
              {state.genres.map((genre) => genre.name).join(", ")}
              <h4>Descripcion: </h4> {state.description}
              <h4>Fecha de lanzamiento:</h4>{" "}
              {state.released ? state.released : state.fecha}
              <h4>Rating:</h4> {state.rating}
              <h4>Plataformas:</h4>{" "}
              {state.platforms
                .filter((platform) => <p>{platform}</p>)
                .join(", ")}
            </div>
          </>
        ) : (
          <p className={styles.lod}>Loadig ...</p>
        )}
        <div className={styles.buttom}>
          <Link to="/home">
            <button className={styles.volver} onClick={handleReturn}>
              Regresar
            </button>
          </Link>
        </div>
      </div>
    );
}

