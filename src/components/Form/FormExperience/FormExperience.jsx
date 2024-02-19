import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "../FormExperience/validationFormExperience";
import styles from "./FormExperience.module.sass";

function Form({ handleShowForm }) {
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);

  const ExperiencieNumber = ["Número de orden","1", "2", "3", "4"];


  const [userData, setUserData] = useState({
    idPeople: userLog.idPeople,
    idOption: "",
    institution: "",
    description: "",
    year: "",
    comment: "",
  });

  const [localErrors, setLocalErrors] = useState({
    institution: "",
    description: "",
    year: "",
    comment: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "idOption") {
      let newIdOption;
      switch (value) {
        case "2":
          newIdOption = "114";
          break;
        case "3":
          newIdOption = "115";
          break;
        case "4":
          newIdOption = "116";
          break;
        default:
          newIdOption = "113";
      }
      setUserData((prevUserData) => ({ ...prevUserData, idOption: newIdOption }));
    } else {
      setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    }
    Validation(name, setLocalErrors, { ...userData, [name]: value });
  };
  
  const handleExperienceAdd = (event) => {
    event.preventDefault();
    try {
      dispatch(postUserServices(userData));
      handleShowForm();
    } catch (error) {
      console.error("Error al guardar la experiencia", error);
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
        <p className={styles.textTitle}>Agregue su Experiencia</p>
        <form
          className={styles.Form}
          onSubmit={(event) => handleExperienceAdd(event)}
        >
          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>*N° de Experiencia:</label>
              <select
                className={styles.inputDetail}
                name="idOption"
                value={userData.idOption}
                onChange={handleChange}
                placeholder={"Selecciona el número de experiencia que completarás"}
              >
                <option value="" disabled>
                  Selecciona el número de experiencia que completarás
                </option>
                {ExperiencieNumber.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.FormDivInput}>

              <div className={styles.FormDivInput}>
                <label className={styles.labels}>
                  Que tarea realizó?
                </label>
                <input
                  className={styles.inputDetail}
                  type="text"
                  name="institution"
                  value={userData.institution}
                  onChange={handleChange}
                  placeholder="Cuidado y Limpieza"
                />
                <div
                  className={
                    userData.institution &&
                    (localErrors.institution
                      ? styles.errorMessage
                      : styles.errorNotMessage)
                  }
                >
                  {userData.institution
                    ? localErrors.institution
                      ? localErrors.institution
                      : "Datos Válidos"
                    : null}
                </div>
              </div>
            </div>

            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Donde desarrollaste la actividad?</label>
              <input
                className={styles.inputDetail}
                type="text"
                name="description"
                value={userData.description}
                onChange={handleChange}
                placeholder="Lugar"
              />
              <div
                className={
                  userData.description &&
                  (localErrors.description
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.description
                  ? localErrors.description
                    ? localErrors.description
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
                value={userData.year}
                onChange={handleChange}
                placeholder="Año"
              />
              <div
                className={
                  userData.year &&
                  (localErrors.year
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.year
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
                value={userData.comment}
                onChange={handleChange}
                placeholder="Detalla tu labor"
              />
              <div
                className={
                  userData.comment &&
                  (localErrors.comment
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.comment
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
