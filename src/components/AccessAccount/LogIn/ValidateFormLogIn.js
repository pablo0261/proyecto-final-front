const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const isValidPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

export const ValidateFormLogIn = (property, errors, setErrors, logInData) => {
    if (property === 'email') {
        if (!logInData.email) {
            setErrors({ ...errors, email: "Ingresá tu email registrado" })
        } else if (!isEmail.test(logInData.email)) {
            setErrors({ ...errors, email: "Ingresá un email valido" })
        } else {
            setErrors({ ...errors, email: "" })
        }
    }

    if (property === 'password') {
        if (!logInData.password) {
            setErrors({ ...errors, password: "Ingresá tu constraseña" })
        } else if (!isValidPassword.test(logInData.password)) {
            setErrors({ ...errors, password: "La contraseña debe tener entre 8 y 16 caracteres, al menos un número, una minúscula y una mayúscula." })
        } else {
            setErrors({ ...errors, password: "" })
        }
    }
}