import React, { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import style from './NavBar.module.sass';
import Helpers from '../../Helpers/RoutesFront';
import StoreItem from '../../Helpers/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { logOutDeleteData } from '../../redux/actions';

function NavBar() {

    const location = useLocation()
    const navigate = useNavigate()
    const userLoggedInfo = useSelector(state => state.infoUserLog)
    const emailUserLog = localStorage.getItem(StoreItem.emailUserLogged)

    /* const handleLocalStorage = (bool) => {
        localStorage.setItem('isProvider',JSON.stringify(bool))
        console.log(localStorage.getItem('isProvider'))
    } */

    const dispatch = useDispatch()
    
    const handleLogOut = () => {
        dispatch(logOutDeleteData())
        navigate(Helpers.Landing)
    }

    // 5 Opciones: Landing / AccessAccount / Cliente / Proveedor / Administrador
    return (
        <div className={style.backWrapper}>
            <div className={style.wrapper}>
                <div className={style.logo}></div>
                {
                    location.pathname === Helpers.Landing && !userLoggedInfo.idPeople && !emailUserLog && <NavLink to="/#" className={style.link}>¿Como Funciona?</NavLink>
                }
                {
                    location.pathname === Helpers.AccessAccount && !userLoggedInfo.idPeople && !emailUserLog && <NavLink to={Helpers.Landing} className={style.link}>Volver</NavLink>
                }
                {
                    userLoggedInfo.idPeople && userLoggedInfo.typeOfPerson === 'provider' && location.pathname !== Helpers.Landing && location.pathname !== Helpers.AccessAccount &&
                    <div>
                        <NavLink to={Helpers.StatsProviderView} className={({ isActive }) =>  isActive ? style.active : style.link}>Mis Estadísticas</NavLink>
                        <NavLink to={Helpers.ConnectionsProviderView} className={({ isActive }) =>  isActive ? style.active : style.link}>Mis Conexiones</NavLink>
                        <NavLink to={Helpers.ReportsProviderView} className={({ isActive }) =>  isActive ? style.active : style.link}>Mis Reportes</NavLink>
                        <NavLink to={Helpers.ProfileProviderView} className={({ isActive }) =>  isActive ? style.active : style.link}>Mi Perfil</NavLink>
                        <button className={style.link} onClick={()=>handleLogOut()}>Cerrar Sesión</button>
                    </div>
                }
                {
                    userLoggedInfo.idPeople && userLoggedInfo.typeOfPerson === 'customer' && location.pathname !== Helpers.Landing && location.pathname !== Helpers.AccessAccount &&
                    <div>
                        <NavLink to={Helpers.HomeCustomerView} className={({ isActive }) =>  isActive ? style.active : style.link}>Ver Proveedores</NavLink>
                        <NavLink to={Helpers.ConnectionsCustomerView} className={({ isActive }) =>  isActive ? style.active : style.link}>Mis Conexiones</NavLink>
                        <NavLink to={Helpers.ReportsCustomerView} className={({ isActive }) =>  isActive ? style.active : style.link}>Mis Reportes</NavLink>
                        <NavLink to={Helpers.ProfileCustomerView} className={({ isActive }) =>  isActive ? style.active : style.link}>Mi Perfil</NavLink>
                        <button className={style.link} onClick={()=>handleLogOut()}>Cerrar Sesión</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar