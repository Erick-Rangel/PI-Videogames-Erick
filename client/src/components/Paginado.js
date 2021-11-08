import React from 'react';
import styles from './css/paginado.module.css';


export default function Paginado({allvideogames,juegosPorPage,paginado}) {
const PageNumbers =[];
    for (let i = 1; i <= Math.ceil(allvideogames/juegosPorPage); i++) {
        PageNumbers.push(i);
    }
  return (
    <nav >
      <ul className={styles.paginado}>
        {PageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}