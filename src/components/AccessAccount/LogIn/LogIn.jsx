import React, { useState } from 'react'
import { ValidateFormLogIn } from './ValidateFormLogIn'

function LogIn(props) {

    const { isProvider, handleFormsVisibility, logInProcess } = props

    const [logInData, setLogInData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "Ingresá tu email registrado",
        password: "Ingresá tu constraseña"
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleChangeLogIn = (event) => {
        const property = event.target.name
        const value = event.target.value

        setLogInData({ ...logInData, [property]: value })

        ValidateFormLogIn(property, errors, setErrors, { ...logInData, [property]: value })
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSumbitLogIn = (event) => {
        event.preventDefault()

        if (Object.values(errors).every(error => error === '')) {
            logInProcess(logInData)
        } else {
            window.alert('Datos con errores')
        }
    }

    return (
        <div>
            <h1>Iniciar Sesión {isProvider ? <span>(Proveedor)</span> : <span>(Cliente)</span>}</h1>
            {
                isProvider ?
                    <p>Accede al clasificado de cuidadores mas grande de Argentina. Potencia tu visibilidad.</p>
                    :
                    <p>Accede a la atención que mereces. Descubre un mundo de cuidado personalizado.</p>
            }
            <form onSubmit={handleSumbitLogIn}>
                <div>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        value={logInData.email}
                        onChange={handleChangeLogIn}
                        placeholder='example@example.com' />
                    {errors.email && <p className='errorForm'>{errors.email}</p>}
                </div>
                <div>
                    <input
                        id='password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={logInData.password}
                        onChange={handleChangeLogIn} />
                    <button type='button' onClick={handleTogglePassword}>
                        {showPassword ? 'Ocultar' : 'Mostrar'} Contraseña
                    </button>
                    {errors.password && <p className='errorForm'>{errors.password}</p>}
                </div>
                <div>
                    <button type='submit'>Ingresar</button>
                </div>
            </form>
            <h4>¿No tienes cuenta aún?</h4>
            <button onClick={() => { handleFormsVisibility() }}>Registrarse</button>
        </div>
    )
}

export default LogIn