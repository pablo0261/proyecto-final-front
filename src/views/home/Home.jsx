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

  //*Agrega o quita servicios
  const handleServiceButtonClick = (service) => {// Función para manejar el clic en un botón de servicio
    setSelectedServices((prevSelectedServices) => {// Agrega o elimina un servicio seleccionado del estado
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter(
          (selectedService) => selectedService !== service
        );
      } else {
        return [...prevSelectedServices, service];
      }
    });
  };

  const handleGenderButtonClick = (gender) => {// Función para manejar el clic en un botón de género
    setSelectedGender((prevSelectedGender) => // Cambia el género seleccionado entre null y el género actual
      prevSelectedGender === gender ? null : gender
    );
  };

  const handleApplyButtonClick = (selectedGender) => {//* Función para aplicar los filtros seleccionados
    console.log("Servicios seleccionados:", selectedServices);
    if (selectedGender) {// Si se selecciona un género, lo agrega a la lista de servicios seleccionados
      console.log("Género seleccionado:", selectedGender);
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        selectedGender,
      ]);
    }
    setShowFilters(false); // Oculta la sección de filtros
  };

  const hadleClick = () => {//* Función que se ejecuta al hacer clic en el botón de aplicar
    handleApplyButtonClick();// Llama a la función para aplicar los filtros
    dispatch(filter(selectedServices, selectedGender));// Despacha la acción de filtrado con los servicios y género seleccionados
    urlfiltered()// Llama a la función para filtrar la URL
  };


  const generarConsulta = (filtros) => {//* Función para generar la consulta para la URL según los filtros
    if (filtros && filtros.length > 0) {
      const serviciosSeleccionados = filtros[0];
      if (Array.isArray(serviciosSeleccionados)) {// Genera la parte de la URL con los servicios seleccionados
        const serviciosQuery = serviciosSeleccionados.map((servicio) => `idOption=${servicio}`).join('&');
        // Construye la URL completa
        const url = `https://carewithlove.onrender.com/people?${serviciosQuery}&typeOfPerson=provider`;
        return url;
      }
    }
      // Si no hay filtros, devuelve la URL base
    return 'https://carewithlove.onrender.com/people';
  };
  // Generar la consulta para la URL
  const consultaGenerada = generarConsulta(filtros);
  console.log(consultaGenerada)
  console.log(providers)
  // Función para despachar la acción de filtrado con la URL generada
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
