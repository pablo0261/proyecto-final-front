import React from 'react'

function SignIn(props) {

    const { isProvider, handleFormsVisibility } = props

    return (
        <div>
            <h1>Crear Cuenta</h1>
            {
                isProvider ? 
                    <form>
                        <input type='text' placeholder='Nombre del Proveedor' />
                    </form>
                    :
                    <form>
                        <input type='text' placeholder='Nombre del Cliente' />
                    </form>
            }
            <button onClick={()=>{handleFormsVisibility()}}>Iniciar Sesión</button>
        </div>
    )
}

export default SignIn