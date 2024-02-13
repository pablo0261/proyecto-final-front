import React, { useEffect, useState } from 'react'
import style from './NotChatBox.module.sass'
import axios from 'axios'
import ChatRender from './ChatRender/ChatRender'

function NotChatBox(props) {

    const { idOpportunitie, infoUserLog, opportunities, filter } = props
    const [dataChat, setDataChat] = useState([])
    const [isLoadingChat, setIsLoadingChat] = useState()

    const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
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

        if (idOpportunitie.length > 0) {
            setChat()
        }
    }, [idOpportunitie])

    return (
        <div className={style.background}>
            {
                opportunities.length != 0
                    ? !isLoadingChat && dataChat.length != 0
                        ? <div className={style.chatWrapper}>
                            <div className={style.msgWrapper}>
                                <ChatRender dataChat={dataChat} infoUserLog={infoUserLog} idOpportunitie={idOpportunitie} filter={filter}></ChatRender>
                            </div>
                        </div>
                        :
                        <p className={style.loadingChat}>Cargando chat</p>
                    :
                    <p className={style.loadingChat}>Sin contenido para mostrar</p>
            }
        </div>
    )
}

export default NotChatBox