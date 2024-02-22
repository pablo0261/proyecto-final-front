import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "../FormEducation/validationFormEducation";
import styles from "./FormEducation.module.sass";
import Swal from "sweetalert2";

function Form({ handleShowForm }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);


  const [userData, setUserData] = useState({
    idPeople: userLog.idPeople,
    idOption: "",
    institution: "",
    year: "",
    comment: "",
  });

  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/categories?isDeleted=false&idCategorie=2`);
        const data = await response.json();
        const educationOptions = data.categories.data[0].categories_options.map(
          (option) => {
            const newEducation = { 
              description: option.description, 
              idOption: option.idOption 
            }
            return newEducation
          }
        )
        setEducation(educationOptions);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error al obtener las opciones de educación.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    };

    fetchEducation();
  }, []);

  const handleEducationAdd = (event) => {
    event.preventDefault();
    if (!Object.values(localErrors).some(errors => errors != "")) {
      try {
        dispatch(postUserServices(userData));
        handleShowForm();
      } catch (error) {
        Swal.fire({
          title: `${error}`,
          text: "Error al guardar la educación",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      Swal.fire({
        title: `Datos Incorrectos!`,
        text: "El formulario contiene campos vacíos o con datos erróneos.",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
  }
  };

  const [localErrors, setLocalErrors] = useState({
    idOption: "*Campo Obligatorio",
    institution: "*Campo Obligatorio",
    year: "*Campo Obligatorio",
    comment: "*Campo Obligatorio",
  });

  const [educationSelected, setEducationSelected] = useState()

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "idOption") {
      setEducationSelected(value)
    }

    setUserData({ ...userData, [property]: value });
    Validation(property, setLocalErrors, { ...userData, [property]: value });
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Cuentanos sobre tu formación</p>
        <form className={styles.Form} onSubmit={(event) => handleEducationAdd(event)}>
          {
            Object.values(userData).some((data) => data !== "") && <p className={styles.errorMessageStatic}>(*)Rellene los campos obligatorios</p>
          }
          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>*Nivel de Educación</label>
              <select
                className={styles.inputSelect}
                name="idOption"
                value={educationSelected}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                {education.map((option) => (
                  <option key={option.idOption} value={option.idOption}>
                    {option.description}
                  </option>
                ))}
              </select>
              <div className={localErrors.idOption ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.idOption ? localErrors.idOption : "Datos Válidos"}
              </div>
            </div>

            <div className={styles.FormDivInput}>
              <label className={styles.labels}>*Institución:</label>
              <input
                className={styles.inputs}
                type="text"
                name="institution"
                value={userData.institution}
                onChange={handleChange}
                placeholder=""
              />
              <div className={localErrors.institution ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.institution ? localErrors.institution : "Datos Válidos"}
              </div>
            </div>
          </div>

          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>*Año:</label>
              <input
                className={styles.inputs}
                type="text"
                name="year"
                value={userData.year}
                onChange={handleChange}
                placeholder=""
              />
              <div className={localErrors.year ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.year ? localErrors.year : "Datos Válidos"}
              </div>
            </div>

            <div className={styles.FormDivInput}>
              <label className={styles.labels}>*Observaciones:</label>
              <textarea
                className={styles.inputDetailObservation}
                type="text"
                name="comment"
                value={userData.comment}
                onChange={handleChange}
                placeholder=""
              />
              <div className={localErrors.comment ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.comment ? localErrors.comment : "Datos Válidos"}
              </div>
            </div>
          </div>
          <button className={styles.buttonSave} type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
