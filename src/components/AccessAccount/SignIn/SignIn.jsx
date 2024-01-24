import React, { useState } from 'react'
import { ValidateFormSignIn } from './ValidateFormSignIn';

function SignIn(props) {

    const { isProvider, handleFormsVisibility, signInProcess } = props

    const [signInData, setSignInData] = useState({
        fullName: "",
        birthDate: "",
        email: "",
        password: "",
        isProvider: isProvider,
        price: isProvider ? 25 : null
    })

    const [errors, setErrors] = useState({
        fullName: "Ingresá su Nombre completo",
        birthDate: "Ingresá tu fecha de nacimiento",
        email: "Ingresá tu mail",
        password: "Ingresá tu constraseña"
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleChangeLogIn = (event) => {
        const property = event.target.name
        const value = event.target.value

        setSignInData({ ...signInData, [property]: value })

        ValidateFormSignIn(property, errors, setErrors, { ...signInData, [property]: value })
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSumbitLogIn = (event) => {
        event.preventDefault()

        if (Object.values(errors).every(error => error === '')) {
            signInProcess(signInData)
        } else {
            window.alert('Datos con errores')
        }
    }

    return (
        <div>
            <h1>Crear mi cuenta {isProvider ? <span>(Proveedor)</span> : <span>(Cliente)</span>}</h1>
            {
                isProvider ?
                    <p>Para crear tu cuenta en nuestra plataforma deberas realizar el pago de una suscripcion.</p>
                    :
                    <p>Únete a Care with Love para encontrar el cuidador perfecto. Tu familia merece lo mejor.</p>
            }
            <form onSubmit={handleSumbitLogIn}>
                <div>
                    <input
                        id='fullName'
                        name='fullName'
                        type='text'
                        value={signInData.fullName}
                        onChange={handleChangeLogIn}
                        placeholder='Nombre y Apellido' />
                    {errors.fullName && <p className='errorForm'>{errors.fullName}</p>}
                </div>
                <div>
                    <input
                        id='birthDate'
                        name='birthDate'
                        type='date'
                        value={signInData.birthDate}
                        onChange={handleChangeLogIn}
                        placeholder='dd-mm-aaaa' 
                        max={(new Date()).toISOString().split('T')[0]}/>
                    {errors.birthDate && <p className='errorForm'>{errors.birthDate}</p>}
                </div>
                <div>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        value={signInData.email}
                        onChange={handleChangeLogIn}
                        placeholder='example@example.com' />
                    {errors.email && <p className='errorForm'>{errors.email}</p>}
                </div>
                <div>
                    <input
                        id='password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={signInData.password}
                        onChange={handleChangeLogIn} />
                    <button type='button' onClick={handleTogglePassword}>
                        {showPassword ? 'Ocultar' : 'Mostrar'} Contraseña
                    </button>
                    {errors.password && <p className='errorForm'>{errors.password}</p>}
                </div>
                {
                    isProvider &&
                    <div>
                        <h5>Suscripcion Mensual</h5>
                        <h5>US$ 25</h5>
                    </div>
                }
                <div>
                    <button type='submit'>Registrarse</button>
                </div>
            </form>
            <h4>¿Ya tienes una cuenta?</h4>
            <button onClick={() => { handleFormsVisibility() }}>Iniciar Sesión</button>
        </div>
    )
}

export default SignIn