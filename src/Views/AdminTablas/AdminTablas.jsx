import React from 'react';
import { useSelector } from 'react-redux';
import styles from "./AdminTablas.module.sass";
import AdminServices from '../../components/AdminServices/AdminServices';

function AdminTablas() {

  const servicios = useSelector((state) => state.allServices);

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        {servicios.length != 0 &&
          servicios.map((categoria, index) => {
            if (!categoria.isGenre) {
              return (
                <div key={index} className={styles.section}>
                  <p className={styles.title}>{categoria.description}</p>
                  <AdminServices
                    idCategorie={categoria.idCategorie}
                    categoriesOptions={categoria.categories_options}
                    className={styles.adminservices}
                  />
                </div>
              )
            }
          }
          )}
      </div>
    </div>
  );
}

export default AdminTablas;
