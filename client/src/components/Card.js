import React from 'react'
import styles from './css/card.module.css'

export const Card = ({ name, image, genres, rating}) => {
    
    return (
        <div className={styles.div}>
            <h3>{name}</h3>
            <img src={image} alt={name} />                        
            <h4>{rating}</h4>
            <h3>{genres}</h3>
        </div>
    )
}
