import React from 'react';
import styles from "./TableUser.module.scss";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { allPeople } from '../../redux/actions';
import Swal from 'sweetalert2';

function TableUser(props) {

  const { people, searchInput, onMailButtonClick, handleShowForm } = props
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const handleChangeStatus = async (idPeople, state) => {
    const auxState = state === "Active" ? "Inactive" : "Active";
    const response = await axios.put(`${REACT_APP_API_URL}/people`, {
      "idPeople": idPeople,
      "state": auxState
    });
    if (response.status === 200) {
      if (searchInput.length != 0) {
        const query = `&fullName=${searchInput}`
        dispatch(allPeople(query))
      } else {
        dispatch(allPeople(""))
      }
    } else {
      Swal.fire({
        title: 'Error al cambiar el estado del usuario',
        text: 'Por favor, notifique a los programadores',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  const handleChangeCancel = async (idPeople, state) => {
    const auxState = state === "Deleted" ? "Active" : "Deleted";
    const response = await axios.put(`${REACT_APP_API_URL}/people`, {
      "idPeople": idPeople,
      "state": auxState
    });
    if (response.status === 200) {
      if (searchInput.length != 0) {
        const query = `&fullName=${searchInput}`
        dispatch(allPeople(query))
      } else {
        dispatch(allPeople(""))
      }
    } else {
      Swal.fire({
        title: 'Error al cambiar el estado del usuario',
        text: 'Por favor, notifique a los programadores',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.firstTh}>Nombre Completo</th>
              <th>Correo Electrónico</th>
              <th className={styles.centerTd}>Telefono</th>
              <th className={styles.centerTd}>Tipo de Usuario</th>
              <th className={styles.centerTd}>Estado</th>
              <th className={styles.centerTd}>Ultimo Pago</th>
              <th className={styles.centerTd}>Antigüedad</th>
              <th></th>
              <th></th>
              <th className={styles.lastTd}></th>
            </tr>
          </thead>
          <tbody>
            {people && people.map((person) => (
              <tr key={person.people.idPeople}>
                <td className={styles.firstTd}>{person.people.fullName}</td>
                <td>{person.people.email}</td>
                <td className={styles.centerTd}>{person.people.phone}</td>
                <td className={styles.centerTd}>{person.people.typeOfPerson}</td>
                <td className={styles.centerTd}>{person.people.state}</td>
                <td className={styles.centerTd}>{person.people.pago || "No data"}</td>
                <td className={styles.centerTd}>{person.people.dateOfAdmission}</td>
                <td><button
                  className={styles.mail}
                  onClick={() => {
                    handleShowForm();
                    onMailButtonClick(person.people.email);
                  }}>Enviar email</button></td>
                <td>
                  {
                    person.people.state != "Unverified" &&
                    <button
                      className={person.people.state === "Active" ? styles.inactivo : styles.activo}
                      type="button"
                      onClick={() => handleChangeStatus(person.people.idPeople, person.people.state)}
                    >
                      {person.people.state === "Active" ? "Desactivar" : "Activar"}
                    </button>
                  }
                </td>
                <td className={styles.lastTd}>
                  {
                    person.people.state != "Deleted" &&
                    <button
                      className={styles.cancel}
                      type="button"
                      onClick={() => handleChangeCancel(person.people.idPeople, person.people.state)}
                    >
                      Cancelar
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default TableUser;
