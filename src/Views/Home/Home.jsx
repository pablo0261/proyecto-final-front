import Card from "../../components/CardHomeProveedor/CardHomeProveedor";
import { useEffect, useState } from "react";
import styles from "./Home.module.sass";
import MapHome from "../../components/MapHome/MapHome";
import { useSelector, useDispatch } from "react-redux";
import { allPeople, getPeopleFilteredOrderedPagination, saveSelectionsGlobal } from "../../redux/actions";
import Loading from "../../assets/Icons/loadingHouse.gif"
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {

  const filterOrderSelectedGlobal = useSelector((state) => state.filterOrderSelected);
  const InfoPag = useSelector((state) => state.getAllPeople);
  const providers = InfoPag && InfoPag.data;
  const allServices = useSelector((state) => state.allServices);

  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const [selectedServices, setSelectedServices] = useState(filterOrderSelectedGlobal.filters);
  const [selectedOrder, setSelectedOrder] = useState(filterOrderSelectedGlobal.orders);
  const [queryProps, setQueryProps] = useState("")
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    const handleLoading = async() => {
      if (Object.values(filterOrderSelectedGlobal).every(property => property.length === 0)) {
          setIsLoading(true)
          await dispatch(getPeopleFilteredOrderedPagination(""));
          setIsLoading(false)
      }
    }
    handleLoading()
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

  const handlerPagination = (queryConstructOrder) => {
    dispatch(getPeopleFilteredOrderedPagination(queryProps, queryConstructOrder));
  };

  const handleApply = async () => {
    setIsLoading(true)
    setShowOrder(false);
    setShowFilters(false);
    dispatch(saveSelectionsGlobal({ filters: selectedServices, orders: selectedOrder }));
    const query = `&idOption=${selectedServices.map((idOption) => idOption).join()}&idOrder=${selectedOrder.map((idOrder) => idOrder).join(";")}`
    setQueryProps(query)
    await dispatch(getPeopleFilteredOrderedPagination(query));
    setIsLoading(false)
  };

  const handleOrderSelected = (order) => {
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
          <MapHome providers={providers}/>
        </div>

        <div className={styles.servicesContainer}>
          <div className={styles.filterOrderContainer}>
            <button className={showFilters ? styles.buttonActived : styles.button} onClick={() => handleFilterVisibility()}>Filtrar</button>
            <button className={showOrder ? styles.buttonActived : styles.button} onClick={() => handleOrderVisibility()}>Ordenar</button>
          </div>
          <div className={styles.filterOrderBox}>
            {showFilters && (
              <div className={styles.Box}>
                <div className={styles.filterBox}>
                  {allServices.map((category) => {
                    if (!category.isInterest && !category.isExperience) {
                      return (
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
                      )
                    }
                  }
                  )}
                </div>
                <div className={styles.applyWrapper}>
                  <button className={styles.button} onClick={handleApply}>Aplicar</button>
                </div>
              </div>
            )}
            {showOrder && (
              <div className={styles.Box}>
                <div className={styles.filterBox}>
                  <p className={styles.titleCategory}>Precio</p>
                  <div className={styles.optionsWrapper}>
                    <button
                      onClick={() => handleOrderSelected('price,DESC')}
                      className={selectedOrder.includes('price,DESC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Mayor Precio
                    </button>
                    <button
                      onClick={() => handleOrderSelected('price,ASC')}
                      className={selectedOrder.includes('price,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Menor Precio
                    </button>
                  </div>
                  <p className={styles.titleCategory}>Rating</p>
                  <div className={styles.optionsWrapper}>
                    <button
                      onClick={() => handleOrderSelected('averageRating,DESC')}
                      className={selectedOrder.includes('averageRating,DESC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Rating Más Alto
                    </button>
                    <button
                      onClick={() => handleOrderSelected('averageRating,ASC')}
                      className={selectedOrder.includes('averageRating,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Rating Más Bajo
                    </button>
                  </div>
                  <p className={styles.titleCategory}>Antiguedad</p>
                  <div className={styles.optionsWrapper}>
                    <button
                      onClick={() => handleOrderSelected('dateOfAdmission,DESC')}
                      className={selectedOrder.includes('dateOfAdmission,DESC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Mas nuevo
                    </button>
                    <button
                      onClick={() => handleOrderSelected('dateOfAdmission,ASC')}
                      className={selectedOrder.includes('dateOfAdmission,ASC') ? 'selected' && styles.optionSelected : styles.optionNotSelected}
                    >
                      Mas antiguo
                    </button>
                  </div>
                </div>
                <div className={styles.applyWrapper}>
                  <button className={styles.button} onClick={handleApply}>Aplicar</button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.cardsWrapper}>
            {isLoading
              ? <img src={Loading} className={styles.loading} alt="Loading..."></img>
              : providers
                ? providers.length != 0 
                  ? providers.map((user) => <Card key={user.people.idPeople} user={user.people} />)
                  : <p className={styles.noInfo}>No se encontraron Proveedores con las caracteristicas solicitadas</p>
                : <></>
            }
          </div>
          <div className={styles.pagination}>
            {
              providers 
              ?  providers.length != 0 && <Pagination count={InfoPag.pageSize} pageNumber={InfoPag.pageNumber} totalCount={InfoPag.totalCount} totalOfPages={InfoPag.totalOfPages} queryProps={queryProps} onPageChange={handlerPagination} />
              : <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;