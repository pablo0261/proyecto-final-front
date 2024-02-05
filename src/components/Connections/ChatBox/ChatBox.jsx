import React, { useEffect, useState } from 'react'
import style from './ChatBox.module.sass'
import { useDispatch, useSelector } from 'react-redux'

function ChatBox() {

    const dipatch = useDispatch()

    /* useEffect(()=>{
        dipatch()
    },[]) */

    const dataChatGlobal = useSelector(state => state.data_Chat)
    const [message, setMessage] = useState("")

    const handleChangeMessage = (event) => {
        setMessage(event.target.value)
    }

    const handleSendChat = (event) => {
        event.preventDefault()

        ([...dataChat, {
            idPeople: 1,
            propio: true,
            message: message,
            date: "Hoy"
        }])
    }

    return (
        <div className={style.background}>
            {
                dataChatGlobal.length != 0
                    ? <div className={style.chatWrapper}>
                        <div className={style.msgWrapper}>
                            {
                                dataChatGlobal.map((chat) => <div key={chat.idPeople} className={chat.propio ? style.msgBoxOwner : style.msgBoxOther}>
                                    <p className={style.msg}>{chat.message}</p>
                                    <p className={style.msgDate}>{chat.date}</p>
                                </div>)

                            }
                        </div>
                        <div className={style.inputWrapper}>
                            <form onSubmit={handleSendChat} className={style.formChat}>
                                <input
                                    type='text'
                                    name='chat'
                                    value={message}
                                    placeholder='Escribe un mensaje'
                                    onChange={handleChangeMessage} 
                                    className={style.inputChat}/>
                                <button type='submit' className={style.buttonChat}>Enviar</button>
                            </form>
                        </div>
                    </div>
                    :
                    <p className={style.msg}>Selecciona tu proveedor para mostrar los mensajes</p>
            }
        </div>
    )
}

export default ChatBox