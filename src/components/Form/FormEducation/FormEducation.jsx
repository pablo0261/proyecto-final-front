import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "../FormEducation/validationFormEducation";
import styles from "./FormEducation.module.sass";

function Form({ handleShowForm }) {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);

  
  const [updatedUserData, setupdatedUserData] = useState({
    
    idPeople: infoUserLog.idPeople,
    idOption: "",
    institution: "",
    year: "",
    comment: "",
  });

  useEffect(() => {
    setupdatedUserData((prevupdatedUserData) => ({
      ...prevupdatedUserData,
      idPeople: infoUserLog.idPeople,
    }));
  }, []);











  const handleEducationAdd = (event) => {
    event.preventDefault();
    try {
      dispatch(postUserServices(updatedUserData));
      handleShowForm();
    } catch (error) {
      console.error("Error al guardar la educación", error);
    }
  };

  const [localErrors, setLocalErrors] = useState({
    education: "",
    institution: "",
    year: "",
    comment: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;
  
    if (property === "education") {//* esto es para guardar en updateUserData el idOpcion del la educación seleccionada
      const option = infoUserLog.categories[1].categories_options.find(
        (opt) => opt.description === value
      );
      if (option) {
        value = option.description;
        setupdatedUserData((prevupdatedUserData) => ({
          ...prevupdatedUserData,
          idOption: option.idOption,
          [property]: value,
        }));
      }
    } else {
      Validation(property, setLocalErrors, { ...updatedUserData, [property]: value });
      setupdatedUserData({ ...updatedUserData, [property]: value });
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
        <p className={styles.textTitle}>Agregue Su Nivel de Educación</p>
        <form className={styles.Form} onSubmit={handleEducationAdd}>
          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Nivel de Educación</label>
              <select
                className={styles.inputDetail}
                name="education"
                value={updatedUserData.education}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                {infoUserLog.categories &&
                  infoUserLog.categories.length > 0 &&
                  infoUserLog.categories[1].categories_options.map((option) => (
                    <option key={option.idOption} value={option.description}>
                      {option.description}
                    </option>
                  ))}
              </select>
              <div
                className={
                  updatedUserData.education &&
                  (localErrors.education
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {updatedUserData.education
                  ? localErrors.education
                    ? localErrors.education
                    : "Datos Válidos"
                  : null}
              </div>
            </div>

            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Institución:</label>
              <input
                className={styles.inputDetail}
                type="text"
                name="institution"
                value={updatedUserData.institution}
                onChange={handleChange}
                placeholder=""
              />
              <div
                className={
                  updatedUserData.institution &&
                  (localErrors.institution
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {updatedUserData.institution
                  ? localErrors.institution
                    ? localErrors.institution
                    : "Datos Válidos"
                  : null}
              </div>
            </div>
          </div>

          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Año:</label>
              <input
                className={styles.inputs}
                type="text"
                name="year"
                value={updatedUserData.year}
                onChange={handleChange}
                placeholder=""
              />
              <div
                className={
                  updatedUserData.year &&
                  (localErrors.year
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {updatedUserData.year
                  ? localErrors.year
                    ? localErrors.year
                    : "Datos Válidos"
                  : null}
              </div>
            </div>

            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Observaciones:</label>
              <textarea
                className={styles.inputDetailObservation}
                type="text"
                name="comment"
                value={updatedUserData.comment}
                onChange={handleChange}
                placeholder=""
              />
              <div
                className={
                  updatedUserData.comment &&
                  (localErrors.comment
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {updatedUserData.comment
                  ? localErrors.comment
                    ? localErrors.comment
                    : "Datos Válidos"
                  : null}
              </div>
            </div>
          </div>

          <button className={styles.buttonSave} type="submit">
            Guardar
          </button>
        </form>{" "}
      </div>
    </div>
  );
}

export default Form;
