import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import styles from "../home/Home.module.sass";
import MapHome from "../../components/MapHome/MapHome";
import { useSelector, useDispatch } from "react-redux";
import { filter, allPeopleProvider, filterservices } from "../../redux/actions";

const Home = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const filtros = useSelector((state) => state.FilterCards);
  const providers = useSelector((state) => state.getAllPeople);
  const allServices = useSelector((state) => state.allServices);

  useEffect(() => {
    dispatch(allPeopleProvider());
    dispatch(filterservices());
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
        return prevSelectedServices.filter(
          (selectedService) => selectedService !== service
        );
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

  const hadleClick = () => {
    handleApplyButtonClick();
    dispatch(filter(selectedServices, selectedGender));
  };

  console.log("este es el local", providers);


  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <h2>Buscar en el mapa</h2>
          <MapHome />
        </div>

        <div className={styles.servicesContainer}>
          <div className={styles.filtersContainer}>
            <button
              className={styles.botones}
              onClick={handleFilterButtonClick}
            >
              <span>Filtrar</span>
            </button>
            <button
              className={styles.botones}
              onClick={handleOrderButtonClick}
            >
              <span>Ordenar</span>
            </button>
          </div>
          <div>
            {showFilters && (
              <div className={styles.filterBox}>
                {allServices.map((category) => (
                  <div key={category.idCategorie}>
                    <h3>{category.description}</h3>
                    {category.categories_options.map((option) => (
                      <button
                        key={option.idOption}
                        className={`${styles.botones} ${
                          selectedServices.includes(option.description) &&
                          styles.selected
                        }`}
                        onClick={() =>
                          handleServiceButtonClick(option.description)
                        }
                      >
                        {option.description}
                      </button>
                    ))}
                  </div>
                ))}
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
                <br></br>
                <button
                  className={styles.botones}
                  onClick={hadleClick}
                >
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
                <button className={styles.botones}>
                  Menor Calificacion
                </button>
                <h3>Antiguedad</h3>
                <button className={styles.botones}>Mayor</button>
                <button className={styles.botones}>Menor</button>
              </div>
            )}
          </div>

          <div className={styles.cardContainer}>
            {Array.isArray(providers) &&
              providers.map((user) => <Card key={user.people.idPeople} user={user.people} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
