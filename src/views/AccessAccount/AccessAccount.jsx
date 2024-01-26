import React, { useEffect, useState } from 'react'
import LogIn from '../../components/AccessAccount/LogIn/LogIn'
import SignIn from '../../components/AccessAccount/SignIn/SignIn'
import { Link, useNavigate } from 'react-router-dom';
import Helpers from '../../Helpers/RoutesFront';
import StoreItem from '../../Helpers/LocalStorage';
import { useDispatch } from 'react-redux';
import { accessDataBase } from '../../redux/actions';
import style from './AccessAccount.module.sass'

function AccessAccount() {

    const isProvider = JSON.parse(localStorage.getItem(StoreItem.isProvider))

    const [signInView, setSignInView] = useState(false)

    const handleFormsVisibility = () => {
        setSignInView(!signInView)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logInProcess = (logInData) => {
        /* axios.post('rutadelback', logInData)
            .then((response)=>{
                if(response.status === 200) {
                    navigate('/perfil')
                }
            }) */
        if (isProvider) {
            dispatch(accessDataBase(logInData))
            navigate(Helpers.StatsProviderView)
        } else {
            dispatch(accessDataBase(logInData))
            navigate(Helpers.HomeCustomerView)
        }

    }

    const signInProcess = (signInData) => {
        /* axios.post('rutadelback', signInData)
            .then((response)=>{
                if(response.status === 200) {
                    navigate('/perfil')
                }
            }) */
        if (isProvider) {
            dispatch(accessDataBase(signInData))
            navigate(Helpers.StatsProviderView)
        } else {
            dispatch(accessDataBase(signInData))
            navigate(Helpers.HomeCustomerView)
        }
    }

    return (
        <div className={style.wrapper}>
            {
                isProvider != null ?
                    <div className={style.wrapperChild}>
                        {
                            signInView ?
                                <div className={style.wrapperForms}>
                                    <SignIn
                                        isProvider={isProvider}
                                        handleFormsVisibility={handleFormsVisibility}
                                        signInProcess={signInProcess}></SignIn>
                                    <div className={style.wrapperStats}>
                                        <div className={style.components}>
                                            Componente de Stats
                                        </div>
                                        <div className={style.components}>
                                            Componente de Comentario
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className={style.wrapperForms}>
                                    <LogIn
                                        isProvider={isProvider}
                                        handleFormsVisibility={handleFormsVisibility}
                                        logInProcess={logInProcess}></LogIn>
                                    <div className={style.wrapperStats}>
                                        <div className={style.components}>
                                            Componente de Stats
                                        </div>
                                        <div className={style.components}>
                                            Componente de Comentario
                                        </div>
                                    </div>
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