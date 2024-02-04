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

    case "País":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese su pais de residencia",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*El país no puede contener símbolos",
        }));
      } else if (userData[property].length > 15) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Introduzca un país valido",
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
          [property]: "*Ingrese su domicilio sin el número de casa, piso y/o depto.",
        }));
      } else if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*La Calle no puede contener símbolos",
        }));
      } else if (userData[property].length > 20) {
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

        case "Ocupación":
      if (userData[property].trim() === "") {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Ingrese su profesión/ocupación",
        }));
      } else if (!/^[A-Za-z\u00C0-\u024F\s]+$/.test(userData[property])) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Este campo no puede contener símbolos",
        }));
      } else if (userData[property].length > 25) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "*Campo demasiado extenso",
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: "",
        }));
      }
      break;

      case "Sobre mi":
        if (userData[property].length > 200) {
          setLocalErrors((prevErrors) => ({
            ...prevErrors,
            [property]: "*Texto demasiado extenso",
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
