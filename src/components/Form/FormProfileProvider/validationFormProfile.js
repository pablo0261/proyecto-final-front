const isValidName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/
const isFromArgentina = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/

const Validation = (property, setLocalErrors, userData) => {
  switch (property) {

    case "Nombre":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingresa tu nombre completo",
        }));
      } else if (!isValidName.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Tu nombre completo no puede contener símbolos ni números",
        }));
      } else if (userData[property].length > 30) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Tu nombre completo excede el límite de caracteres permitido",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Telefono":
      if (!userData[property]) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese un número de teléfono",
        }));
      } else if (!isFromArgentina.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*El número de teléfono debe ser válido",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Provincia":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Seleccione una provincia.",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Localidad":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Seleccione una ciudad.",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Calle":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese su domicilio.",
        }));
      } else if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*La Calle no puede contener símbolos",
        }));
      } else if (userData[property].length > 40) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Introduzca una calle valida",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Profesion":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Seleccione una opcion.",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "Sobre mi":
      if (userData[property].trim().length > 200) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*El texto es demasiado largo (máximo 200 caracteres)",
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
