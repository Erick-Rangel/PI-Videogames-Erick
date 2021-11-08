import React , {useState} from "react";
import { useDispatch } from "react-redux";
import { getName } from "../actions";
import style from "./css/principal.module.css"

export default function Searchbar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")


    const handleInputChange=(e)=>{
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(getName(name))
        setName("")
    }

    return (
      <div className={style.search}>
        <input
          type="text"
          value={name}
          placeholder="Search"
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => handleInputChange(e)}
        />

        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
    );
}
