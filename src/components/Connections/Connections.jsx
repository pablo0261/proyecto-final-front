import React, { useState } from 'react'
import style from './Connections.module.sass'
import defaultImage from '../../assets/Icons/PerfilImage.png'
import ChatBox from './ChatBox/ChatBox'
import { useDispatch } from 'react-redux'
import { setDataChat } from '../../redux/actions'

function Connections() {

    /* 
    Guardar en un estado global las oportunidades con un getInstallments.
    Filtrar por la misma action las oportunidades => Guardar en el estado global.
    Subscribir el componente a un estado global para renderizar la lista de oportunidades.
    Renderizar el chat de la primera oportunidad. Pasar por props el id para que pueda renderizar el chat.
    Cuando se selecciona una lista, hacer el pedido de los chats.
    Manejar los estados de los chats de forma local.
    Actualizar cuando haya un cambio en la base de datos. 
    */
    const [filter, setFilter] = useState()
    const [isLoading, setIsLoading] = useState()
    const [isSelected, setIsSelected] = useState()

    //Temporal
    const oportunities = [
        {
            id: 1
        },
        {
            id: 2
        }
    ]

    const dispatch = useDispatch()

    const handleShowChat = (id) => {
        setIsLoading(true)
        //Axios
        setIsSelected(id)
        dispatch(setDataChat(id))
        setIsLoading(false)
    }

    const handleFilter = (filter) => {
        setFilter(filter)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.filterWrapper}>
                <button className={filter === "view" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('view')}>Visitados</button>
                <button className={filter === "pending" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('pending')}>Pendientes</button>
                <button className={filter === "confirmed" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('confirmed')}>Confirmados</button>
                <button className={filter === "toRank" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('toRank')}>A Evaluar</button>
                <button className={filter === "ended" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('ended')}>Finalizados</button>
                <button className={filter === "canceled" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('canceled')}>Cancelados</button>
            </div>
            <div className={style.connectionsWrapper}>
                <div className={style.listWrapper}>
                    {
                        oportunities.map((oportunitie) => (
                            <div key={oportunitie.id} className={isSelected === oportunitie.id ? style.userConnectionSelected : style.userConnection } onClick={() => handleShowChat(oportunitie.id)}>
                                <img src={defaultImage} className={style.img}></img>
                                <div className={style.userWrapper}>
                                    <p className={style.textUser}>Nombre de Usuario</p>
                                    <p className={style.textDate}>12/05/2024</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    isLoading
                        ? <div>Cargando Chat</div>
                        : <ChatBox></ChatBox>
                }

            </div>
        </div>
    )
}

export default Connections