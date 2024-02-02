const Validation = (property, setLocalErrors, userData) => {
  switch (property) {
    case 'Pregunta':
      if (userData[property].trim() === '') {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '* La pregunta es obligatoria',
        }));
      } else if (userData[property].length > 50) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '* Pregunta demasiada extensa',
        }));
      } else if (userData[property].length < 25) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '* Pregunta demasiada corta',
        }));
      } else {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '',
        }));
      }
      break;

    case 'Respuesta':
      if (userData[property].trim() === '') {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '* La respuesta es obligatoria',
        }));
      } else if (userData[property].length > 100) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '* Respuesta demasiada extensa',
        }));
      } else if (userData[property].length < 75) {
        setLocalErrors((prevErrors) => ({
          ...prevErrors,
          [property]: '* Respuesta demasiada corta',
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
