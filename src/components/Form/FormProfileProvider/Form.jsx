import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserData } from "../../../redux/actions/index";
import Validation from "./validationFormProfile";
import styles from "./FormProfile.module.sass";

function Form({ handleShowForm }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      id: userLog.idPeople,
    }));
  }, []);

  const [provincias, setProvincias] = useState([
    "Ciudad Autónoma de Buenos Aires",
    "Neuquén",
    "San Luis",
    "Santa Fe",
    "La Rioja",
    "Catamarca",
    "Tucumán",
    "Chaco",
    "Formosa",
    "Santa Cruz",
    "Chubut",
    "Mendoza",
    "Entre Ríos",
    "San Juan",
    "Jujuy",
    "Santiago del Estero",
    "Río Negro",
    "Corrientes",
    "Misiones",
    "Salta",
    "Córdoba",
    "Buenos Aires",
    "La Pampa",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  ]);
  const [ciudades, setCiudades] = useState([]); // Estado para guardar las ciudades que trae de handleProvinciaChange segun la provincia
  console.log("ciudades", ciudades);
  const handleProvinciaChange = async (event) => {
    // Trae las ciudades segun al provincia seleccionada
    const provincia = event.target.value;
    setUserData({ ...userData, Provincia: provincia });
    try {
      const response = await fetch(
        `${REACT_APP_API_URL}/municipalities/${encodeURIComponent(provincia)}`
      );
      const data = await response.json();
      setCiudades(data);
    } catch (error) {
      console.error("Error al obtener las ciudades:", error);
    }
  };

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
    Nombre: "",
    Telefono: "",
    País: "",
    Provincia: "",
    Localidad: "",
    Calle: "",
    Ocupación: "",
    "Sobre mi": "",
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
      dispatch(postUserData(userDataEnglish));
      handleShowForm();
    } else {
      window.alert("Formulario con Errores");
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
        <p className={styles.textTitle}>Completa tus datos personales</p>
        <p className={styles.errorMessageStatic}>* Campos Obligatorios</p>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.FormDivInput}>
            <label className={styles.labels}>* Nombre y Apellido:</label>
            <input
              className={styles.inputs}
              type="text"
              name="Nombre"
              value={userData.Nombre}
              onChange={handleChange}
              placeholder="Ej: Ana Maria de los Angeles"
            />
            <div
              className={
                userData.Nombre &&
                (localErrors.Nombre
                  ? styles.errorMessage
                  : styles.errorNotMessage)
              }
            >
              {userData.Nombre
                ? localErrors.Nombre
                  ? localErrors.Nombre
                  : "Datos Validos"
                : null}
            </div>
          </div>

          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>* Teléfono:</label>
              <input
                className={styles.inputs}
                type="text"
                name="Telefono"
                value={userData.Telefono}
                onChange={handleChange}
                placeholder="Ej: 54 9 ...(Tu número sin el 15)... "
              />
              <div
                className={
                  userData.Telefono &&
                  (localErrors.Telefono
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.Telefono
                  ? localErrors.Telefono
                    ? localErrors.Telefono
                    : "Datos Validos"
                  : null}
              </div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>País:</label>
              <span
                className={`${styles.inputs} ${styles.inputsStatic}`}
                role="button"
                tabIndex="0"
              >
                {userData.País || "Argentina"}
              </span>
              <div
                className={
                  userData.País &&
                  (localErrors.País
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.País
                  ? localErrors.País
                    ? localErrors.País
                    : "Datos Válidos"
                  : null}
              </div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>* Provincia:</label>
              <select
                className={styles.inputs}
                name="Provincia"
                value={userData.Provincia}
                onChange={handleProvinciaChange}
              >
                <option value="" disabled>
                  Selecciona una provincia
                </option>
                {provincias.map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
              <div
                className={
                  userData.Provincia &&
                  (localErrors.Provincia
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.Provincia
                  ? localErrors.Provincia
                    ? localErrors.Provincia
                    : "Datos Válidos"
                  : null}
              </div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>* Ciudad:</label>
              <select
                className={styles.inputs}
                name="Localidad"
                value={userData.Localidad}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona una ciudad
                </option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad} value={ciudad}>
                    {ciudad}
                  </option>
                ))}
              </select>
              <div
                className={
                  userData.Localidad &&
                  (localErrors.Localidad
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.Localidad
                  ? localErrors.Localidad
                    ? localErrors.Localidad
                    : "Datos Válidos"
                  : null}
              </div>
            </div>
          </div>
          <div className={styles.FormDivInput}>
            <label className={styles.labels}>* Calle:</label>
            <input
              className={styles.inputs}
              type="text"
              name="Calle"
              value={userData.Calle}
              onChange={handleChange}
              placeholder="Ej: Av. Chacabuco"
            />
            <div
              className={
                userData.Calle &&
                (localErrors.Calle
                  ? styles.errorMessage
                  : styles.errorNotMessage)
              }
            >
              {userData.Calle
                ? localErrors.Calle
                  ? localErrors.Calle
                  : "Datos Válidos"
                : null}
            </div>
          </div>

          <div className={styles.FormDivInput}>
            <label className={styles.labels}>* Profesión:</label>
            <input
              className={styles.inputs}
              type="text"
              name="Ocupación"
              value={userData.Ocupación}
              onChange={handleChange}
              placeholder="Ej: Enfermera"
            />
            <div
              className={
                userData.Ocupación &&
                (localErrors.Ocupación
                  ? styles.errorMessage
                  : styles.errorNotMessage)
              }
            >
              {userData.Ocupación
                ? localErrors.Ocupación
                  ? localErrors.Ocupación
                  : "Datos Válidos"
                : null}
            </div>
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
            <div
              className={
                userData["Sobre mi"] &&
                (localErrors["Sobre mi"]
                  ? styles.errorMessage
                  : styles.errorNotMessage)
              }
            >
              {userData["Sobre mi"]
                ? localErrors["Sobre mi"]
                  ? localErrors["Sobre mi"]
                  : "Datos Válidos"
                : null}
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
