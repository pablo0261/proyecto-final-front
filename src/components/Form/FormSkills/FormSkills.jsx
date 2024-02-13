import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import styles from "./FormSkills.module.sass";

function Form({ handleShowForm }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);


  const [userData, setUserData] = useState({
    idPeople: userLog.idPeople,
    idOption: "",
  });

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

  const handleSkillsAdd = (event) => {
    event.preventDefault();
    try {
      dispatch(postUserServices(userData));
      handleShowForm();
    } catch (error) {
      console.error("Error al guardar la educación", error);
    }
  };
  

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setUserData({ ...userData, [property]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Agregue sus habilidades</p>
        <form className={styles.Form} onSubmit={(event)=> handleSkillsAdd(event)}>
          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Opciones:</label>
              <select
                className={styles.inputs}
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
