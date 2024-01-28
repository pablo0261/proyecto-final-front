import { useState} from "react";
import {  useDispatch } from "react-redux";
import { postUserData } from "../../../redux/actions/index";
import Validation from "./validationFormProfile";
import styles from "./FormProfile.module.sass";

function Form({ handleClickForm }) {
  const dispatch = useDispatch();


  const [userData, setUserData] = useState({
    Nombre: "",
    Telefono: "",
    País: "",
    Provincia: "",
    Localidad: "",
    Calle: "",
    Ocupación: "",
    "Sobre mi": "",
  });
  const [localErrors, setLocalErrors] = useState({});

  

  const handleChange = (event) => {
    let property = event.target.name;
    let value = event.target.value.trim();
    Validation(userData, localErrors, setLocalErrors, property, value);
    setUserData({ ...userData, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(localErrors).some((error) => error !== "");

    if (hasErrors) {
      alert("Please fill in all the required fields correctly.");
    } else {
      dispatch(postUserData(userData))
        .then(() => {
          alert("El Formulario se cargó correctamente");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.error);
          if (error.error) {
            alert(error.error);
          } else {
            alert("No fue posible cargar su formulario");
          }
          console.error("Error al enviar el formulario", error);
        });
    }
  };

  return (
    <div className={styles.background}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <div className={styles.DivButtonTittle}>
          <button
            type="button"
            className={styles.DetailButtonForm}
            onClick={handleClickForm}
          ></button>
          <h1 className={styles.DetailTittle}>Completa tu perfil</h1>
        </div>
        <div className={styles.ContainerDivInput}>
          <div className={styles.FormDivInput}>
            <label className={styles.FormLabel}>Nombre:</label>
            <input
              className={styles.Inputs}
              type="text"
              name="Nombre"
              value={userData.Nombre}
              onChange={handleChange}
              placeholder=""
            />
            <div className={styles.ErrorMessage}>{localErrors.Nombre}</div>
          </div>
          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.FormLabelFlex}>Telefono:</label>
              <input
                className={styles.InputsFlex}
                type="text"
                name="Telefono"
                value={userData.Telefono}
                onChange={handleChange}
                placeholder=""
              />
              <div className={styles.ErrorMessage}>{localErrors.Telefono}</div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.FormLabelFlex}>País:</label>
              <input
                className={styles.InputsFlex}
                type="text"
                name="País"
                value={userData.País}
                onChange={handleChange}
                placeholder=""
              />
              <div className={styles.ErrorMessage}>{localErrors.País}</div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.FormLabelFlex}>Provincia:</label>
              <input
                className={styles.InputsFlex}
                type="text"
                name="Provincia"
                value={userData.Provincia}
                onChange={handleChange}
                placeholder=""
              />
              <div className={styles.ErrorMessage}>{localErrors.Provincia}</div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.FormLabelFlex}>Localidad:</label>
              <input
                className={styles.InputsFlex}
                type="text"
                name="Localidad"
                value={userData.Localidad}
                onChange={handleChange}
                placeholder=""
              />
              <div className={styles.ErrorMessage}>{localErrors.Localidad}</div>
            </div>
          </div>
          <div className={styles.FormDivInput}>
            <label className={styles.FormLabel}>Calle:</label>
            <input
              className={styles.Inputs}
              type="text"
              name="Calle"
              value={userData.Calle}
              onChange={handleChange}
              placeholder=""
            />
            <div className={styles.ErrorMessage}>{localErrors.Calle}</div>
          </div>

          <div className={styles.FormDivInput}>
            <label className={styles.FormLabel}>Ocupación:</label>
            <input
              className={styles.Inputs}
              type="text"
              name="Ocupación"
              value={userData.Ocupación}
              onChange={handleChange}
              placeholder=""
            />
            <div className={styles.ErrorMessage}>{localErrors.Ocupación}</div>
          </div>

          <div className={styles.FormDivInput}>
            <label className={styles.FormLabel}>Sobre mi:</label>
            <input
              className={styles.InputsDetail}
              type="text"
              name="Sobre mi"
              value={userData["Sobre mi"]}
              onChange={handleChange}
              placeholder=""
            />
            <div className={styles.ErrorMessage}>{localErrors["Sobre mi"]}</div>
          </div>
        </div>
        <button className={styles.ButtonForm} type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default Form;
