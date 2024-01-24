const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const isValidPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

export const ValidateFormSignIn = (property, errors, setErrors, signInData) => {
    if (property === 'fullName') {
        if (!signInData.fullName) {
            setErrors({ ...errors, fullName: "Ingresá tu nombre completo" })
        } else {
            setErrors({ ...errors, fullName: "" })
        }
    }

    if (property === 'birthDate') {

        if (!signInData.birthDate) setErrors({ ...errors, birthDate: "Ingresá tu fecha de nacimiento" })

        const actualDate = new Date()
        const newBirtDate = new Date(signInData.birthDate)
        const age = actualDate.getFullYear() - newBirtDate.getFullYear()
        console.log(age)

        if (age < 18) {
            setErrors({ ...errors, birthDate: "Debes ser mayor de 18 años" })
        } else {
            setErrors({ ...errors, birthDate: "" })
        }
    }

    if (property === 'email') {
        if (!signInData.email) {
            setErrors({ ...errors, email: "Ingresá tu email registrado" })
        } else if (!isEmail.test(signInData.email)) {
            setErrors({ ...errors, email: "Ingresá un email valido" })
        } else {
            setErrors({ ...errors, email: "" })
        }
    }

    if (property === 'password') {
        if (!signInData.password) {
            setErrors({ ...errors, password: "Ingresá tu constraseña" })
        } else if (!isValidPassword.test(signInData.password)) {
            setErrors({ ...errors, password: "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula y una mayúscula." })
        } else {
            setErrors({ ...errors, password: "" })
        }
    }
}