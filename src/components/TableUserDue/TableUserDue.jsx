import React, { useEffect } from 'react';
import styles from "./TableUserDue.module.scss";
import Pagination from '../Pagination/Pagination';
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function TableUserDue() {
  const people = useSelector((state) => state.peopleForAdmin.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPeople());
  }, [dispatch]); // Agrega dispatch como dependencia

  if (!people) {
    // Manejar el caso donde people aún no está definido
    return null;
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.container_header}>

        <h2>Usuarios en deuda</h2>
        
        <div>
        <h3>Dar de baja automáticamente adeudados</h3>
        <h3>Aviso previo día anterior</h3>
      </div>
      </div>
      

      <table>
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
              <td><button className={styles.mail}>MAIL</button></td>
              <td><button className={styles.activo}>On/Off</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <Pagination />
      </div>



    </div>
  );
}

export default TableUserDue;
