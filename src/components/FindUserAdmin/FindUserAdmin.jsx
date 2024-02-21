import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TableUser from '../TableUser/TableUser';
import styles from "./FindUserAdmin.module.scss";
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Form from "../Form/FormMail/FormMail"
import loadingHouse from "../../assets/Icons/loadingHouse.gif"

function FindUserAdmin() {

  const people = useSelector((state) => state.peopleForAdmin.data);
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const onMailButtonClick = (email) => {
    setEmail(email)
  }

  /* useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); //* Simula 2 seg de retraso para darle tiempo a cargar a los componentes
  }, []); */

  return (
    <div className={styles.background}>
      {/* !isLoading
        ? */
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <p className={styles.title}>Buscar Usuario</p>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
          </div>
          <TableUser people={people} onMailButtonClick={onMailButtonClick} handleShowForm={handleShowForm} searchInput={searchInput} />
          {showForm && <Form handleShowForm={handleShowForm} email={email} />}
        </div>
       /*  : 
        <div className={styles.loading}>
          <img src={loadingHouse} alt="Loading..." />
        </div> */
      }
    </div>
  );
}

export default FindUserAdmin;
