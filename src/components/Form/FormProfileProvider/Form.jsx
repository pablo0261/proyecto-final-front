import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserData } from "../../../redux/actions/index";
import Validation from "./validationFormProfile";
import styles from "./FormProfile.module.sass";

function Form({ handleShowForm }) {

  const dispatch = useDispatch();
  const userLog = useSelector(state => state.infoUserLog);

  useEffect(() => {
    setUserData(prevUserData => ({
      ...prevUserData,
      id: userLog.idPeople,
    }));
  }, []);

  const [userData, setUserData] = useState({
    id: userLog,
    Nombre: "",
    Telefono: "",
    País: "",
    Provincia: "",
    Localidad: "",
    Calle: "",
    Ocupación: "",
    "Sobre mi": "",
  });

  const [localErrors, setLocalErrors] = useState({
    Nombre: "*Campo Obligatorio",
    Telefono: "*Campo Obligatorio",
    País: "*Campo Obligatorio",
    Provincia: "*Campo Obligatorio",
    Localidad: "*Campo Obligatorio",
    Calle: "*Campo Obligatorio",
    Ocupación: "*Campo Obligatorio",
    "Sobre mi": "*Campo Obligatorio",
  });

  //-PARA ENVIAR CON EL POST--/
  const userDataEnglish = {
    idPeople: userData.id,
    fullName: userData.Nombre,
    phone: userData.Telefono,
    country: userData.País,
    provinceName: userData.Provincia,
    locationName: userData.Localidad,
    address: userData.Calle,
    profession: userData.Ocupación,
    aboutMe: userData["Sobre mi"],
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    Validation(property, setLocalErrors, { ...userData, [property]: value });
    setUserData({ ...userData, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(localErrors).some((error) => error !== "");

    if (!hasErrors) {
      dispatch(postUserData(userDataEnglish))
      handleShowForm()
    } else {
      window.alert("Formulario con Errores")
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={()=>handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Completa tus datos personales</p>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.FormDivInput}>
            <label className={styles.labels}>Nombre y Apellido:</label>
            <input
              className={styles.inputs}
              type="text"
              name="Nombre"
              value={userData.Nombre}
              onChange={handleChange}
              placeholder="Ej: Ana Maria de los Angeles"
            />
            <div className={localErrors.Nombre ? styles.errorMessage : styles.errorNotMessage}>{localErrors.Nombre ? localErrors.Nombre : "Datos Validos"}</div>
          </div>
          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Teléfono:</label>
              <input
                className={styles.inputs}
                type="text"
                name="Telefono"
                value={userData.Telefono}
                onChange={handleChange}
                placeholder="Ej: 54 9 ...(Tu número sin el 15)... "
              />
              <div className={localErrors.Telefono ? styles.errorMessage : styles.errorNotMessage}>{localErrors.Telefono ? localErrors.Telefono : "Datos Validos"}</div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>País:</label>
              <input
                className={styles.inputs}
                type="text"
                name="País"
                value={userData.País}
                onChange={handleChange}
                placeholder="Argentina"
              />
              <div className={localErrors.País ? styles.errorMessage : styles.errorNotMessage}>{localErrors.País ? localErrors.País : "Datos Validos"}</div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Provincia:</label>
              <input
                className={styles.inputs}
                type="text"
                name="Provincia"
                value={userData.Provincia}
                onChange={handleChange}
                placeholder="Ej: Cordoba"
              />
              <div className={localErrors.Provincia ? styles.errorMessage : styles.errorNotMessage}>{localErrors.Provincia ? localErrors.Provincia : "Datos Validos"}</div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Localidad:</label>
              <input
                className={styles.inputs}
                type="text"
                name="Localidad"
                value={userData.Localidad}
                onChange={handleChange}
                placeholder="Ej: Capital"
              />
              <div className={localErrors.Localidad ? styles.errorMessage : styles.errorNotMessage}>{localErrors.Localidad ? localErrors.Localidad : "Datos Validos"}</div>
            </div>
          </div>
          <div className={styles.FormDivInput}>
            <label className={styles.labels}>Calle:</label>
            <input
              className={styles.inputs}
              type="text"
              name="Calle"
              value={userData.Calle}
              onChange={handleChange}
              placeholder="Ej: Av. Chacabuco"
            />
            <div className={localErrors.Calle ? styles.errorMessage : styles.errorNotMessage}>{localErrors.Calle ? localErrors.Calle : "Datos Validos"}</div>
          </div>

          <div className={styles.FormDivInput}>
            <label className={styles.labels}>Profesión:</label>
            <input
              className={styles.inputs}
              type="text"
              name="Ocupación"
              value={userData.Ocupación}
              onChange={handleChange}
              placeholder="Ej: Enfermera"
            />
            <div className={localErrors.Ocupación ? styles.errorMessage : styles.errorNotMessage}>{localErrors.Ocupación ? localErrors.Ocupación : "Datos Validos"}</div>
          </div>

          <div className={styles.FormDivInput}>
            <label className={styles.labels}>Sobre mi:</label>
            <textarea
              className={styles.inputDetail}
              type="text"
              name="Sobre mi"
              value={userData["Sobre mi"]}
              onChange={handleChange}
              placeholder="Cuentales a los clientes quien eres..."
            />
            <div className={localErrors["Sobre mi"] ? styles.errorMessage : styles.errorNotMessage}>{localErrors["Sobre mi"] ? localErrors["Sobre mi"] : "Datos Validos"}</div>
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
