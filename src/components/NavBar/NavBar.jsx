import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import style from './NavBar.module.sass';
import Helpers from '../../Helpers/RoutesFront';
import StoreItem from '../../Helpers/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { logOutDeleteData } from '../../redux/actions';
import { io } from 'socket.io-client';
import axios from 'axios';
import Swal from 'sweetalert2';
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
const socket = io(REACT_APP_API_URL);


function NavBar() {

    const location = useLocation()
    const navigate = useNavigate()
    const userLoggedInfo = useSelector(state => state.infoUserLog)
    const emailUserLog = localStorage.getItem(StoreItem.emailUserLogged)

    const dispatch = useDispatch()

    const handleLogOut = async() => {
        try {
            const response = await axios.put(
            `${REACT_APP_API_URL}/people/logout`, {idPeople: userLoggedInfo.idPeople});
            if (response.status === 200) {
                dispatch(logOutDeleteData())
                socket.emit('logout-request', userLoggedInfo.idPeople)
                navigate(Helpers.Landing)}
        } catch (error) {
            Swal.fire({
                title: `${error}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
        }
    }

    const scrollToTutorial = () => {
        const tutorialSection = document.getElementById('tutorial');
        if (tutorialSection) {
          window.scrollTo({
            top: tutorialSection.offsetTop,
            behavior: 'smooth'
          });
        }
    };

    return (
        <div className={style.backWrapper}>
            <div className={style.wrapper}>
                <div className={style.logo}></div>
                {
                    location.pathname === Helpers.Landing && !userLoggedInfo.idPeople && !emailUserLog && <button className={style.link} onClick={()=>scrollToTutorial()}>¿Como Funciona?</button>
                }
                
                {
                    (location.pathname === Helpers.AccessAccount || location.pathname === Helpers.FAQs || location.pathname === Helpers.ConsultReport) &&
                    !userLoggedInfo.idPeople && !emailUserLog &&
                    <NavLink to={Helpers.Landing} className={style.link}>Volver</NavLink>
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
                {
                    userLoggedInfo.idPeople && userLoggedInfo.typeOfPerson === 'administrator' && location.pathname !== Helpers.Landing && location.pathname !== Helpers.AccessAccount &&
                    <div>
                        <NavLink to={Helpers.AdminStatistics} className={({ isActive }) => isActive ? style.active : style.link}>Estadisticas</NavLink>
                        <NavLink to={Helpers.AdminTables} className={({ isActive }) => isActive ? style.active : style.link}>Tablas</NavLink>
                        <NavLink to={Helpers.AdminUsersView} className={({ isActive }) => isActive ? style.active : style.link}>Usuarios</NavLink>
                        <NavLink to={Helpers.AdminReports} className={({ isActive }) => isActive ? style.active : style.link}>Reportes</NavLink>
                        <button className={style.link} onClick={() => handleLogOut()}>Cerrar Sesión</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar