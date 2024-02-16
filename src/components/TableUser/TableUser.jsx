import React, { useEffect } from 'react';
import styles from "./TableUser.module.sass";
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function TableDue() {
  const people = useSelector((state) => state.peopleForAdmin.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción para obtener datos
    dispatch(allPeople());
  }, [dispatch]); // Agrega dispatch como dependencia del useEffect

  return (
    <div className={styles.wrapper}>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Verifica si people está definido antes de mapear */}
          {people && people.map((person) => (
            <tr key={person.people.idPeople}>
              <td>{person.people.fullName}</td>
              <td>{person.people.email}</td>
              <td>{person.people.phone}</td>
              <td>{person.people.state}</td>
              {/* Asegúrate de que el campo 'pago' esté definido */}
              <td>{person.people.pago || "No data"}</td>
              <td>{person.people.dateOfAdmission}</td>
              <td><button className={styles.mail}>MAIL</button></td>
              <td><button className={styles.activo}>Activo/Inactivo</button></td>
              <td><button className={styles.cancelar}>Cancelar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDue;
