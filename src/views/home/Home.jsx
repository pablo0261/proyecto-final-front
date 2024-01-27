import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import styles from "../home/Home.module.sass";
import data from "../../../data.json";
import MapHome from "../../components/MapHome/MapHome";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    setUsers(data.salida.data);
  }, []);

  const handleFilterButtonClick = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      setShowOrder(false);
    }
  };

  const handleOrderButtonClick = () => {
    setShowOrder(!showOrder);
    if (!showOrder) {
      setShowFilters(false);
    }
  };

  const handleServiceButtonClick = (service) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter((selectedService) => selectedService !== service);
      } else {
        return [...prevSelectedServices, service];
      }
    });
  };

  const handleGenderButtonClick = (gender) => {
    setSelectedGender((prevSelectedGender) =>
      prevSelectedGender === gender ? null : gender
    );
  };

  const handleApplyButtonClick = () => {
    console.log("Servicios seleccionados:", selectedServices);
    if (selectedGender) {
      console.log("Género seleccionado:", selectedGender);
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        selectedGender,
      ]);
    }
    setShowFilters(false);
  };
  console.log(selectedServices)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <h2>Buscar en el mapa</h2>
            <MapHome/>
        </div>

        <div className={styles.servicesContainer}>
          <div className={styles.filtersContainer}>
            <button className={styles.botones} onClick={handleFilterButtonClick}>
              <span>Filtrar</span>
            </button>
            <button className={styles.botones} onClick={handleOrderButtonClick}>
              <span>Ordenar</span>
            </button>
          </div>
          <div>
            {showFilters && (
              <div className={styles.filterBox}>
                <h3>Servicios</h3>
                <button
                  className={`${styles.botones} ${selectedServices.includes("Cuidado") && styles.selected}`}
                  onClick={() => handleServiceButtonClick("Cuidado")}
                >
                  Cuidado
                </button>
                <button
                  className={`${styles.botones} ${selectedServices.includes("Cuidado + Limpieza") && styles.selected}`}
                  onClick={() => handleServiceButtonClick("Cuidado + Limpieza")}
                >
                  Cuidado + Limpieza
                </button>
                <h3>Genero</h3>
                <button
                  className={`${styles.botones} ${
                    selectedGender === "Masculino" && styles.selected
                  }`}
                  onClick={() => handleGenderButtonClick("Masculino")}
                >
                  Masculino
                </button>
                <button
                  className={`${styles.botones} ${
                    selectedGender === "Femenino" && styles.selected
                  }`}
                  onClick={() => handleGenderButtonClick("Femenino")}
                >
                  Femenino
                </button>
                <h3>Ocupacion</h3>
                <button className={`${styles.botones} ${selectedServices.includes("Enfermero") && styles.selected}`}onClick={() => handleServiceButtonClick("Enfermero")}>Enfermero</button>
                <button className={`${styles.botones} ${selectedServices.includes("Medico") && styles.selected}`}onClick={() => handleServiceButtonClick("Medico")}>Medico</button>

                  <br></br>
                <button className={styles.botones} onClick={handleApplyButtonClick}>
                  Aplicar
                </button>
              </div>
            )}
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
