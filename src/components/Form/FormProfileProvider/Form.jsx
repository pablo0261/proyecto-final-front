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

  const [isProvinciaSelected, setIsProvinciaSelected] = useState("Selecciona una provincia")

  const provincias = [
    "Buenos Aires",
    "Ciudad Autónoma de Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán"
  ]

  const [ciudades, setCiudades] = useState([]);

  const handleProvinciaChange = async (event) => {
    const property = event.target.name
    setIsProvinciaSelected(event.target.value)
    const provincia = event.target.value.toLowerCase();
    setUserData({ ...userData, [property]: provincia });
    Validation(property, setLocalErrors, { ...userData, [property]: provincia });
    try {
      const response = await fetch(
        `${REACT_APP_API_URL}/municipalities?province=${encodeURIComponent(
          provincia
        )}`
      );
      const data = await response.json();
      const sortedCiudades = data.data.sort((a, b) =>
        a.nombreLocalidad.localeCompare(b.nombreLocalidad)
      );
      setCiudades(sortedCiudades);
    } catch (error) {
      window.alert("Error al obtener las ciudades:", error);
    }
  }

  const [profession, setProfession] = useState([]);

  useEffect(() => {
    const handleProfessionChange = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/categories`);
        const data = await response.json();
        const professionList = data.categories.data.find(
          category => category.idCategorie === 5
        );
        if (professionList) {
          setProfession(professionList.categories_options);
        }
      } catch (error) {
        window.alert("Error al obtener las profesiones:", error);
      }
    };

    handleProfessionChange();
  }, []);

  const [userData, setUserData] = useState({
    id: userLog,
    Nombre: "",
    Profesion: "",
    Telefono: "",
    País: "Argentina",
    Provincia: "",
    Localidad: "",
    Calle: "",
    "Sobre mi": "",
  });

  const [localErrors, setLocalErrors] = useState({
    Nombre: "*Campo Obligatorio",
    Telefono: "*Campo Obligatorio",
    País: "",
    Provincia: "*Campo Obligatorio",
    Localidad: "*Campo Obligatorio",
    Calle: "*Campo Obligatorio",
    Profesion: "*Campo Obligatorio",
    "Sobre mi": "*Campo Obligatorio",
  });

  const [professionSelected, setProfessionSelected] = useState("")

  //-PARA ENVIAR CON EL POST--/
  const userDataEnglish = {
    idPeople: userData.id,
    profession: userData.Profesion,
    fullName: userData.Nombre,
    phone: userData.Telefono,
    country: userData.País,
    idLocation: userData.Localidad,
    address: userData.Calle,
    aboutMe: userData["Sobre mi"],
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "Profesion") {
      setProfessionSelected(value)
    }
    Validation(property, setLocalErrors, { ...userData, [property]: value });
    setUserData({ ...userData, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = userData.Nombre !== "" &&
    userData.Telefono !== "" &&
    userData.País !== "" &&
    userData.Provincia !== "" &&
    userData.Localidad !== "" &&
    userData.Calle !== "" && Object.values(localErrors).some((error) => error !== "");

    if (!hasErrors) {
      dispatch(postUserData(userDataEnglish));
      handleShowForm();
    } else {
      window.alert("Complete el formulario sin errores");
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
        <form className={styles.Form} onSubmit={handleSubmit}>
          {
            Object.values(userData).some((data) => data !== "") && <p className={styles.errorMessageStatic}>(*)Rellene los campos obligatorios</p>
          }
          <div className={styles.FormDivInput}>
            <label className={styles.labels}>*Nombre y Apellido:</label>
            <input
              className={styles.inputs}
              type="text"
              name="Nombre"
              value={userData.Nombre}
              onChange={handleChange}
              placeholder="Ej: Ana Maria de los Angeles"
            />
            <div className={localErrors.Nombre ? styles.errorMessage : styles.errorNotMessage}>
              {localErrors.Nombre ? localErrors.Nombre : "Datos Válidos"}
            </div>
          </div>

          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>*Teléfono:</label>
              <input
                className={styles.inputs}
                type="text"
                name="Telefono"
                value={userData.Telefono}
                onChange={handleChange}
                placeholder="Ej: 54 9 ...(Tu número sin el 15)... "
              />
              <div className={localErrors.Telefono ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.Telefono ? localErrors.Telefono : "Datos Válidos"}
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
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>*Provincia:</label>
              <select
                className={styles.inputSelect}
                name="Provincia"
                value={isProvinciaSelected}
                onChange={handleProvinciaChange}
              >
                <option value="Selecciona una provincia" disabled>
                  Selecciona una provincia
                </option>
                {provincias.map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
              <div className={localErrors.Provincia ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.Provincia ? localErrors.Provincia : "Datos Válidos"}
              </div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>*Ciudad:</label>
              <select
                className={styles.inputSelect}
                name="Localidad"
                value={userData.Localidad}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona una ciudad
                </option>
                {Array.isArray(ciudades) &&
                  ciudades.map((ciudad) => (
                    <option
                      key={ciudad.idLocalidad}
                      value={ciudad.idLocalidad}
                    >
                      {ciudad.nombreLocalidad}
                    </option>
                  ))}
              </select>
              <div className={localErrors.Localidad ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.Localidad ? localErrors.Localidad : "Datos Válidos"}
              </div>
            </div>
          </div>
          <div className={styles.FormDivInput}>
            <label className={styles.labels}>*Calle:</label>
            <input
              className={styles.inputs}
              type="text"
              name="Calle"
              value={userData.Calle}
              onChange={handleChange}
              placeholder="Ej: Av. Chacabuco"
            />
            <div className={localErrors.Calle ? styles.errorMessage : styles.errorNotMessage}>
              {localErrors.Calle ? localErrors.Calle : "Datos Válidos"}
            </div>
          </div>

          <div className={styles.FormDivInput}>
            <label className={styles.labels}>*Profesión:</label>
            <select
              className={styles.inputSelect}
              name="Profesion"
              value={professionSelected}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona una profesión
              </option>
              {Array.isArray(profession) &&
                profession.map((profession) => (
                  <option
                    key={profession.idOption}
                    value={profession.description}
                  >
                    {profession.description}
                  </option>
                ))}
            </select>
            <div className={localErrors.Profesion ? styles.errorMessage : styles.errorNotMessage}>
              {localErrors.Profesion ? localErrors.Profesion : "Datos Válidos"}
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
            <div className={localErrors["Sobre mi"] ? styles.errorMessage : styles.errorNotMessage}>
              {localErrors["Sobre mi"] ? localErrors["Sobre mi"] : "Datos Válidos"}
            </div>
          </div>
           <button className={styles.buttonSave} type="submit" >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
