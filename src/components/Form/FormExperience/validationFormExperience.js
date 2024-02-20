const Validation = (
  property,
  setLocalErrors,
  userData,
) => {

  switch (property) {
    case "idOption":
      if (userData[property] === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Debes seleccionar una opción",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "description":
      if (userData[property] === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese la actividad que desarrolló.",
        }));
      } else if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*La Actividad no puede contener símbolos",
        }));
      } else if (userData[property].length > 30) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Introduzca una actividad valida",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "institution":
      if (userData[property] === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese el lugar donde desarrolló la actividad.",
        }));
      } else if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*El lugar no puede contener símbolos",
        }));
      } else if (userData[property].length > 30) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Introduzca un lugar valido",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "year":
      const currentYear = new Date().getFullYear();
      const enteredYear = Number(userData[property]);
      if (userData[property] === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese el año cuando desempeño la tarea",
        }));
      } else if (!/^\d{4}$/.test(userData[property]) || enteredYear < 1900 ||  enteredYear > currentYear) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese un año válido (1900-" + currentYear + ")",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "comment":
      if (userData[property].trim().length > 250) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*El texto es demasiado largo (máximo 250 caracteres)",
        }));
      } else if (!/^[\w\sáéíóúÁÉÍÓÚüÜñÑ.,]+$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Las observaciones no pueden contener simbolos",
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
