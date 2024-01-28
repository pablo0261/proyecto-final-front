const Validation = (userData, localErrors, setLocalErrors, property, value) => {
  switch (property) {
    case "Nombre":
      if (value.trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "El nombre es obligatorio",
        }));
      } else if (!/^[A-Za-z\s]*$/.test(value)) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "El nombre no puede contener símbolos ni números",
        }));
      } else if (value.length > 20) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "El nombre excede el límite de caracteres permitido",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Telefono":
      if (!/^\d+$/.test(value)) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "El número de teléfono debe contener solo números",
        }));
      } else if (value.length < 9 || value.length > 14) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "Número de teléfono incorrecto",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "País":
      if (value.trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "El país es obligatorio",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "El país no puede contener símbolos",
        }));
      } else if (value.length > 15) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "Introduzca un país valido",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Calle":
      if (value.trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "La Calle es obligatoria",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "La Calle no puede contener símbolos",
        }));
      } else if (value.length > 20) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]:
            "Introduzca una calle valida",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Localidad":
      if (value.trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "La Localidad es obligatoria",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "La Localidad no puede contener símbolos",
        }));
      } else if (value.length > 15) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]:
            "Introduzca una localidad valida",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Provincia":
      if (value.trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "La Provincia es obligatoria",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "La Provincia no puede contener símbolos",
        }));
      } else if (value.length > 15) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]:
            "Introduzca una provincia valida",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Ocupación":
      if (value.trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "La Ocupación es obligatoria",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "La Ocupación no puede contener símbolos",
        }));
      } else if (value.length > 15) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]:
            "Introduzca una ocupación valida",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Sobre mi":
      if (value.trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "Este campo es obligatorio",
        }));
      } else if (value.length > 200) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "Texto demasiado extenso",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    default:
      break;
  }
};

export default Validation;
