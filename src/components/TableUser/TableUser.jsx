import React, { useEffect } from 'react';
import styles from "./TableUser.module.sass";
import { allPeople } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function TableDue() {
  const people = useSelector((state) => state.peopleForAdmin.data);
  const dispatch = useDispatch();

  useEffect(() => {
    useDispatch(allPeople());
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
        
      </table>
    </div>
  );
}

export default TableDue;
