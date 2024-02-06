import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import Form from "../../Form/FormServices/FormServices"
import Form from "../../Form/FormServices/Form";
import style from "./ServiceProviderCard.module.sass";

function ServicesProviderCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const [showForm, setShowForm] = useState(false);
  const [servicesData, setServicesData] = useState([]); //* Aqui guarda los sericios que ofrece la persona

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

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style.header}></div>
        <div className={style.servicesList}>
          <div className={style.serviceItem}>
            <div className={style.column1}>Servicios</div>
            {servicesData.slice(0, 3).map((service, index) => (
              <div key={index} className={style.buttonList}>
                <button
                  onClick={() => handleDeleteService()}
                  className={style.crossButton}
                ></button>
                <div className={style.serviceDescription}>
                  {service.description}
                </div>
              </div>
            ))}
          </div>
          <div className={style.priceList}>
            <div className={style.column2}>Precio x Hora</div>
            {servicesData.slice(0, 3).map((service, index) => (
              <div key={index} className={style.servicePrice}>
                $ {service.price ? service.price : "N/A"}
              </div>
            ))}
          </div>
          <div className={style.contratList}>
            <button
              onClick={() => handleShowForm()}
              className={style.editButton}
            ></button>
            {servicesData.slice(0, 3).map((service, index) => (
              <button key={index} className={style.contratItem}>
                Contratar este Servicio{" "}
              </button>
            ))}
          </div>
        </div>
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}
export default ServicesProviderCard;
