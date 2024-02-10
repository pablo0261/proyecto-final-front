import React, { useEffect, useState } from 'react'
import style from './ChatBox.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ChatRender from './ChatRender/ChatRender'
import { putOpportunities } from '../../../redux/actions'

function ChatBox(props) {

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
        if (idOpportunitie.length > 0) {
            setChat()
        }
    }, [idOpportunitie])

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
                        setMessage({ ...message, message: "" })
                    }
                })
                .catch((reason) => window.alert(reason))
        } else {
            window.alert("Escribe un mensaje")
        }
    }

    const [showForm, setShowForm] = useState(false)
    const [cancelation, setCancelation] = useState({
        idOpportunitie: idOpportunitie,
        idPeople: infoUserLog.idPeople,
        cancelled: true,
        reasonForCancelation: ""
    })

    const handleShowInput = () => {
        setShowForm(!showForm)
        setCancelation({ ...cancelation, reasonForCancelation: "" })
    }

    const handleChangeStateForm = (event) => {
        setCancelation({ ...cancelation, reasonForCancelation: event.target.value })
    }

    const dispatch = useDispatch()
    const handleChangeState = (event) => {
        event.preventDefault()
        if (!Object.values(cancelation).every((property) => property === "")) {
            dispatch(putOpportunities(cancelation))
        } else {
            window.alert("Debes indicar el porque")
        }
    }

    return (
        <div className={style.background}>
            {
                opportunities.length != 0
                    ? !isLoadingChat && dataChat.length != 0
                        ? <div className={style.chatWrapper}>
                            <div className={style.buttonWrapper}>
                                <div className={style.buttonProcess} onClick={() => handleShowInput()}> Cancelar Contrato </div>
                                {
                                    showForm &&
                                    <form className={style.formCancel} onSubmit={handleChangeState}>
                                        <input
                                            type='text'
                                            name='reasonForCancelation'
                                            value={cancelation.reasonForCancelation}
                                            onChange={handleChangeStateForm}
                                            placeholder='¿Por que quieres cancelar el contrato?'
                                            className={style.inputCancel}
                                        ></input>
                                        <button type='submit' className={style.buttonSubmit}>Confirmar</button>
                                    </form>
                                }
                                {
                                    infoUserLog.typeOfPerson === 'provider' && <div className={style.buttonProcess} onClick={() => handleChangeState()}> Contrato Finalizado </div>
                                }
                            </div>
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
                        <p className={style.loadingChat}>Cargando Chat</p>
                    :
                    <p className={style.loadingChat}>No tienes contactos confirmados</p>
            }
        </div>
    )
}

export default ChatBox