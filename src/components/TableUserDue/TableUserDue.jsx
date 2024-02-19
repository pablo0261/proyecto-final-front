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
  }, []);

  const handleChangeStatus = async (value, state) => {
    const auxState = state === "Active" ? "Inactive" : "Active";
      const response = await axios.put(`${REACT_APP_API_URL}/people`, {
        "idPeople": value,
        "state": auxState
      });
      if (response.status === 200) {
        return dispatch(allProviderAdmin("&pageNumber=" + InfoPag.pageNumber));
      }
    }

  const handlerPagination = (queryConstructOrder) => {
    dispatch(allProviderAdmin(queryConstructOrder));
  };

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
              <td><button onClick={() => {
                handleShowForm();
                onMailButtonClick(person.people.email);
              }}>MAIL</button></td>
              <td><button onClick={() => handleChangeStatus(person.people.idPeople, person.people.state)} >{person.people.state === "Active" ? "Inactivo" : "Activo"}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && <Form handleShowForm={handleShowForm} email={email}/>}

      <div>
      <Pagination pageNumber={InfoPag.pageNumber} totalOfPages={InfoPag.totalOfPages} onPageChange={handlerPagination}/>
      </div>



    </div>
  );
}

export default TableUserDue;
