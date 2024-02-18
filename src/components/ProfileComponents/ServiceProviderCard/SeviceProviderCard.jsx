import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteService } from "../../../redux/actions/index";
import Swal from "sweetalert2";
import Form from "../../Form/FormServices/Form";
import style from "./ServiceProviderCard.module.sass";

function ServicesProviderCard() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);
  const [servicesData, setServicesData] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (infoUserLog.categories && infoUserLog.categories.length > 0) {
      const serviceCategory = infoUserLog.categories.find(
        (category) => category.idCategorie === 1
      );
      if (serviceCategory && serviceCategory.categories_options) {
        const categoriesOptions = serviceCategory.categories_options.flatMap(
          (option) => {
            if (option.people_options && option.people_options.length > 0) {
              return option.people_options.map((personOption) => ({
                description: option.description || "No description",
                price: personOption.price || null,
                idOption: option.idOption,
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
      idPeople: infoUserLog.idPeople,
      idOption: service.idOption,
    };
    Swal.fire({
      title: "Quieres eliminar este servicio?",
      text: `Click en Aceptarpara eliminarlo, o dale a Cancelar para regresar`,
      footer: "Confirma que quieres eliminar el servicio seleccionado",
      icon: "alert",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "Grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "Red",
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch(deleteService(deleteData));
      }
    });
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
