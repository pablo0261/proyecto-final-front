import React, { useEffect } from 'react';
import styles from "./TableUser.module.sass";
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function TableDue() {
  const people = useSelector((state) => state.peopleForAdmin.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPeople());
  }, []);

  return (
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
                   {/* //Hay que revisar el campo del pago */}
                   <td>{person.people.pago}</td>
                   <td>{person.people.dateOfAdmission}</td>
              <td><button>MAIL</button></td>
              <td><button>Activo/Inactivo</button></td>
              <td><button>Cancelar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDue;
