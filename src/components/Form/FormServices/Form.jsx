import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "./validationFormServices";
import styles from "./FormServices.module.sass";
import Swal from "sweetalert2";

function Form({ handleShowForm }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);

  const [userData, setUserData] = useState({
    idPeople: userLog.idPeople,
    price: "",
    idOption: "",
  });

  const [localErrors, setLocalErrors] = useState({
    idOption: "*Campo Obligatorio",
    price: "*Campo Obligatorio",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/categories?isDeleted=false&idCategorie=1`);
        const data = await response.json();
        const serviceOptions = data.categories.data[0].categories_options.map(
          (option) => {
            return { description: option.description, idOption: option.idOption }
          }
        )
        serviceOptions.sort((a, b) => a.description.localeCompare(b.description));
        setServices(serviceOptions);
      } catch (error) {
        Swal.fire({
          title: `Error: 404`,
          text: "Error al obtener las opciones de servicios",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    };

    fetchServices();
  }, []);

  const handleServicesAdd = (event) => {
    event.preventDefault();
    if (Object.values(localErrors).every(error => error === "")) {
      try {
        const updatedUserData = {
          ...userData,
          price: userData.price,
          idOption: userData.idOption,
        };
        dispatch(postUserServices(updatedUserData));
        handleShowForm()
      } catch (error) {
        Swal.fire({
          title: `${error}`,
          text: "Error al guardar los servicios",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      Swal.fire({
        title: `Error al guardar los servicios`,
        text: "Seleccione un Servicio y agregue su valor antes de Guardar.",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
    
  };

  
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setUserData({ ...userData, [property]: value });
    Validation(property, localErrors, setLocalErrors, { ...userData, [property]: value });
  };

  
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Agregue los Servicios que ofrece</p>
        <form className={styles.Form} onSubmit={(event) => handleServicesAdd(event)}>
          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Servicios:</label>
              <select
                className={styles.inputSelect}
                name="idOption"
                value={userData.servicio}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona los servicios que ofreces
                </option>
                {services.map((service) => (
                  <option key={service.idOption} value={service.idOption}>
                    {service.description}
                  </option>
                ))}
              </select>
              <div className={localErrors.idOption ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.idOption ? localErrors.idOption : "Datos Válidos"}
              </div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Precio x Hora:</label>
              <input
                className={styles.inputs}
                type="text"
                name="price"
                value={userData.price}
                onChange={handleChange}
                placeholder="$ARG"
              />
              <div className={localErrors.price ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.price ? localErrors.price : "Datos Válidos"}
              </div>
            </div>
          </div>
          <button
            className={styles.buttonSave}
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
