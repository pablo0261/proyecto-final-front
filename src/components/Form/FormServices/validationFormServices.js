
const Validation = (property, localErrors, setLocalErrors, userData) => {

    if (property === "idOption") {
        if (!userData.idOption) {
            setLocalErrors({...localErrors, [property] : "*Debes seleccionar una opción"})
        } else {
            setLocalErrors({...localErrors, [property] : ""})
        }
    }

    if (property === "price") {
        const isNumber = /^\d+$/;
        if (!isNumber.test(userData.price)) {
            setLocalErrors({...localErrors, [property] : "*Debes ingresar un número"});
        } else if (userData[property] === "") {
            setLocalErrors({...localErrors, [property] : "*Debes establecer un valor"});
        } else {
            setLocalErrors({...localErrors, [property] : ""});
        }
    }
};

export default Validation;
