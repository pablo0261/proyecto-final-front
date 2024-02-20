import React, { useState } from "react";
import { clear } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.scss";

export default function SearchBar({onSearchChange, setShowTable}) {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  let algunvalor = "";

  const handleClear = () => {
    setSearchInput("")
    dispatch(clear())
    setShowTable(false)
  }

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchInput !== "") {
      algunvalor = "&fullName=" + searchInput;
    }
    onSearchChange(algunvalor);
    setShowTable(true); // Mostrar la tabla cuando hay resultados de búsqueda
  };

  return (
    <div className={styles.container}>

      <form className={styles.container_form} onSubmit={handleSubmit}>
        <input type="search" placeholder="Buscar" onChange={handleChange} value={searchInput} />
        <button type="submit">Buscar</button>
        <button type="button" onClick={handleClear}>Limpiar</button>
      </form>

    </div>
  );
}