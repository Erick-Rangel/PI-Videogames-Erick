import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./css/loading.module.css"
import video from "./images/fondo.mp4"

export const Loading = () => {
    return (
      <>
      <>
        <video className={styles.video} src={video} autoPlay loop>         
      </video>
      </>
      <Link to="/home">
      <div className={styles.center}>
        <h1>Bienvenidos</h1>
        
          <button>Entrar</button>
      </div>
        </Link>
      </>
    );
}

export default Loading;