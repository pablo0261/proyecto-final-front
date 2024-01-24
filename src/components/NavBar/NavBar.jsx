import React from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom';

function NavBar() {

    const location = useLocation()
    console.log(location)

    let navContent;

    switch (location.pathname) {

        case '/landing':
            navContent = (
                <div>
                    <NavLink to="/#">¿Como Funciona?</NavLink>
                </div>
            )
            break

        case '/accessaccount':
            navContent = (
                <div>
                    <NavLink to="/">Volver</NavLink>
                    <button onClick={localStorage.setItem('isProvider',JSON.stringify(true))}>Soy Proveedor</button>
                    <button onClick={localStorage.setItem('isProvider',JSON.stringify(false))}>Soy Cliente</button>
                </div>
            )
            break

        case '/cliente':
            navContent = (
                <div>
                    <p>Contenido de Cliente</p>
                    <a href="/enlace5">Enlace 5</a>
                    <a href="/enlace6">Enlace 6</a>
                </div>
            )
            break

        case '/proveedor':
            navContent = (
                <div>
                    <p>Contenido de Proveedor</p>
                    <a href="/enlace7">Enlace 7</a>
                    <a href="/enlace8">Enlace 8</a>
                </div>
            )
            break

        case '/administrador':
            navContent = (
                <div>
                    <p>Contenido de Administrador</p>
                    <a href="/enlace9">Enlace 9</a>
                    <a href="/enlace10">Enlace 10</a>
                </div>
            )
            break

        default:
            navContent = <div>Default Content</div>
            break
    }
    // 5 Opciones: Landing / AccessAccount / Cliente / Proveedor / Administrador
    return (
        <div>
            {navContent}
        </div> 
    )
}

export default NavBar