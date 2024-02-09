import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "../FormEducation/validationFormEducation";
import styles from "./FormEducation.module.sass"

function Form({ handleShowForm }) {
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);

  const [userData, setUserData] = useState({
    idPeople: userLog,
    idOption: "" | "1",
    education: "",
    institution: "",
    year: "",
    observaciones: "",

  });
  console.log("userData", userData)

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      idPeople: userLog.idPeople,
    }));
  }, []);

//   const [education, setEducation] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch(`${REACT_APP_API_URL}/categories`);
//         const data = await response.json();
//         const educationOptions = data.categories.data[0].categories_options.map(
//           (option) => {
//             return { description: option.description, idOption: option.idOption }
//           }
//         )
//         setEducation(educationOptions);
//       } catch (error) {
//         console.error("Error al obtener las opciones de servicios:", error);
//       }
//     };

//     fetchServices();
//   }, []);

  const handleEducationAdd = async (event) => {
    event.preventDefault();
    try {
      const updatedUserData = {
        ...userData,
        price: userData.price,
        idOption: userData.idOption,
      };

      dispatch(postUserServices(updatedUserData));
      handleShowForm()
    } catch (error) {
      console.error("Error al guardar la educación", error);
    }
  };

  const [localErrors, setLocalErrors] = useState({
    education: "",
    institution: "",
    year: "",
    observaciones: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    Validation(property, setLocalErrors, { ...userData, [property]: value });
    setUserData({ ...userData, [property]: value });
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>

<form className={styles.Form} onSubmit={handleEducationAdd}>
  <div className={styles.FormDivInput}>
    <div className={styles.FormDivInput}>
      <label className={styles.labels}>Nivel de Educación</label>
      <input
        className={styles.inputDetail}
        type="text"
        name="education"
        value={userData.education}
        onChange={handleChange}
        placeholder=""
      />
      <div
        className={
          userData.education &&
          (localErrors.education
            ? styles.errorMessage
            : styles.errorNotMessage)
        }
      >
        {userData.education
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
        value={userData.institution}
        onChange={handleChange}
        placeholder=""
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
    <div className={styles.FormDivInput}>
      <label className={styles.labels}>Año:</label>
      <input
        className={styles.inputs}
        type="text"
        name="year"
        value={userData.year}
        onChange={handleChange}
        placeholder=""
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
        name="observaciones"
        value={userData.observaciones}
        onChange={handleChange}
        placeholder=""
      />
      <div
        className={
          userData.observaciones &&
          (localErrors.observaciones
            ? styles.errorMessage
            : styles.errorNotMessage)
        }
      >
        {userData.observaciones
          ? localErrors.observaciones
            ? localErrors.observaciones
            : "Datos Válidos"
          : null}
      </div>
    </div>
  </div>
  
  <button className={styles.buttonSave} type="submit">
    Guardar
  </button>
</form>     </div>
    </div>
  );
}

export default Form;
