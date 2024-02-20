import React, { useEffect, useState } from 'react';
import styles from "./TableUserDue.module.scss";
import Pagination from '../Pagination/Pagination';
import { allProviderAdmin } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Form from "../Form/FormMail/FormMail"

function TableUserDue() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const people = useSelector((state) => state.providerForAdmin.data);
  const InfoPag = useSelector((state) => state.providerForAdmin);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  useEffect(() => {
    dispatch(allProviderAdmin(""));
  }, [people]);

  const handleChangeStatus = async (value, state) => {
    const auxState = state === "Active" ? "Inactive" : "Active";
      const response = await axios.put(`${REACT_APP_API_URL}/people`, {
        "idPeople": value,
        "state": auxState
      });
      // if (response.status === 200) {
      //   return dispatch(allProviderAdmin("&pageNumber=" + InfoPag.pageNumber));
      // }
    }

  // const handlerPagination = (queryConstructOrder) => {
  //   dispatch(allProviderAdmin(queryConstructOrder));
  // };

  if (!people) {
    return null;
  }
  const onMailButtonClick = (email) => {
    setEmail(email)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container_header}>
        <h2>Usuarios en deuda</h2>
        <a href="http://www.diegolepore.com.ar/webmail" target="_blank"><button>Ir a Webmail</button></a>
        <div className={styles.filterOrderContainer}>
            {/* <button className={showFilters ? styles.buttonActived : styles.button} onClick={() => handleFilterVisibility()}>Filtrar</button>
            <button className={showOrder ? styles.buttonActived : styles.button} onClick={() => handleOrderVisibility()}>Ordenar</button> */}
          </div>
      </div>
      

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Mail</th>
            <th>Activo/Inactivo</th>
            <th>Dia de pago</th>
            <th>Pago</th>
            <th>Fecha de Emision</th>
            <th>Fecha de Vencimiento</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.person.idPeople}>
              <td>{person.person.fullName}</td>
              <td>{person.person.email}</td>
              <td>{person.person.state}</td>
              <td>{person.paymentDay}</td>
              <td>{person.price}</td>
              <td>{person.emisionDate}</td>
              <td>{person.dueDate}</td>
              <td><button className={styles.mail} onClick={() => {
                handleShowForm();
                onMailButtonClick(person.person.email);
              }}>MAIL</button></td>
              <td><button 
              className={person.person.state === "Active" ? styles.inactivo : styles.activo} 
              onClick={() => handleChangeStatus(person.person.idPeople, person.person.state)} >
              {person.person.state === "Active" ? "Desactivar" : "Activar"}
              </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && <Form handleShowForm={handleShowForm} email={email}/>}
      {/* <div>
      <Pagination pageNumber={InfoPag.pageNumber} totalOfPages={InfoPag.totalOfPages} onPageChange={handlerPagination}/>
      </div> */}
    </div>
  );
}

export default TableUserDue;