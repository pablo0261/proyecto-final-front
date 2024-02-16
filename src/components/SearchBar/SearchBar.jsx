import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {
  const { onSearch } = props;
  const [searchInput, setSearchInput] = useState([]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
    setSearchInput("");
  };

  return (
    <div className={styles.container}>

      <form className={styles.container_form} onSubmit={handleSubmit}>
        <input type="search" placeholder="Buscar" onChange={handleChange} value={searchInput} />
        <button type="submit">Buscar</button>
      </form>

    </div>
  );
}
