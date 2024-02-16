import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import TableUser from '../TableUser/TableUser'
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function FindUserAdmin() {
  const people = useSelector((state) => state.peopleForAdmin.data);
  const dispatch = useDispatch();

  const findUser = (value) => {
    dispatch(allPeople(value));
  }
  
  const funcionbusqueda = (queryConstructOrder) => {
    dispatch(allPeople(queryConstructOrder));
  };

  return (
    <div>
      <h2>Buscar Usuario</h2>
      <SearchBar onSearch={findUser} onSearchChange={funcionbusqueda}/>
      <TableUser people={people}/>
    </div>
  )
}

export default FindUserAdmin