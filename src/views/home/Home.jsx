import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import styles from "../home/Home.module.sass";
import MapHome from "../../components/MapHome/MapHome";
import { useSelector, useDispatch } from "react-redux";
import { filter, allPeopleProvider, filterservices, geturlfiltered } from "../../redux/actions";

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
    urlfiltered()
  };


  const generarConsulta = (filtros) => {
    if (filtros && filtros.length > 0) {
      const serviciosSeleccionados = filtros[0];
      if (Array.isArray(serviciosSeleccionados)) {
        const serviciosQuery = serviciosSeleccionados.map((servicio) => `idOption=${servicio}`).join('&');
        const url = `https://carewithlove.onrender.com/people?${serviciosQuery}&typeOfPerson=provider`;
        return url;
      }
    }
    return 'https://carewithlove.onrender.com/people';
  };
  const consultaGenerada = generarConsulta(filtros);
  console.log(consultaGenerada)
  console.log(providers)
  const urlfiltered = () => {
    dispatch(geturlfiltered(consultaGenerada))
  }


  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.mapWrapper}>
          <p className={styles.titleMap}>Buscar en el mapa</p>
          <MapHome />
        </div>
        <div className={styles.servicesContainer}>
          <div className={styles.filterOrderContainer}>
            <button className={showFilters ? styles.buttonActived : styles.button} onClick={handleFilterButtonClick}>Filtrar</button>
            <button className={showOrder ? styles.buttonActived : styles.button} onClick={handleOrderButtonClick}>Ordenar</button>
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
                          className={selectedServices.includes(option.description) ? styles.optionSelected : styles.optionNotSelected}
                          onClick={() => handleServiceButtonClick(option.idOption)}
                        >
                          {option.description}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button
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
                </button>
                <div className={styles.applyWrapper}>
                  <button className={styles.button} onClick={hadleClick}>Aplicar</button>
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
