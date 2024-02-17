import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar'
import TableUser from '../TableUser/TableUser'
import styles from "./FindUserAdmin.module.scss";


function FindUserAdmin({people}) {
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function FindUserAdmin() {
  const people = useSelector((state) => state.peopleForAdmin.data);
  const dispatch = useDispatch();
  // const [flag, setFlag] = useState(true);
  // useEffect(() => {
  //   dispatch(allPeople(""));
  // }, [flag]); 

  const findUser = (value) => {
    dispatch(allPeople(value));
  }
  
  const funcionbusqueda = (queryConstructOrder) => {
    console.log(queryConstructOrder)
    dispatch(allPeople(queryConstructOrder));
  };

  return (
    <div >

      <div className={styles.container}>
        <h2>Buscar Usuario</h2>
        <SearchBar onSearch={findUser} onSearchChange={funcionbusqueda}/>
      </div>
      <TableUser people={people}/>

    </div>
  )
}

export default FindUserAdmin