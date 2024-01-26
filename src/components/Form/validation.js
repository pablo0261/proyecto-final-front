const regexName = /^[A-Za-z\s]*$/;// Verifica que el input contenga solo letras (mayúsculas o minúsculas) y espacios.
const regexAddress = /^[A-Za-z0-9\s]*$/;// Verifica que el input contenga solo letras (mayúsculas o minúsculas), números y espacios.
const regexAge = /^\d+$/;// Verifica que el input contenga solo dígitos y que haya al menos uno.
const regexCountry = /^[A-Za-z\s]*$/;// Verifica que el input contenga solo letras (mayúsculas o minúsculas) y espacios.
const regexProfession = /^[A-Za-z\s]*$/;// Verifica que el input contenga solo letras (mayúsculas o minúsculas) y espacios.
const regexPhone = /^\d{10}$/;// Verifica que el input contenga exactamente 10 dígitos.

const validation = (inputs, localErrors, setLocalErrors) => {
  let newLocalErrors = { ...localErrors };

  const {
    aboutMe,
    name,
    address,
    age,
    country,
    profesion,
    phone,
  } = inputs;

  if (!name) {
    newLocalErrors.name = "Name is required";
  } else if (!regexName.test(name)) {
    newLocalErrors.name = "Name can't contain symbols or numbers"; 
  } else if (name.length > 20) {
    newLocalErrors.name = "Name exceeds the allowed character limit";
  } else {
    newLocalErrors.name = "";
  }

  if (!aboutMe) {
    newLocalErrors.aboutMe = "About Me is required";
  } else {
    newLocalErrors.aboutMe = "";
  }

  if (!address) {
    newLocalErrors.address = "Address is required";
  } else if (!regexAddress.test(address)) {
    newLocalErrors.address = "Invalid address format";
  } else {
    newLocalErrors.address = "";
  }

  if (!age) {
    newLocalErrors.age = "Age is required";
  } else if (!regexAge.test(age)) {
    newLocalErrors.age = "Invalid age format";
  } else {
    newLocalErrors.age = "";
  }

  if (!country) {
    newLocalErrors.country = "Country is required";
  } else if (!regexCountry.test(country)) {
    newLocalErrors.country = "Invalid country format";
  } else {
    newLocalErrors.country = "";
  }

  if (!profesion) {
    newLocalErrors.profesion = "Profession is required";
  } else if (!regexProfession.test(profesion)) {
    newLocalErrors.profesion = "Invalid profession format";
  } else {
    newLocalErrors.profesion = "";
  }

  if (!phone) {
    newLocalErrors.phone = "Phone is required";
  } else if (!regexPhone.test(phone)) {
    newLocalErrors.phone = "Invalid phone number format";
  } else {
    newLocalErrors.phone = "";
  }

  setLocalErrors({ ...localErrors, ...newLocalErrors });
};

export default validation;
