import React, { useEffect, useState } from 'react'
import style from './PendingBox.module.sass'
import axios from 'axios'
import ChatRender from './ChatRender/ChatRender'

function PendingBox(props) {

    const { idOpportunitie, infoUserLog, opportunities } = props
    const [dataChat, setDataChat] = useState([])
    const [isLoadingChat, setIsLoadingChat] = useState()

    const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL

    const setChat = async () => {
        try {
            setIsLoadingChat(true)
            const response = await axios.get(`${REACT_APP_API_URL}/chats?idOpportunitie=${idOpportunitie}&idPeople=${infoUserLog.idPeople}`)
            if (response.status === 200) {
                setDataChat(response.data.data)
                setIsLoadingChat(false)
            }
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect(() => {
        if (idOpportunitie) {
            setChat()
        }
    }, [idOpportunitie])

    return (
        <div className={style.background}>
            {
                !isLoadingChat && opportunities.length != 0 && dataChat.length != 0
                    ? <div className={style.chatWrapper}>
                        <div className={style.msgWrapper}>
                            <ChatRender></ChatRender>
                        </div>
                        <div className={style.inputWrapper}>
                            {infoUserLog.typeOfPerson === 'customer' && <button type='button' className={style.buttonChat}>Cancelar</button>}
                            {infoUserLog.typeOfPerson === 'provider' && <div className={style.divButtons}>
                                <button type='button' className={style.buttonChat}>Aceptar</button>
                                <button type='button' className={style.buttonChat}>Rechazar</button>
                            </div>
                            }
                        </div>
                    </div>
                    :
                    <p className={style.loadingChat}>Selecciona una solicitud pendiente.<br></br> En caso de no visualizar ninguna lista, no tienes solicitudes pendientes.</p>
            }
        </div>
    )
}

export default PendingBox