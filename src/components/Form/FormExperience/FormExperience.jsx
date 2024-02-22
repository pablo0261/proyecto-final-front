import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "../FormExperience/validationFormExperience";
import styles from "./FormExperience.module.sass";
import Swal from "sweetalert2";

function Form({ handleShowForm }) {

  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);
  const [isSelected, setIsSelected] = useState("")
  const ExperiencieNumber = ["1", "2", "3", "4"];


  const [userData, setUserData] = useState({
    idPeople: userLog.idPeople,
    idOption: "",
    institution: "",
    description: "",
    year: "",
    comment: "",
  });

  const [localErrors, setLocalErrors] = useState({
    idOption: "*Campo Obligatorio",
    institution: "*Campo Obligatorio",
    description: "*Campo Obligatorio",
    year: "*Campo Obligatorio",
    comment: "*Campo Obligatorio",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "idOption") {
      setIsSelected(value)
      let newIdOption;
      switch (value) {
        case "2":
          newIdOption = "114";
          setUserData((prevUserData) => ({ ...prevUserData, idOption: newIdOption }));
          break;
        case "3":
          newIdOption = "115";
          setUserData((prevUserData) => ({ ...prevUserData, idOption: newIdOption }));
          break;
        case "4":
          newIdOption = "116";
          setUserData((prevUserData) => ({ ...prevUserData, idOption: newIdOption }));
          break;
        default:
          newIdOption = "113";
          setUserData((prevUserData) => ({ ...prevUserData, idOption: newIdOption }));
      }
    } else {
      setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    }
    Validation(name, setLocalErrors, { ...userData, [name]: value });
  };

  const handleExperienceAdd = (event) => {
    event.preventDefault();
    if (Object.values(localErrors).every(errors => errors === "")) {
      try {
        dispatch(postUserServices(userData));
        handleShowForm();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error al guardar la experiencia.',
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

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Cuentanos sobre tus experiencias</p>
        <form className={styles.Form} onSubmit={(event) => handleExperienceAdd(event)}>
          {
            Object.values(userData).some((data) => data !== "") && <p className={styles.errorMessageStatic}>(*)Rellene los campos obligatorios</p>
          }
          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>*N° de Experiencia:</label>
              <select
                className={styles.inputSelect}
                name="idOption"
                value={isSelected}
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
              <div className={localErrors.idOption ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.idOption ? localErrors.idOption : "Datos Válidos"}
              </div>
            </div>

            <div className={styles.FormDivInput}>

              <div className={styles.FormDivInput}>
                <label className={styles.labels}>*Puesto:</label>
                <input
                  className={styles.inputs}
                  type="text"
                  name="description"
                  value={userData.description}
                  onChange={handleChange}
                  placeholder="Ej: Enfermero"
                />
                <div className={localErrors.description ? styles.errorMessage : styles.errorNotMessage}>
                  {localErrors.description ? localErrors.description : "Datos Válidos"}
                </div>
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
                placeholder="Ej: Clínica del Sol"
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
                placeholder="Ej: 2010"
              />
              <div className={localErrors.year ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.year ? localErrors.year : "Datos Válidos"}
              </div>
            </div>

            <div className={styles.FormDivInput}>
              <label className={styles.labels}>*Observaciones:</label>
              <textarea
                className={styles.inputDetail}
                type="text"
                name="comment"
                value={userData.comment}
                onChange={handleChange}
                placeholder="Detalla tus tareas dentro de este puesto"
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