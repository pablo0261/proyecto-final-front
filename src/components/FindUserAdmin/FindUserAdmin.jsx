import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TableUser from '../TableUser/TableUser';
import styles from "./FindUserAdmin.module.scss";
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Form from "../Form/FormMail/FormMail"
import loadingHouse from "../../assets/Icons/loadingHouse.gif"

function FindUserAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const people = useSelector((state) => state.peopleForAdmin.data);
  const [valor, setValor] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const dispatch = useDispatch();

  const findUser = (value) => {
    dispatch(allPeople(value));
  }
  const funcionbusqueda = (queryConstructOrder) => {
    setValor(queryConstructOrder);
    dispatch(allPeople(queryConstructOrder));
    return queryConstructOrder;
  };

  const onMailButtonClick = (email) => {
    setEmail(email)
  }

  // useEffect(() => {
  //   setIsLoading(true); 
  //   setTimeout(() => {
  //     setIsLoading(false); 
  //   }, 2000); //* Simula 2 seg de retraso para darle tiempo a cargar a los componentes
  // }, []);

  return (
    <>
      {/* {!isLoading && ( */}
        <div>
          <div className={styles.container}>
            <h2>Buscar Usuario</h2>
            {/* <SearchBar setIsLoading={setIsLoading} onSearch={findUser} onSearchChange={funcionbusqueda} /> */}
            <SearchBar  onSearch={findUser} onSearchChange={funcionbusqueda } setShowTable={setShowTable}/>
          </div>
          {/* <TableUser setIsLoading={setIsLoading} people={people} valor={valor} onMailButtonClick={onMailButtonClick} handleShowForm={handleShowForm}/> */}
          {showTable && <TableUser  people={people} valor={valor} onMailButtonClick={onMailButtonClick} handleShowForm={handleShowForm}/>}
          {showForm && <Form handleShowForm={handleShowForm} email={email}/>}
        </div>
       {/*)}
      {isLoading && (
        <div className={styles.loading}>
          <img src={loadingHouse} alt="Loading..." />
        </div>
      )} */}
    </>
  );
}

export default FindUserAdmin;
