import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import styles from "../home/Home.module.sass";
import MapHome from "../../components/MapHome/MapHome";
import { useSelector, useDispatch } from "react-redux";
import { allPeopleProvider, getPeopleFilteredOrderedPagination, saveSelectionsGlobal } from "../../redux/actions";

const Home = () => {
  
  const filterOrderSelectedGlobal = useSelector((state) => state.filterOrderSelected);
  const providers = useSelector((state) => state.getAllPeople);
  const allServices = useSelector((state) => state.allServices);

  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const [selectedServices, setSelectedServices] = useState(filterOrderSelectedGlobal.filters);



  useEffect(() => {
    if (Object.values(filterOrderSelectedGlobal).every(property => property.length === 0)) {
      dispatch(allPeopleProvider());
    }
  }, []);


  const handleFilterButtonClick = () => {// Función para manejar el clic en el botón de filtro
    setShowFilters(!showFilters);// Cambia la visibilidad de la sección de filtros
    if (!showFilters) {// Si los filtros están visibles, oculta la sección de orden
      setShowOrder(false);
    }
  };


  const handleOrderButtonClick = () => {// Función para manejar el clic en el botón de ordenar
    setShowOrder(!showOrder);// Cambia la visibilidad de la sección de orden
    if (!showOrder) {// Si la sección de orden está visible, oculta la sección de filtros

      setShowFilters(false);
    }
  };


  const handleServiceSelected = (service) => {
    setSelectedServices((prevSelectedServices)
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter((selectedService) => selectedService !== service);
      } else {
        return [...prevSelectedServices, service];
      }
    });
  };


  const handleConfirmFilters = () => {

    setShowFilters(false);
  };

  const queryConstructor = () => {
    if (selectedServices.length > 0) {
      const queryConstruct = `idOption=${selectedServices.map((idOption) => idOption).join()}`;
      return queryConstruct;
    }
  };

  const handleApply = () => {
    handleConfirmFilters();
    queryConstructor();
    dispatch(saveSelectionsGlobal({ filters : selectedServices }));
    dispatch(getPeopleFilteredOrderedPagination(queryConstructor()));
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.mapWrapper}>
          <p className={styles.titleMap}>Buscar en el mapa</p>
          <MapHome />
        </div>
        <div className={styles.servicesContainer}>
          <div className={styles.filterOrderContainer}>
            <button className={showFilters ? styles.buttonActived : styles.button} onClick={() => handleFilterVisibility()}>Filtrar</button>
            <button className={showOrder ? styles.buttonActived : styles.button} onClick={() => handleOrderVisibility()}>Ordenar</button>
          </div>
          <div className={styles.filterOrderBox}>
            {showFilters && (
              <div className={styles.filterBox}>
                {allServices.map((category) => (
                  <div key={category.idCategorie} className={styles.categoryWrapper}>
                    <p className={styles.titleCategory}>{category.description}</p>
                    <div className={styles.optionsWrapper}>
                      {category.categories_options.map((option) => (
                        <button
                          key={option.idOption}
                          className={selectedServices.includes(option.idOption) ? styles.optionSelected : styles.optionNotSelected}
                          onClick={() => handleServiceSelected(option.idOption)}
                        >
                          {option.description}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {/* <button
                  className={selectedGender === "Masculino" && styles.selected ? styles.optionSelected : styles.optionNotSelected}
                  onClick={() => handleGenderButtonClick("Masculino")}
                >
                  Masculino
                </button>
                <button
                  className={selectedGender === "Femenino" && styles.selected ? styles.optionSelected : styles.optionNotSelected}
                  onClick={() => handleGenderButtonClick("Femenino")}
                >
                  Femenino
                </button> */}
                <div className={styles.applyWrapper}>
                  <button className={styles.button} onClick={handleApply}>Aplicar</button>
                </div>
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

          <div className={styles.cardsWrapper}>
            {Array.isArray(providers) &&
              providers.map((user) => <Card key={user.people.idPeople} user={user.people} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
