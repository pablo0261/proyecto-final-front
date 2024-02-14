import React, { useEffect } from 'react';
import styles from "./TableUserDue.module.sass";
import Pagination from '../Pagination/Pagination';
import { allPeopleProvider } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function TableUserDue() {
  const people = useSelector((state) => state.getAllPeople.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPeopleProvider(""));
  }, [dispatch]); 

  if (!people) {
    return null;
  }

  return (
    <div>
      <h2>Usuarios en deuda</h2>

      <div className={styles.container}>
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Mail</th>
              <th>Telefono</th>
              <th>Activo/Inactivo</th>
              <th>Pago</th>
              <th>Antiguedad</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.people.idPeople}>
                <td>{person.people.fullName}</td>
                <td>{person.people.email}</td>
                <td>{person.people.phone}</td>
                <td>{person.people.state}</td>
                {/* Revisar el campo del pago */}
                <td>{person.people.pago}</td>
                <td>{person.people.dateOfAdmission}</td>
                <td><button>MAIL</button></td>
                <td><button>On/Off</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <Pagination />
      </div>
      <h3>Dar de baja automáticamente adeudados</h3>
      <h3>Aviso previo día anterior</h3>
    </div>
  );
}

export default TableUserDue;
