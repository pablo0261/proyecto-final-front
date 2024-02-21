import React, { useState } from "react";
import { allPeople, clear } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {

  const {searchInput, setSearchInput} = props
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchInput.length != 0) {
      const query = `&fullName=${searchInput}`
      dispatch(allPeople(query))
    }
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleClear = () => {
    setSearchInput("")
    dispatch(clear())
  }

  const handleAll = () => {
    dispatch(allPeople(""))
  }

  return (
    <div className={styles.container}>
      <form className={styles.container_form} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Buscar usuario por Nombre Completo"
          onChange={handleChange}
          value={searchInput} />
        <button type="submit">Buscar</button>
        <button type="button" onClick={()=>handleClear()}>Limpiar</button>
        <button type="button" onClick={()=>handleAll()}>Todos</button>
      </form>

    </div>
  );
}