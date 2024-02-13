import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import style from './NavBar.module.sass';
import Helpers from '../../Helpers/RoutesFront';
import StoreItem from '../../Helpers/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { logOutDeleteData } from '../../redux/actions';
import { io } from 'socket.io-client';
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
const socket = io(REACT_APP_API_URL);

function NavBar() {

    const location = useLocation()
    const navigate = useNavigate()
    const userLoggedInfo = useSelector(state => state.infoUserLog)
    const emailUserLog = localStorage.getItem(StoreItem.emailUserLogged)

    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOutDeleteData())
        socket.emit('logout-request', userLoggedInfo.idPeople)
        navigate(Helpers.Landing)
    }

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
                        <NavLink to={Helpers.StatsProviderView} className={({ isActive }) => isActive ? style.active : style.link}>Mis Estadísticas</NavLink>
                        <NavLink to={Helpers.ConnectionsProviderView} className={({ isActive }) => isActive ? style.active : style.link}>Mis Conexiones</NavLink>
                        <NavLink to={Helpers.ReportsProviderView} className={({ isActive }) => isActive ? style.active : style.link}>Mis Reportes</NavLink>
                        <NavLink to={Helpers.ProfileProviderView} className={({ isActive }) => isActive ? style.active : style.link}>Mi Perfil</NavLink>
                        <button className={style.link} onClick={() => handleLogOut()}>Cerrar Sesión</button>
                    </div>
                }
                {
                    userLoggedInfo.idPeople && userLoggedInfo.typeOfPerson === 'customer' && location.pathname !== Helpers.Landing && location.pathname !== Helpers.AccessAccount &&
                    <div>
                        <NavLink to={Helpers.HomeCustomerView} className={({ isActive }) => isActive ? style.active : style.link}>Ver Proveedores</NavLink>
                        <NavLink to={Helpers.ConnectionsCustomerView} className={({ isActive }) => isActive ? style.active : style.link}>Mis Conexiones</NavLink>
                        <NavLink to={Helpers.ReportsCustomerView} className={({ isActive }) => isActive ? style.active : style.link}>Mis Reportes</NavLink>
                        <NavLink to={Helpers.ProfileCustomerView} className={({ isActive }) => isActive ? style.active : style.link}>Mi Perfil</NavLink>
                        <button className={style.link} onClick={() => handleLogOut()}>Cerrar Sesión</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar