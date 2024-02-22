import React, { useEffect, useState } from 'react'
import style from './ChatRender.module.sass'
import { io } from 'socket.io-client';
import axios from 'axios';
import Swal from 'sweetalert2';

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
const socket = io(REACT_APP_API_URL);


function ChatRender(props) {

    const { dataChat, idOpportunitie, infoUserLog } = props
    const [dataChatRender, setDataChatRender] = useState(dataChat)
    const [newChatFlag, setNewChatFlag] = useState([])

    const setChat = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/chats?idOpportunitie=${idOpportunitie}&idPeople=${infoUserLog.idPeople}`)
            if (response.status === 200) {
                setDataChatRender(response.data.data)
            }
        } catch (error) {
            Swal.fire({
                title: `${error}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
        }
    }

    socket.on('render-chat', (incommitChat) => {
        if (idOpportunitie === incommitChat.idOpportunitie) {
            setNewChatFlag(incommitChat.idChat)
        }
    })

    useEffect(() => {
        setChat()
    }, [newChatFlag])

    useEffect(()=>{
        const msgWrapper = document.getElementById('msgWrapper')
        msgWrapper.scrollTop = msgWrapper.scrollHeight
    },[dataChatRender])

    const formatearFecha = (fechaString) => {
        const fecha = new Date(fechaString)

        const horas = fecha.getHours().toString().padStart(2, '0')
        const minutos = fecha.getMinutes().toString().padStart(2, '0')
        const dia = fecha.getDate().toString().padStart(2, '0')
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
        const año = fecha.getFullYear()

        return `${horas}:${minutos} - ${dia}/${mes}/${año}`
    }
    
    return (
        <div id='msgWrapper' className={style.msgWrapper}>
            {
                dataChatRender.map((chat, index) => <div key={index} className={chat.sended ? style.msgBoxOwner : style.msgBoxOther}>
                    <p className={style.msg}>{chat.message}</p>
                    <p className={style.msgDate}>{
                        formatearFecha(chat.dateMessage)
                    }</p>
                </div>)
            }
        </div>
    )
}

export default ChatRender