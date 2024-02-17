const Validation = (
  property,
  setLocalErrors,
  userData,
) => {
  const errors = {};

  switch (property) {
    case "actividad":
      if (userData[property].trim() === "") {
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

    case "lugar":
      if (userData[property].trim() === "") {
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
      const enteredYear = parseInt(userData[property]);
      if (userData[property].trim() === "") {
        errors[property] = "*Este campo es obligatorio";
      } else if (
        !/^\d{4}$/.test(userData[property]) ||
        enteredYear < 1900 ||
        enteredYear > currentYear
      ) {
        errors[property] = "*Ingrese un año válido (1900-" + currentYear + ")";
      }
      break;

    case "comment":
      if (userData[property].trim().length > 200) {
        errors[property] =
          "*El texto es demasiado largo (máximo 200 caracteres)";
      } else if (!/^[\w\sáéíóúÁÉÍÓÚüÜñÑ.,]+$/.test(userData[property])) {
        errors[property] = "*Las observaciones no pueden contener simbolos";
      }
      break;

    default:
      break;
  }
};
export default Validation;
