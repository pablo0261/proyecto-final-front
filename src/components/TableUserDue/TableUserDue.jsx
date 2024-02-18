import React, { useEffect, useState } from 'react';
import styles from "./TableUserDue.module.scss";
import Pagination from '../Pagination/Pagination';
import { allProviderAdmin, getPeopleFilteredOrderedPagination, saveSelectionsGlobal } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Form from "../Form/FormMail/FormMail"

function TableUserDue() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const filterOrderSelectedGlobal = useSelector((state) => state.filterOrderSelected);
  const people = useSelector((state) => state.providerForAdmin.data);
  const InfoPag = useSelector((state) => state.providerForAdmin);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  //! desde aqui esta el filtro
  const [selectedOrder, setSelectedOrder] = useState(filterOrderSelectedGlobal.orders);
  const [selectedServices, setSelectedServices] = useState(filterOrderSelectedGlobal.filters);
  const [isLoading, setIsLoading] = useState()
  const [queryProps, setQueryProps] = useState("")
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const handleLoading = async () => {
      try {
        if (Object.values(filterOrderSelectedGlobal).every(property => property.length === 0)) {
          setIsLoading(true);
          await dispatch(getPeopleFilteredOrderedPagination(""));
          setIsLoading(false);
        } else {
          // Si la validación no se cumple, realizar el dispatch con otro valor
          await dispatch(allProviderAdmin("")); // Reemplaza "otro-valor" con el valor deseado
        }
      } catch (error) {
        // Manejar el error si ocurre durante la carga
        console.error("Error durante la carga:", error);
        setIsLoading(false);
      }
    };
  
    handleLoading();
  }, [dispatch, filterOrderSelectedGlobal]);
  

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
    dispatch(getPeopleFilteredOrderedPagination(queryProps, queryConstructOrder));
  };
  if (!people) {
    return null;
  }
  const onMailButtonClick = (email) => {
    setEmail(email)
  }
  

//! aqui van las funciones del filtro
  const handleFilterVisibility = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      setShowOrder(false);
    }
  };

  const handleOrderVisibility = () => {
    setShowOrder(!showOrder);
    if (!showOrder) {
      setShowFilters(false);
    }
  };

  const handleOrderSelected = (order) => {
    if (selectedOrder.includes(order)) {
      setSelectedOrder(selectedOrder.filter((selected) => selected !== order));
    } else {
      let updatedOrder;
      if (order.includes('fullName,')) {
        updatedOrder = selectedOrder.filter((selected) => !selected.includes('fullName,'));
      } else if (order.includes('averageRating,')) {
        updatedOrder = selectedOrder.filter((selected) => !selected.includes('averageRating,'));
      }
      setSelectedOrder([...updatedOrder, order]);
    }
  };

  const handleApply = async () => {
    setIsLoading(true)
    setShowOrder(false);
    setShowFilters(false);
    dispatch(saveSelectionsGlobal({ filters: selectedServices, orders: selectedOrder }));
    const query = `&idOption=${selectedServices.map((idOption) => idOption).join()}&idOrder=${selectedOrder.map((idOrder) => idOrder).join(";")}`
    setQueryProps(query)
    await dispatch(getPeopleFilteredOrderedPagination(query));
    setIsLoading(false)
  };
  const handleServiceSelected = (service) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter((selectedService) => selectedService !== service);
      } else {
        return [...prevSelectedServices, service];
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container_header}>
        <h2>Usuarios en deuda</h2>
        <a href="http://www.diegolepore.com.ar/webmail" target="_blank"><button>Ir a Webmail</button></a>
        <div className={styles.filterOrderContainer}>
            <button className={showFilters ? styles.buttonActived : styles.button} onClick={() => handleFilterVisibility()}>Filtrar</button>
            <button className={showOrder ? styles.buttonActived : styles.button} onClick={() => handleOrderVisibility()}>Ordenar</button>
          </div>
      </div>
      <div className={styles.filterOrderBox}>
            {showFilters && (
              <div className={styles.Box}>
              <div className={styles.filterBox}>
                <p className={styles.titleCategory}>Deudor</p>
                <div className={styles.optionsWrapper}>
                  <button
                    onClick={() => handleOrderSelected('price,DESC')}
                    className={selectedOrder.includes('price,DESC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    A-Z
                  </button>
                  <button
                    onClick={() => handleOrderSelected('price,ASC')}
                    className={selectedOrder.includes('price,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Z-A
                  </button>
                </div>
                <p className={styles.titleCategory}>A Vencer </p>
                <div className={styles.optionsWrapper}>
                  <button
                    onClick={() => handleOrderSelected('averageRating,DESC')}
                    className={selectedOrder.includes('averageRating,DESC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Deuda Reciente
                  </button>
                  <button
                    onClick={() => handleOrderSelected('averageRating,ASC')}
                    className={selectedOrder.includes('averageRating,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Deuda antigua
                  </button>
                </div>
              </div>
              <div className={styles.applyWrapper}>
                <button className={styles.button} onClick={handleApply}>Aplicar</button>
              </div>
            </div>
            )}
            {showOrder && (
              <div className={styles.Box}>
                <div className={styles.filterBox}>
                  <p className={styles.titleCategory}>Nombre</p>
                  <div className={styles.optionsWrapper}>
                    <button
                      onClick={() => handleOrderSelected('fullName,DESC')}
                      className={selectedOrder.includes('fullName,DESC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      A-Z
                    </button>
                    <button
                      onClick={() => handleOrderSelected('fullName,ASC')}
                      className={selectedOrder.includes('fullName,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Z-A
                    </button>
                  </div>
                  <p className={styles.titleCategory}>Fecha Deuda</p>
                  <div className={styles.optionsWrapper}>
                    <button
                      onClick={() => handleOrderSelected('averageRating,DESC')}
                      className={selectedOrder.includes('averageRating,DESC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Deuda Reciente
                    </button>
                    <button
                      onClick={() => handleOrderSelected('averageRating,ASC')}
                      className={selectedOrder.includes('averageRating,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Deuda antigua
                    </button>
                  </div>
                </div>
                <div className={styles.applyWrapper}>
                  <button className={styles.button} onClick={handleApply}>Aplicar</button>
                </div>
              </div>
            )}
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
      <Pagination pageNumber={InfoPag.pageNumber} totalOfPages={InfoPag.totalOfPages} onPageChange={handlerPagination} queryProps={queryProps}/>
      </div>
    </div>
  );
}

export default TableUserDue;
