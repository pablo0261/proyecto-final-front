import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import styles from "./FormSkills.module.sass";
import Validation from "./validationFormSkills";
import Swal from "sweetalert2";

function Form({ handleShowForm }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);


  const [userData, setUserData] = useState({
    idPeople: userLog.idPeople,
    idOption: "",
  });

  const [localErrors, setLocalErrors] = useState({
    idOption : "*Campo Obligatorio"
  })

  const [skills, setSkills] = useState([]);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/categories?isDeleted=false&idCategorie=3`);
        const data = await response.json();
        const skillsOptions = data.categories.data[0].categories_options.map(
          (option) => {
            return { description: option.description, idOption: option.idOption }
          }
          )
        setSkills(skillsOptions);
      } catch (error) {
        Swal.fire({
          title: `Error: 404`,
          text: "Error al obtener las opciones de Habilidades",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    };

    fetchServices();
  }, []);

  const handleSkillsAdd = (event) => {
    event.preventDefault();
    if (!localErrors.idOption) {
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
        text: "Selecciona una opcion antes de guardar",
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Selecciona tus habilidades</p>
        <form className={styles.Form} onSubmit={(event)=> handleSkillsAdd(event)}>
          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>*Opciones:</label>
              <select
                className={styles.inputSelect}
                name="idOption"
                value={userData.idOption}
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
              <div className={localErrors.idOption ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.idOption ? localErrors.idOption : "Datos Válidos"}
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
