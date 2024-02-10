import React, { useEffect } from 'react'
import style from './ChatRender.module.sass'

function ChatRender(props) {

    const { dataChat } = props

    const formatearFecha = (fechaString) => {
        const fecha = new Date(fechaString);

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
                dataChat.map((chat, index) => <div key={index} className={chat.sended ? style.msgBoxOwner : style.msgBoxOther}>
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