const Validation = (property, setLocalErrors, userData) => {
  switch (property) {
    case 'destination':
      if (userData[property] === '') {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '*Seleccione al menos una opción',
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '',
        }));
      }
      break;

    case 'title':
      if (userData[property] === '') {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '*La pregunta es obligatoria',
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '',
        }));
      }
      break;

    case 'message':
      if (userData[property] === '') {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '*La respuesta es obligatoria',
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '',
        }));
      }
      break;

    default:
      break;
  }
};

export default Validation;
