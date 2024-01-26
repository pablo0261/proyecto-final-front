import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from "../home/Home.module.sass"
import data from "../../../data.json";


const Home = () => {
  const [users, setUsers] = useState([]);


  //* Aqui va a guardar el get en el estado local para renderizar hasta que se vea si estos valores van a ser pasados al global
  // useEffect(async () => {
  //   const url = '/algunaruta';
  //   const res = await axios.get(url);
  //   setUsers(res.data);
  // }, []);
  useEffect(() => {
    setUsers(data.salida.data);
  }, []);


  return (
    <>
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <h2 className>Buscar en el mapa</h2>
          <div className={styles.map}>490*490</div>
        </div>

        <div className={styles.servicesContainer}>
          <div className={styles.filtersContainer}>
          <button className={styles.botones}>
              Filtrar
            </button>
            <button className={styles.botones}>
              Ordenar
            </button>
          </div>
          <div className={styles.cardContainer}>
          {users.map((user) => (
              <Card key={user.idPeople} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;