import React, { useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar'
import TableUser from '../TableUser/TableUser'
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function FindUserAdmin() {
  const people1 = useSelector((state) => state.providerForAdmin.data);

  const people = useSelector((state) => state.peopleForAdmin.data);
  const dispatch = useDispatch();

  const findUser = (value) => {
    dispatch(allPeople(value));
  }
  
  useEffect(() => {
    findUser("");
  }, [people1]);

  return (
    <div>
      <h2>Buscar Usuario</h2>
      <SearchBar onSearch={findUser}/>
      <TableUser people={people}/>
    </div>
  )
}

export default FindUserAdmin