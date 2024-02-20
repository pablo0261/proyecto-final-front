const Validation = (property, localErrors, setLocalErrors, userData) => {
    if (property === "idOption") {
        if (!userData[property]) {
            setLocalErrors({...localErrors, [property] : "*Debes seleccionar una opcion"})
        } else {
            setLocalErrors({...localErrors, [property] : ""})
        }
    }
};

export default Validation;
