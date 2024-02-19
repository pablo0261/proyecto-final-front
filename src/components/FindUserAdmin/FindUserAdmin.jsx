import SearchBar from '../SearchBar/SearchBar';
import TableUser from '../TableUser/TableUser';
import styles from "./FindUserAdmin.module.scss";
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Form from "../Form/FormMail/FormMail"

function FindUserAdmin() {
  const people = useSelector((state) => state.peopleForAdmin.data);
  const [valor, setValor] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
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

  return (
    <div>
      <div className={styles.container}>
        <h2>Buscar Usuario</h2>
        <SearchBar onSearch={findUser} onSearchChange={funcionbusqueda} />
      </div>
      <TableUser people={people} valor={valor} onMailButtonClick={onMailButtonClick} handleShowForm={handleShowForm}/>
      {showForm && <Form handleShowForm={handleShowForm} email={email}/>}
    </div>
  );
}

export default FindUserAdmin;
