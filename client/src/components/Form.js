import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import{postVideogame, getGenres} from "../actions/index"
import { useDispatch,useSelector } from 'react-redux'
import styles from "./css/crear.module.css"

export default function VideogameCreate({history}) {
  
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const genres = useSelector((state) => state.genres) 
    const [videogame, setVideogame] = useState({
      name: '',
    genres: [],
    platforms: [],
    description: '',
    img: '',
    fecha: '',
    rating: ''
  })

  function validate (input){
    let error = {};
    if (!input.name && input.name === "") {
      error.name = 'El nombre es requerido'
      } else if(input.name.length < 3){
        error.name = 'El nombre debe tener al menos 3 caracteres'
      }
      
      if(!input.description && input.description === ''){
        error.description = 'La descripción es requerida'
      } else if(input.description.length < 3){
        error.description = 'La descripción debe tener al menos 3 caracteres'
      }

      if(!input.fecha && input.fecha === ''){
        error.fecha = 'La fecha es requerida'
      }
      
      if(!input.rating && input.rating === ''){
        error.rating = 'El rating es requerido'
      }
      
      return error
    }

    useEffect(() => {
      dispatch(getGenres())    
    }, [dispatch])
    
    const handleChange = (e) => {
      setVideogame({
        ...videogame,
        [e.target.name]: e.target.value
      })
      setErrors(validate({
        ...videogame,
        [e.target.name]: e.target.value
      }))
      
    }

     function handleDelete(e){
      
      setVideogame({
        ...videogame,
        videogame: videogame.genres.map(genre => genre !== e.target.value)
      })
    }  
    
  function HandleSubmi (e) {
    e.preventDefault()
    dispatch(postVideogame(videogame))
    alert("Videojuego Creado")
    setVideogame({
      name: '',
      genres: [],
      platforms: [],
      description: '',
      img: '',
      fecha: '',
      rating: ''
    })
    history.push('/home')
    }

  function handleSelect(e){
    console.log(e.target.value)
    setVideogame({
      ...videogame,
      genres: [...videogame.genres, e.target.value]
  } )
  }

  function handlePlatforms(e){
    setVideogame({
      ...videogame,
      platforms: [...videogame.platforms, e.target.value]
  } )
  }

  return (
    <div className={styles.crear}>
      <Link to="/home">
        <button className={styles.boton}>Volver</button>
      </Link>
      <h1 className={styles.h}>Crea tu Videojuego</h1>
      <form onSubmit={(e) => HandleSubmi(e)} className={styles.form}>
        <div className={styles.cont}>
          <label>Nombre*:</label>
          <input
            type="text"
            value={videogame.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <label>Descripcion*:</label>
          <input
            type="text"
            value={videogame.description}
            name="description"
            onChange={handleChange}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}

          <label>Fecha*:</label>
          <input
            type="date"
            value={videogame.fecha}
            name="fecha"
            onChange={handleChange}
          />
          {errors.fecha && <p className={styles.error}>{errors.fecha}</p>}

          <label>Rating*:</label>
          <input
            type="number"
            step="any"
            value={videogame.rating}
            name="rating"
            onChange={handleChange}
          />
          {errors.rating && <p className={styles.error}>{errors.rating}</p>}
          <label>Imagen:</label>
          <input
            type="text"
            value={videogame.img}
            name="img"
            onChange={handleChange}
          />

          <label>Genero:</label>
          <select
            value={videogame.genres}
            name="genres"
            onChange={(e) => handleSelect(e)}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <label>Plataforma:</label>
          <select
            value={videogame.platforms}
            name="plataforma"
            onChange={handlePlatforms}
          >
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="PS4">PS4</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Xbox Series S/X">Xbox Series S/X</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Androind">Androind</option>
            <option value="IOS">IOS</option>
            <option value="Nintendo 3DS">Nintendo 3DS</option>
            <option value="Nintendo Wii U">Nintendo Wii U</option>
            <option value="Xbox 360">Xbox 360</option>
          </select>
          <ul>
            <li>{videogame.genres.map((e) => e + ", ")}</li>
          </ul>
          <ul>
            <li>{videogame.platforms.map((e) => e + " ,")}</li>
          </ul>
          <p>* Campos obligatorios</p>
          {errors.name ||
          !videogame.name ||
          errors.description ||
          errors.fecha ||
          errors.rating ? (
            <button type="submit" disabled>
              Crear Videojuego
            </button>
          ) : (
            <button type="submit">Crear Videojuego</button>
          )}
        </div>
      </form>

      {videogame.genres.map((e) => (
        <div key={e.id}>
          <p>
            {e.genres?.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </p>
          <button onClick={() => handleDelete(e)}>X</button>
        </div>
      ))}
    </div>
  );
          
          
}
