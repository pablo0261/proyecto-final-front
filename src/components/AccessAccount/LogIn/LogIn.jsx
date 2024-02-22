import React, { useState } from 'react'
import { ValidateFormLogIn } from './ValidateFormLogIn'
import style from './LogIn.module.sass'
import Swal from  'sweetalert2'

function LogIn(props) {

    const { isProvider, handleFormsVisibility, logInProcess } = props

    const [logInData, setLogInData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "*Campo Obligatorio",
        password: "*Campo Obligatorio"
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
            Swal.fire({
                title: 'Campos con errores!',
                text: `Por favor complete el formulario correctamente`,
                icon: 'warning',
              })
            
        }
    }

    return (
        <div className={style.wrapper}>
            <p className={style.title}>Iniciar Sesión {isProvider ? <span className={style.text}>(Proveedor)</span> : <span className={style.text}>(Cliente)</span>}</p>
            {
                isProvider ?
                    <p className={style.text}>Accede al clasificado de cuidadores mas grande de Argentina. Potencia tu visibilidad.</p>
                    :
                    <p className={style.text}>Accede a la atención que mereces. Descubre un mundo de cuidado personalizado.</p>
            }
            <form onSubmit={handleSumbitLogIn}>
                <div className={style.inputWrapper}>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        value={logInData.email}
                        onChange={handleChangeLogIn}
                        placeholder='example@email.com' />
                    <p className={errors.email ? style.errorForm : style.nonError}>{errors.email ? errors.email : 'Datos Validos'}</p>
                </div>
                <div className={style.inputWrapper}>
                    <div className={style.password}>
                        <input 
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            value={logInData.password}
                            onChange={handleChangeLogIn} 
                            placeholder='Constraseña'/>
                        <div onClick={handleTogglePassword} className={showPassword ? style.hidePassword : style.showPassword}></div>
                    </div>
                    <p className={errors.password ? style.errorForm : style.nonError}>{errors.password ? errors.password : 'Datos Validos'}</p>
                </div>
                <div>
                    <button type='submit' className={style.buttonSubmit}>Ingresar</button>
                </div>
            </form>
            <div className={style.Questions}>
                <p className={style.text}>¿No tienes cuenta aún?</p>
                <button onClick={() => { handleFormsVisibility() }} className={style.buttonHandle}>Registrarse</button>
            </div>
        </div>
    )
}

export default LogIn