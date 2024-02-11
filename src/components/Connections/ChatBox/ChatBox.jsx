import React, { useEffect, useState } from 'react'
import style from './ChatBox.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ChatRender from './ChatRender/ChatRender'

function ChatBox(props) {

    const { idOpportunitie, infoUserLog } = props
    const [dataChat, setDataChat] = useState([])
    const [isLoadingChat, setIsLoadingChat] = useState()
   
    const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL

    useEffect(()=>{
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

        setChat()
    },[idOpportunitie])

    const [message, setMessage] = useState({
        idOpportunitie: idOpportunitie,
        idPeople: infoUserLog.idPeople,
        message: ""
    })

    const handleChangeMessage = (event) => {
        setMessage({ ...message, message: event.target.value })
    }

    const handleSendChat = (event) => {
        event.preventDefault()
        if (!Object.values(message).some((msg) => msg === "")) {
            axios.post(`${REACT_APP_API_URL}/chats`, message)
                .then((response) => {
                    if (response.status === 200) {
                        setMessage({...message, message: ""})
                    }
                })
                .catch((reason) => window.alert(reason))
        } else {
            window.alert("Escribe un mensaje")
        }
    }

    return (
        <div className={style.background}>
            {
                !isLoadingChat && dataChat.length != 0
                    ? <div className={style.chatWrapper}>
                        <div className={style.msgWrapper}>
                            <ChatRender dataChat={dataChat}></ChatRender>
                        </div>
                        <div className={style.inputWrapper}>
                            <form onSubmit={handleSendChat} className={style.formChat}>
                                <input
                                    type='text'
                                    name='chat'
                                    value={message.message}
                                    placeholder='Escribe un mensaje'
                                    onChange={handleChangeMessage}
                                    className={style.inputChat} />
                                <button type='submit' className={style.buttonChat}>Enviar</button>
                            </form>
                        </div>
                    </div>
                    :
                    <p className={style.loadingChat}>Cargando chat</p>
            }
        </div>
    )
}

export default ChatBox