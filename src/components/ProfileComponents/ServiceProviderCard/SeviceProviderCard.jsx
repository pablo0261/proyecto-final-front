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
    if (infoUserLog.categories.length != 0) {
      const services = infoUserLog.categories.find((category) => category.idCategorie === 1);
      if (services && services.categories_options.length != 0) {
        const serviceOption = services.categories_options.map(
          (option) => {
            const newService = {
              idOption: option.idOption,
              description: option.description,
              price: option.people_options[0].price,
            }
            return newService
          }
        )
        setServicesData(serviceOption)
      }
    }
  }, [infoUserLog]);

  const handleDeleteService = (service) => {
    const deleteData = {
      idPeople: infoUserLog.idPeople,
      idOption: service.idOption,
    };
    Swal.fire({
      title: "¿Quieres eliminar este Servicio?",
      text: "Confirma que quieres eliminar el Servicio seleccionado",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "Grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "Red",
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch(deleteService(deleteData));
        setServicesData(preServices =>
          preServices.filter(services => services.idOption !== service.idOption)
        );
      }
    });
  };

  return (
    <div className={style.background}>
      <div className={style.tableWrapper}>
        <div className={style.headerTable}>
          <p className={style.column1title}>Servicios</p>
          <p className={style.column2title}>Precio x Hora</p>
          <div className={style.column3title}><button onClick={() => handleShowForm()} className={style.editButton}></button></div>
        </div>
        {
          servicesData.length != 0
            ? <div className={style.bodyTable}>
              {
                servicesData.map((service, index) => (
                  <div key={index} className={style.row}>
                    <button onClick={() => handleDeleteService(service)} className={style.crossButton}></button>
                    <div className={style.descriptionBox}>{service.description}</div>
                    <div className={style.priceBox}>${service.price ? service.price : "N/A"}</div>
                    <div className={style.contratItem}>Servicio Activo</div>
                  </div>
                ))
              }
            </div>
            :
            <p className={style.noInfo}>No tienes Servicios cargados</p>
        }
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div >
  );
}
export default ServicesProviderCard;
