import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "../FormEducation/validationFormEducation";
import styles from "./FormEducation.module.sass";

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
        const response = await fetch(`${REACT_APP_API_URL}/categories`);
        const data = await response.json();
        const educationOptions = data.categories.data[1].categories_options.map(
          (option) => {
            return { description: option.description, idOption: option.idOption }
          }
        )
        setEducation(educationOptions);
      } catch (error) {
        console.error("Error al obtener las opciones de educación:", error);
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
        console.error("Error al guardar la educación", error);
      }
    } else {
      window.alert("Rellene todos los campos antes de guardar cambios.")
    }
  };

  const [localErrors, setLocalErrors] = useState({
    education: "*Campo Obligatorio",
    institution: "*Campo Obligatorio",
    year: "*Campo Obligatorio",
    comment: "*Campo Obligatorio",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === "education") {
      const option = education.find((opt) => opt.description === value);
      if (option) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          idOption: option.idOption,
          [property]: value,
        }));
      }
    } else {
      Validation(property, setLocalErrors, { ...userData, [property]: value });
      setUserData({ ...userData, [property]: value });
    }
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
                name="education"
                value={userData.education}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                {education.map((option) => (
                  <option key={option.idOption} value={option.description}>
                    {option.description}
                  </option>
                ))}
              </select>
              <div className={localErrors.education ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.education ? localErrors.education : "Datos Válidos"}
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
