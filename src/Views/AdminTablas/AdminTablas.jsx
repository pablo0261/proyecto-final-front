import React, { useEffect } from 'react';
import { getFiltersOrdersDB } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./AdminTablas.module.sass";
import AdminServices from '../../components/AdminServices/AdminServices';

function AdminTablas() {
  const servicios = useSelector((state) => state.allServices);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiltersOrdersDB());
  }, []);
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
      {servicios.map((categoria, index) => (
        <div className={styles.containerh2} key={index}>
          <h2>{categoria.description}</h2>
          <AdminServices
            categoriesOptions={categoria.categories_options}
            idCategorie={categoria.idCategorie} 
            servicios={servicios} 
            className={styles.adminservices}
          />
        </div>
      ))}
    </div>
    </div>
  );
}

export default AdminTablas;
