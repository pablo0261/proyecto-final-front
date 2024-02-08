const Validation = (property, setLocalErrors, userData) => {
  switch (property) {
    case "education":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese el nivel de educación",
        }));
      } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]{1,25}$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*El nivel de educación solo puede contener letras, números y espacios, y debe tener hasta 25 caracteres",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

    case "institution":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese la institución",
        }));
      } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]{1,25}$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*La institución solo puede contener letras, números y espacios, y debe tener hasta 25 caracteres",
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
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese el año",
        }));
      } else if (!/^\d{4}$/.test(userData[property]) || enteredYear < 1900 || enteredYear > currentYear) {
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

    case "observaciones":
      if (userData[property].trim().length > 200) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*El texto es demasiado largo (máximo 200 caracteres)",
        }));
      } else if (!/^[a-zA-Z0-9\s]+$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Las observaciones solo pueden contener letras y números, sin símbolos",
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
