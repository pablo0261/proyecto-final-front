import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import styles from "../home/Home.module.sass"
import data from "../../../data.json";


const Home = () => {
  const [users, setUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);  
  const [showOrder, setShowOrder] = useState(false);  


  //* Aqui va a guardar el get en el estado local para renderizar hasta que se vea si estos valores van a ser pasados al global
  // useEffect(async () => {
  //   const url = '/algunaruta';
  //   const res = await axios.get(url);
  //   setUsers(res.data);
  // }, []);
  useEffect(() => {
    setUsers(data.salida.data);
  }, []);


  const handleFilterButtonClick = () => {
    setShowFilters(!showFilters);
  };
  const handleOrderButtonClick = () => {
    setShowOrder(!showOrder);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <h2 className>Buscar en el mapa</h2>
          <div className={styles.map}>
            
          </div>
        </div>

        <div className={styles.servicesContainer}>
          <div className={styles.filtersContainer}>
            <button className={styles.botones} onClick={handleFilterButtonClick}>
                <span>Filtrar</span>
            </button>
            {showFilters && (
              <div className={styles.filterBox}>
                <h3>Servicios</h3>
                <button className={styles.botones}>Cuidado</button>
                <button className={styles.botones}>Cuidado + Limpieza</button>
                <h3>Genero</h3>
                <button className={styles.botones}>Masculino</button>
                <button className={styles.botones}>Femenino</button>
                <h3>Ocupacion</h3>
                <button className={styles.botones}>Enfermero</button>
                <button className={styles.botones}>Medico</button>
              </div>
            )}
            <button className={styles.botones} onClick={handleOrderButtonClick}>Ordenar</button>
            {showOrder && (
              <div className={styles.filterBox}>
                <h3>Precio</h3>
                <button className={styles.botones}>Mayor</button>
                <button className={styles.botones}>Menor</button>
                <h3>Rating</h3>
                <button className={styles.botones}>Mejor Calificacion</button>
                <button className={styles.botones}>Menor Calificacion</button>
                <h3>Antiguedad</h3>
                <button className={styles.botones}>Mayor</button>
                <button className={styles.botones}>Menor</button>
              </div>
            )}
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