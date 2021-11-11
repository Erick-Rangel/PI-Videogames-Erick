import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from './Card';
import styles from "./css/link.module.css"

export const BuscarId = React.memo(({ setJuegosPorPage, currentJuegos }) => {
  return (
    <div>
     { 
     currentJuegos.length>0?
     currentJuegos?.map(({ id, name, image, genres, rating, img }) => {
        return (
          <>
            <Link to={`/${id}`} className={styles.link}>
              <Card
                key={id}
                set={setJuegosPorPage}
                name={name}
                image={img ? img : image}
                rating={rating}
                genres={genres}
              />
            </Link>
          </>
        );
      })
    :
    <h1 className={styles.h}>No se encontraron los juegos</h1>
    }
    </div>
  );
});
