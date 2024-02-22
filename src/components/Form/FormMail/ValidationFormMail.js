const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const Validation = (property, localErrors, setLocalErrors, userData) => {
    if (property === 'to') {
        if (!userData[property]) {
            setLocalErrors({ ...localErrors, [property]: "Ingresá el email" })
        } else if (!isEmail.test(userData[property])) {
            setLocalErrors({ ...localErrors, [property]: "Ingresá un email valido" })
        } else {
            setLocalErrors({ ...localErrors, [property]: "" })
        }
    }

    if (property === 'subject') {
        if (!userData[property]) {
            setLocalErrors({ ...localErrors, [property]: "Ingresá un Asunto" })
        } else if (userData[property].length > 50) {
            setLocalErrors({ ...localErrors, [property]: "El Asunto es muy extenso (Maximo 50 caracteres)" })
        } else {
            setLocalErrors({ ...localErrors, [property]: "" })
        }  
    }

    if (property === 'text') {
        if (!userData[property]) {
            setLocalErrors({ ...localErrors, [property]: "Ingresá el cuerpo del correo electrónico" })
        } else {
            setLocalErrors({ ...localErrors, [property]: "" })
        }
    }
}

export default Validation