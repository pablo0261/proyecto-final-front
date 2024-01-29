import { useState } from "react";
// import Form from "../../Form/FormServices/FormServices"
import Form from "../../Form/FormProfileProvider/Form";
import style from "./ServiceProviderCard.module.sass";

function ServicesProviderCard() {
  // const infoUserLog = useSelector((state) => state.infoUserLog);
  const servicesData = [
    {
      description: "Cuidado",
      price: "3000",
    },
    {
      description: "Cuidado y Limpieza",
      price: "5000",
    },
    {
      description: "Cuidado, Limpieza y Cocina",
      price: "6500",
    },
  ];

  const [showForm, setShowForm] = useState(false);

  const handleClikForm = () => {
    setShowForm(!showForm);
  };

  //!AQUI TOMA LOS DATOS CUANDO EL ESTADO GLOBAL TENGA LA INFO
  // useEffect(() => {
  //   if (infoUserLog.people && infoUserLog.people.data[0] && infoUserLog.people.data[0].categories) {
  //     const categoriesOptions = infoUserLog.people.data[0].categories.flatMap((category) => {
  //       return category.categories_options.map((option) => {
  //         return {
  //           description: option.description,
  //           price: option.people_options.length > 0 ? option.people_options[0].price : null,
  //         };
  //       });
  //     });

  //     setServicesData(categoriesOptions);
  //   }
  // }, [infoUserLog]);

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <button
            onClick={() => handleClikForm()}
            className={style.editButton}
          ></button>
        </div>
        <div className={style.servicesList}>
          <div className={style.serviceItem}>
            <div className={style.column1}>Servicios</div>
            <div className={style.buttonList}>
              <button
                onClick={() => handleClikForm()}
                className={style.crossButton}
              ></button>
              <div className={style.serviceDescription}>
                {servicesData[0].description}
              </div>
            </div>
            <div className={style.buttonList}>
              <button
                onClick={() => handleClikForm()}
                className={style.crossButton}
              ></button>
              <div className={style.serviceDescription}>
                {servicesData[1].description}
              </div>
            </div>
            <div className={style.buttonList}>
              <button
                onClick={() => handleClikForm()}
                className={style.crossButton}
              ></button>
              <div className={style.serviceDescription}>
                {servicesData[2].description}
              </div>
            </div>
            
          </div>

          <div className={style.priceList}>
            <div className={style.column2}>Precio x Hora</div>
            <div className={style.servicePrice}>
              Pesos {servicesData[0].price}
            </div>
            <div className={style.servicePrice}>
              Pesos {servicesData[1].price}
            </div>
            <div className={style.servicePrice}>
              Pesos {servicesData[2].price}
            </div>
          </div>

          <div className={style.contratList}>
            <div>Disponibilidad</div>
            <div className={style.contratItem}>Contratar este Servicio </div>
            <div className={style.contratItem}>Contratar este Servicio </div>
            <div className={style.contratItem}>Contratar este Servicio </div>
          </div>
        </div>
      </div>
      {showForm && <Form handleClickForm={handleClikForm} />}
    </div>
  );
}

export default ServicesProviderCard;
