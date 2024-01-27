const regexName = /^[A-Za-z\s]*$/; // Verifica que el input contenga solo letras (mayúsculas o minúsculas) y espacios.
const regexAge = /^\d+$/; // Verifica que el input contenga solo dígitos y que haya al menos uno.
const regexAddress = /^[A-Za-z0-9\s]*$/; // Verifica que el input contenga solo letras (mayúsculas o minúsculas), números y espacios.
const regexState = /^[A-Za-z\s]*$/; // Verifica que el input contenga solo letras (mayúsculas o minúsculas) y espacios.
const regexCountry = /^[A-Za-z\s]*$/; // Verifica que el input contenga solo letras (mayúsculas o minúsculas) y espacios.
const regexProfession = /^[A-Za-z\s]*$/; // Verifica que el input contenga solo letras (mayúsculas o minúsculas) y espacios.
const regexPhone = /^\d{10}$/; // Verifica que el input contenga exactamente 10 dígitos.
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Verifica el formato básico de una dirección de correo electrónico.
//*---- SERVICES----//
const regexService = /^[A-Za-z\s]{1,20}$/;
const regexCost = /^\d+(\.\d{1,2})?$/; // Acepta números enteros o decimales con hasta dos decimales.
//*---- EDUCATION----//
const regexText = /^[A-Za-z0-9\s]*$/;
const regexYear = /^(19|20)\d{2}$/;

const ProfileValidation = (inputs, localErrors, setLocalErrors) => {
  let newLocalErrors = { ...localErrors };

  const {name, age, address, state, country, profession, aboutMe, phone, mail,
  } = inputs;

  if (!name) {
    newLocalErrors.name = "El nombre es obligatorio";
  } else if (!regexName.test(name)) {
    newLocalErrors.name = "El nombre no puede contener símbolos ni números";
  } else if (name.length > 20) {
    newLocalErrors.name = "El nombre excede el límite de caracteres permitido";
  } else {
    newLocalErrors.name = "";
  }

  if (!age) {
    newLocalErrors.age = "La edad es obligatoria";
  } else if (!regexAge.test(age)) {
    newLocalErrors.age = "Formato de edad inválido";
  } else {
    newLocalErrors.age = "";
  }

  if (!address) {
    newLocalErrors.address = "La dirección es obligatoria";
  } else if (!regexAddress.test(address)) {
    newLocalErrors.address = "Formato de dirección inválido";
  } else {
    newLocalErrors.address = "";
  }

  if (!state) {
    newLocalErrors.state = "El estado es obligatorio";
  } else if (!regexState.test(state)) {
    newLocalErrors.state = "Formato de estado inválido";
  } else {
    newLocalErrors.state = "";
  }

  if (!country) {
    newLocalErrors.country = "El país es obligatorio";
  } else if (!regexCountry.test(country)) {
    newLocalErrors.country = "Formato de país inválido";
  } else {
    newLocalErrors.country = "";
  }

  if (!profession) {
    newLocalErrors.profession = "La profesión es obligatoria";
  } else if (!regexProfession.test(profession)) {
    newLocalErrors.profession = "Formato de profesión inválido";
  } else {
    newLocalErrors.profession = "";
  }

  if (!aboutMe) {
    newLocalErrors.aboutMe = "La descripción personal es obligatoria";
  } else {
    newLocalErrors.aboutMe = "";
  }

  if (!phone) {
    newLocalErrors.phone = "El teléfono es obligatorio";
  } else if (!regexPhone.test(phone)) {
    newLocalErrors.phone = "Formato de número de teléfono inválido";
  } else {
    newLocalErrors.phone = "";
  }

  if (!mail) {
    newLocalErrors.mail = "El correo electrónico es obligatorio";
  } else if (!regexMail.test(mail)) {
    newLocalErrors.mail = "Formato de correo electrónico inválido";
  } else {
    newLocalErrors.mail = "";
  }

  setLocalErrors({ ...localErrors, ...newLocalErrors });
};

const ServicesValidation = (inputs, localErrors, setLocalErrors) => {
  let newLocalErrors = { ...localErrors };

  const { service, cost } = inputs;

  if (!service) {
    newLocalErrors.service = "El servicio es obligatorio";
  } else if (!regexService.test(service)) {
    newLocalErrors.service = "Formato de servicio inválido";
  } else {
    newLocalErrors.service = "";
  }

  if (!cost) {
    newLocalErrors.cost = "El costo es obligatorio";
  } else if (!regexCost.test(cost)) {
    newLocalErrors.cost = "Formato de valor inválido";
  } else {
    newLocalErrors.cost = "";
  }

  setLocalErrors({ ...localErrors, ...newLocalErrors });
};

const EducationValidation = (inputs, localErrors, setLocalErrors) => {
  let newLocalErrors = { ...localErrors };

  const { EducationTitle, institution, startDate, endDate, description } = inputs;

  if (!EducationTitle) {
    newLocalErrors.EducationTitle = "El título de educación es obligatorio";
  } else if (!regexText.test(EducationTitle) || EducationTitle.length > 30) {
    newLocalErrors.EducationTitle = "Formato de título de educación inválido";
  } else {
    newLocalErrors.EducationTitle = "";
  }
  
  if (!institution) {
    newLocalErrors.institution = "La institución es obligatoria";
  } else if (!regexText.test(institution) || institution.length > 30) {
    newLocalErrors.institution = "Formato de institución inválido";
  } else {
    newLocalErrors.institution = "";
  }
  
  if (!startDate) {
    newLocalErrors.startDate = "La fecha de inicio es obligatoria";
  } else if (!regexYear.test(startDate)) {
    newLocalErrors.startDate = "Formato de año de inicio inválido";
  } else {
    newLocalErrors.startDate = "";
  }
  
  if (!endDate) {
    newLocalErrors.endDate = "La fecha de finalización es obligatoria";
  } else if (!regexYear.test(endDate) || parseInt(startDate) > parseInt(endDate)) {
    newLocalErrors.endDate = "Formato de año de finalización inválido o anterior al año de inicio";
  } else {
    newLocalErrors.endDate = "";
  }
  
  if (!description) {
    newLocalErrors.description = "La descripción es obligatoria";
  } else if (!regexText.test(description) || description.length > 150) {
    newLocalErrors.description = "Formato de descripción inválido";
  } else {
    newLocalErrors.description = "";
  }

  setLocalErrors({ ...localErrors, ...newLocalErrors });
};

const InteresValidation = (inputs, localErrors, setLocalErrors) => {
  let newLocalErrors = { ...localErrors };

  const { skill } = inputs;

  if (!skill) {
    newLocalErrors.skill = "Introduzca una habilidad o Interes";
  } else if (!regexText.test(skill) || skill.length < 15) {
    newLocalErrors.skill = "Formato inválido";
  } else {
    newLocalErrors.skill = "";
  }
  setLocalErrors({ ...localErrors, ...newLocalErrors });
};

const ScheduleValidation = (inputs, localErrors, setLocalErrors) => {
  let newLocalErrors = { ...localErrors };

  const { values } = inputs;
  const flattenedArray = values.flat();
  if (!flattenedArray.includes(true)) {
    newLocalErrors.values = "Debe haber al menos un turno disponible (valor 'true')";
  }
  
  setLocalErrors({ ...localErrors, ...newLocalErrors });
};

export default {
  ProfileValidation,
  ServicesValidation,
  EducationValidation,
  InteresValidation,
  ScheduleValidation
};
