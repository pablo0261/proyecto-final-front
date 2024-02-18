import React from 'react';
import styles from "./TableUser.module.scss";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { allPeople } from '../../redux/actions';

function TableDue({ people , valor }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const handleChangeStatus = async (value, state) => {
    const auxState = state === "Active" ? "Inactive" : "Active";
    const response = await axios.put(`${REACT_APP_API_URL}/people`, {
      "idPeople": value,
      "state": auxState
    });
    if (response.status === 200) {
      dispatch(allPeople(valor))
    }
  }
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
          {people && people.map((person) => (
            <tr key={person.people.idPeople}>
              <td>{person.people.fullName}</td>
              <td>{person.people.email}</td>
              <td>{person.people.phone}</td>
              <td>{person.people.state}</td>
              <td>{person.people.pago || "No data"}</td>
              <td>{person.people.dateOfAdmission}</td>
              <td><button >MAIL</button></td>
              <td><button className={styles.activo} type="button" onClick={() => handleChangeStatus(person.people.idPeople, person.people.state)} >{person.people.state === "Active" ? "Inactivo" : "Activo"}</button></td>
              <td><button className={styles.cancelar}>Cancelar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

export default TableDue;
