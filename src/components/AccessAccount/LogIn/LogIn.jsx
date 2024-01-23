import React from 'react'

function LogIn(props) {

    const { isProvider, handleFormsVisibility } = props
    
    return (
    <div>
        <h1>Iniciar Sesión</h1>
            {
                isProvider ? 
                    <form>
                        <input type='text' placeholder='Nombre del Proveedor'></input>
                    </form>
                :
                    <form>
                        <input type='text' placeholder='Nombre del Cliente'></input>
                    </form>
            }
        <button onClick={()=>{handleFormsVisibility()}}>Registrarse</button>
    </div>
  )
}

export default LogIn