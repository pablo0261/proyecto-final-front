import React, { useEffect, useState } from 'react'
import LogIn from '../../components/AccessAccount/LogIn/LogIn'
import SignIn from '../../components/AccessAccount/SignIn/SignIn'
import { Link } from 'react-router-dom';
import Helpers from '../../Helpers/RoutesFront';

function AccessAccount() {

    useEffect(()=>{
        localStorage.setItem('isProvider', JSON.stringify(true)) 
    }, [])

    let isProvider;
    if (localStorage.getItem('isProvider') !== 'undefined') {
        isProvider = JSON.parse(localStorage.getItem('isProvider'))
    } else {
        isProvider = null
        window.alert('LocalStorage.isProvider No Existe. ¡¿Landing?!')
    }
    
    const [signInView, setSignInView] = useState(true)
    const handleFormsVisibility = () => {
        setSignInView(!signInView)
    }

    return (
        <div className="wrapper">
            {
                isProvider != null ?
                    <div>
                        {
                            signInView ? 
                            <div>
                                <SignIn isProvider={isProvider} handleFormsVisibility={handleFormsVisibility}></SignIn>
                                <div>Componente de Stats</div>
                                <div>Componente de Comentario</div>
                            </div>
                            : 
                            <div>
                                <LogIn isProvider={isProvider} handleFormsVisibility={handleFormsVisibility}></LogIn>
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