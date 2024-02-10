import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
// import Form from "../../Form/FormServices/FormServices"
import { deleteService } from "../../../redux/actions/index";
import Form from "../../Form/FormServices/Form";
import style from "./ServiceProviderCard.module.sass";

function ServicesProviderCard() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);
  const [servicesData, setServicesData] = useState([]); 
  console.log("servicesData",servicesData)

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    //*Todo esto recorre y valida la info del usuario para ver los servicios y precios
    if (infoUserLog.categories && infoUserLog.categories.length > 0) {
      const firstCategory = infoUserLog.categories[0];
      if (
        firstCategory.categories_options &&
        firstCategory.categories_options.length > 0
      ) {
        const categoriesOptions = firstCategory.categories_options.flatMap(
          (option) => {
            if (option.people_options && option.people_options.length > 0) {
              return option.people_options.map((personOption) => ({
                description: option.description || "No description",
                price: personOption.price || null,
                idOption: option.idOption 
              }));
            } else {
              return {
                description: option.description || "No description",
                price: null,
              };
            }
          }
        );

        setServicesData(categoriesOptions);
      }
    }
  }, [infoUserLog]);

  const handleDeleteService = (service) => {
    const deleteData = {
      "idPeople": infoUserLog.idPeople,
      "idOption": service.idOption,
    };
    console.log("Valor de deleteData:", deleteData); 
    dispatch(deleteService(deleteData));
  };


  return (
    <div className={style.background}>
      <div className={style.servicesWrapper}>
        <div className={style.serviceItem}>
          <div className={style.column1}>
            <p className={style.column1title}>Servicios</p>
          </div>
          {servicesData.slice(0, 4).map((service, index) => (
            <div key={index} className={style.items}>
              <button
                 onClick={() => handleDeleteService(service)}
                className={style.crossButton}
              ></button>
              <div className={style.descriptionBox}>{service.description}</div>
            </div>
          ))}
        </div>
        <div className={style.priceList}>
          <div className={style.column2}>
            <p className={style.column2title}>Precio x Hora</p>
          </div>
          {servicesData.slice(0, 4).map((service, index) => (
            <div key={index} className={style.priceBox}>
              $ {service.price ? service.price : "N/A"}
            </div>
          ))}
        </div>
        <div className={style.contratList}>
          <div className={style.column3}>
            <button
              onClick={() => handleShowForm()}
              className={style.editButton}
            ></button>
            {servicesData.slice(0, 4).map((service, index) => (
              <button key={index} className={style.contratItem}>
                Contratar este Servicio{" "}
              </button>
            ))}
          </div>
        </div>
        {showForm && <Form handleShowForm={handleShowForm} />}
      </div>
    </div>
  );
}
export default ServicesProviderCard;
