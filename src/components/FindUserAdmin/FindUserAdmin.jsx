import SearchBar from '../SearchBar/SearchBar';
import TableUser from '../TableUser/TableUser';
import styles from "./FindUserAdmin.module.scss";
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function FindUserAdmin() {
  const people = useSelector((state) => state.peopleForAdmin.data);
  const [valor, setValor] = useState("");
  const dispatch = useDispatch();

  const findUser = (value) => {
    dispatch(allPeople(value));
  }

  const funcionbusqueda = (queryConstructOrder) => {
    setValor(queryConstructOrder);
    dispatch(allPeople(queryConstructOrder));
    return queryConstructOrder;
  };


  return (
    <div>
      <div className={styles.container}>
        <h2>Buscar Usuario</h2>
        <SearchBar onSearch={findUser} onSearchChange={funcionbusqueda} />
      </div>
      <TableUser people={people} valor={valor} />
    </div>
  );
}

export default FindUserAdmin;
