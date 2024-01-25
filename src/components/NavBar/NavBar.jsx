import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import style from './NavBar.module.sass';
import Helpers from '../../Helpers/RoutesFront';
import StoreItem from '../../Helpers/LocalStorage';

function NavBar() {

    const location = useLocation()

    /* const handleLocalStorage = (bool) => {
        localStorage.setItem('isProvider',JSON.stringify(bool))
        console.log(localStorage.getItem('isProvider'))
    } */

    const isProvider = JSON.parse(localStorage.getItem(StoreItem.isProvider))
    const idUserLogged = JSON.parse(localStorage.getItem(StoreItem.idUserLogged))

    // 5 Opciones: Landing / AccessAccount / Cliente / Proveedor / Administrador
    return (
        <div className={style.wrapper}>
            <div className={style.logo}></div>
            {
                location.pathname === Helpers.Landing && <NavLink to="/#">¿Como Funciona?</NavLink>
            }
            {
                location.pathname === Helpers.AccessAccount && <NavLink to="/">Volver</NavLink>
            }
            {
                isProvider && location.pathname !== Helpers.AccessAccount &&
                <div>
                    <NavLink to={Helpers.StatsProviderView.replace(':id', idUserLogged)}>Mis Estadisticas</NavLink>
                    <NavLink to={Helpers.ConnectionsProviderView.replace(':id', idUserLogged)}>Mis Conexiones</NavLink>
                    <NavLink to={Helpers.ReportsProviderView.replace(':id', idUserLogged)}>Mis Reportes</NavLink>
                    <NavLink to={Helpers.ProfileProviderView.replace(':id', idUserLogged)}>Mi Perfil</NavLink>
                </div>
            }
            {
                !isProvider && location.pathname !== Helpers.AccessAccount &&
                <div>
                    <NavLink to={Helpers.HomeCustomerView.replace(':id', idUserLogged)}>Ver Proveedores</NavLink>
                    <NavLink to={Helpers.ConnectionsCustomerView.replace(':id', idUserLogged)}>Mis Conexiones</NavLink>
                    <NavLink to={Helpers.ReportsCustomerView.replace(':id', idUserLogged)}>Mis Reportes</NavLink>
                    <NavLink to={Helpers.ProfileCustomerView.replace(':id', idUserLogged)}>Mi Perfil</NavLink>
                </div>
            }
        </div>
    )
}

export default NavBar