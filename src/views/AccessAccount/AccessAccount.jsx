import React, { useEffect, useState } from 'react'
import LogIn from '../../components/AccessAccount/LogIn/LogIn'
import SignIn from '../../components/AccessAccount/SignIn/SignIn'
import { Link } from 'react-router-dom';
import Helpers from '../../Helpers/RoutesFront';

function AccessAccount() {

    const [isProvider, setIsProvider] = useState(JSON.parse(localStorage.getItem('isProvider')))

    const [signInView, setSignInView] = useState(true)

    const handleFormsVisibility = () => {
        setSignInView(!signInView)
    }

    const logInProcess = (logInData) => {
        /* axios.post('rutadelback', logInData)
            .then((response)=>{
                if(response.status === 200) {
                    navigate('/perfil')
                }
            }) */
        window.alert('InicioSinErrores')
        console.log(logInData)
    }

    const signInProcess = (signInData) => {
        /* axios.post('rutadelback', signInData)
            .then((response)=>{
                if(response.status === 200) {
                    navigate('/perfil')
                }
            }) */
        window.alert('InicioSinErrores')
        console.log(signInData)
    }

    return (
        <div className="wrapper">
            {
                isProvider != null ?
                    <div>
                        {
                            signInView ?
                                <div>
                                    <SignIn
                                        isProvider={isProvider}
                                        handleFormsVisibility={handleFormsVisibility}
                                        signInProcess={signInProcess}></SignIn>
                                    <div>Componente de Stats</div>
                                    <div>Componente de Comentario</div>
                                </div>
                                :
                                <div>
                                    <LogIn
                                        isProvider={isProvider}
                                        handleFormsVisibility={handleFormsVisibility}
                                        logInProcess={logInProcess}></LogIn>
                                    <div>Componente de Stats</div>
                                    <div>Componente de Comentario</div>
                                </div>
                        }
                    </div>
                    :
                    <Link to={Helpers.Landing}>Volver a Landing</Link>
            }
        </div>
    )
}

export default AccessAccount