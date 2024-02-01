import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import styles from "../home/Home.module.sass";
import MapHome from "../../components/MapHome/MapHome";
import { useSelector, useDispatch } from "react-redux";
import { allPeopleProvider, getPeopleFilteredOrderedPagination, saveSelectionsGlobal, saveOrderGlobal } from "../../redux/actions";

const Home = () => {
  
  const filterOrderSelectedGlobal = useSelector((state) => state.filterOrderSelected);
  const providers = useSelector((state) => state.getAllPeople);
  const allServices = useSelector((state) => state.allServices);

  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const [selectedServices, setSelectedServices] = useState(filterOrderSelectedGlobal.filters);
  const [selectedOrder, setSelectedOrder] = useState(filterOrderSelectedGlobal.orders);

  /* const [selectedGender, setSelectedGender] = useState(null) */

  useEffect(() => {
    if (Object.values(filterOrderSelectedGlobal).every(property => property.length === 0)) {
      dispatch(allPeopleProvider());
    }
  }, []);

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

  const handleServiceSelected = (service) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter((selectedService) => selectedService !== service);
      } else {
        return [...prevSelectedServices, service];
      }
    });
  };

//  const handleOrderButtonClick = (order) => {
//     setSelectedOrder((prevSelectedOrder) =>
//       prevSelectedOrder === order ? null : order
//     );
//   };

  const handleConfirmFilters = () => {
    /* if (selectedGender) {
      console.log("Género seleccionado:", selectedGender);
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        selectedGender,
      ]);
    } */
    setShowOrder(false);
    setShowFilters(false);
  };




  const queryConstructor = () => {
    if (selectedOrder.length > 0 && selectedServices.length > 0){
      const queryConstruct = `idOption=${selectedServices.map((idOption) => idOption).join()}`;
      const queryConstructOrder = `&order=${selectedOrder.map((option) => option).join(';')}`;
      const finalQuery = `${queryConstruct}${queryConstructOrder}`;
      console.log(finalQuery)
      console.log("dentro del order y el filtro")
      return finalQuery;
      } else if(selectedServices.length > 0) {
        console.log("dentro del filtro")
          const queryConstruct = `idOption=${selectedServices.map((idOption) => idOption).join()}`;
          return queryConstruct;
      } else{
        console.log("dentro del order")
        const queryConstructOrder = `&order=${selectedOrder.map((option) => option).join(';')}`;
        return queryConstructOrder;
      };
  };

  const handleApply = () => {
    handleConfirmFilters();
    queryConstructor();
    dispatch(saveSelectionsGlobal({ filters : selectedServices }));
    dispatch(saveOrderGlobal({ orders : selectedOrder }));
    dispatch(getPeopleFilteredOrderedPagination(queryConstructor()));
  };


  const PruebaDeOrden = (order) => {
    if (selectedOrder.includes(order)) {
      setSelectedOrder(selectedOrder.filter((selected) => selected !== order));
    } else {
      let updatedOrder;
      if (order.includes('price,')) {
        updatedOrder = selectedOrder.filter((selected) => !selected.includes('price,'));
      } else if (order.includes('averageRating,')) {
        updatedOrder = selectedOrder.filter((selected) => !selected.includes('averageRating,'));
      } else if (order.includes('dateOfAdmission,')) {
        updatedOrder = selectedOrder.filter((selected) => !selected.includes('dateOfAdmission,'));
      }
      setSelectedOrder([...updatedOrder, order]);
    }
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
                <div className={styles.applyWrapper}>
                  <button className={styles.button} onClick={handleApply}>Aplicar</button>
                </div>
              </div>
            )}
              {showOrder && (
                <div className={styles.filterBox}>
                  <h3>Precio</h3>
                  <button
                    onClick={() => PruebaDeOrden('price,ASC')}
                    className={selectedOrder.includes('price,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Precio Mayor
                  </button>
                  <button
                    onClick={() => PruebaDeOrden('price,DESC')}
                    className={selectedOrder.includes('price,DESC')  ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Precio Menor
                  </button>
                  <h3>Rating</h3>
                  <button
                    onClick={() => PruebaDeOrden('averageRating,ASC')}
                    className={selectedOrder.includes('averageRating,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Rating Más Alto
                  </button>
                  <button
                    onClick={() => PruebaDeOrden('averageRating,DES')}
                    className={selectedOrder.includes('averageRating,DES') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Rating Más Bajo
                  </button>
                  <h3>Antiguedad</h3>
                  <button
                    onClick={() => PruebaDeOrden('dateOfAdmission,ASC')}
                    className={selectedOrder.includes('dateOfAdmission,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Mas nuevo
                  </button>
                  <button
                    onClick={() => PruebaDeOrden('dateOfAdmission,DES')}
                    className={selectedOrder.includes('dateOfAdmission,DES') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                  >
                    Mas antiguo
                  </button>
                  <div className={styles.applyWrapper}>
                    <button className={styles.button} onClick={handleApply}>Aplicar</button>
                  </div>
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
