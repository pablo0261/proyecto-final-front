import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "../FormEducation/validationFormEducation";
import styles from "./FormSkills.module.sass";

function Form({ handleShowForm }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);


  const [userData, setUserData] = useState({
    idPeople: userLog,
    idOption: "",
    description: "",
    
  });
  console.log("userData", userData)

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      idPeople: userLog.idPeople,
    }));
  }, []);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/categories`);
        const data = await response.json();
        const skillsOptions = data.categories.data[2].categories_options.map(
          (option) => {
            return { description: option.description, idOption: option.idOption }
          }
        )
        setSkills(skillsOptions);
      } catch (error) {
        console.error("Error al obtener las opciones de servicios:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServicesAdd = async (event) => {
    event.preventDefault();
    try {
      const updatedUserData = {
        ...userData,
        description: userData.description,
        idOption: userData.idOption,
      };

      dispatch(postUserServices(updatedUserData));
      handleShowForm()
    } catch (error) {
      console.error("Error al guardar las habilidades:", error);
    }
  };

  const [localErrors, setLocalErrors] = useState({
    description: "",
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
        <p className={styles.textTitle}>Agregue sus habilidades</p>
        <form className={styles.Form} onSubmit={handleServicesAdd}>
          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Opciones:</label>
              <select
                className={styles.inputs}
                name="idOption"
                value={userData.description}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona tus habilidades
                </option>
                {skills.map((skill) => (
                  <option key={skill.idOption} value={skill.idOption}>
                    {skill.description}
                  </option>
                ))}
              </select>
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
