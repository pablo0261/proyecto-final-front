import React, { useEffect, useState } from 'react'
import style from './ChatBox.module.sass'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import ChatRender from './ChatRender/ChatRender'
import { putOpportunities } from '../../../redux/actions'
import { io } from 'socket.io-client';
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
const socket = io(REACT_APP_API_URL);
import Swal from 'sweetalert2'

function ChatBox(props) {

    const { idOpportunitie, infoUserLog, opportunities, filter } = props
    const [dataChat, setDataChat] = useState([])
    const [isLoadingChat, setIsLoadingChat] = useState()
    const [message, setMessage] = useState({
        idOpportunitie: idOpportunitie,
        idPeople: infoUserLog.idPeople,
        message: ""
    })

    const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL

    const setChat = async () => {
        try {
            setIsLoadingChat(true)
            const response = await axios.get(`${REACT_APP_API_URL}/chats?idOpportunitie=${idOpportunitie}&idPeople=${infoUserLog.idPeople}`)
            if (response.status === 200) {
                setDataChat(response.data.data)
                setMessage({ ...message, idOpportunitie: idOpportunitie })
                setIsLoadingChat(false)
            }
        } catch (error) {
            Swal.fire({
                title: `${error}`,
                icon: 'error',
                // showDenyButton: true,
                // denyButtonText: 'Cancelar',
                // confirmButtonText: 'Aceptar',
                // ConfirmButtonColor: "green",
              })
        }
    }

    useEffect(() => {
        if (idOpportunitie.length > 0) {
            setChat()
        } else {
            setDataChat([])
        }
    }, [idOpportunitie])

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
                        const opp = opportunities.filter((opp) => opp.idOpportunitie === idOpportunitie)
                        const socketEmit = {
                            idOpportunitie: idOpportunitie,
                            idCustomer: opp[0].idCustomer,
                            idProvider: opp[0].idProvider,
                            idChat: response.data.idChat
                        }
                        socket.emit('send-chat', socketEmit)
                    }
                })
                .catch((error) => {
                    Swal.fire({
                      title: `${error}`,
                      text: 'Ocurrió un error al enviar el mensaje. Por favor, intente nuevamente más tarde.',
                      icon: 'error',
                      confirmButtonText: 'Aceptar'
                    });
                  });
              } else {
                Swal.fire({
                  title: `Error al enviar el Mensaje`,
                  text: `No puedes enviar un mensaje vacío`,
                  icon: 'warning',
                  confirmButtonText: 'Aceptar'
                });
              }
            };
    
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
            if (infoUserLog.typeOfPerson === "customer") {
                dispatch(putOpportunities(cancelation, `?idCustomer=${infoUserLog.idPeople}&state=${filter}&idOrder=dateAccepted,DESC`))
                setDataChat([])
            } else if (infoUserLog.typeOfPerson === "provider") {
                dispatch(putOpportunities(cancelation, `?idProvider=${infoUserLog.idPeople}&state=${filter}&idOrder=dateAccepted,DESC`))
                setDataChat([])
            }
        } else {
            Swal.fire({
                title: `Error`,
                text: "Debes indicar el porque",
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              });
        }
    }

    const handleEndService = () => {
        const today = new Date()
        const endService = {
            idOpportunitie: idOpportunitie,
            idPeople: infoUserLog.idPeople,
            dateEndService: today
        }
        if (infoUserLog.typeOfPerson === "customer") {
            dispatch(putOpportunities(endService, `?idCustomer=${infoUserLog.idPeople}&state=${filter}&idOrder=dateAccepted,DESC`))
            setDataChat([])
        } else if (infoUserLog.typeOfPerson === "provider") {
            dispatch(putOpportunities(endService, `?idProvider=${infoUserLog.idPeople}&state=${filter}&idOrder=dateAccepted,DESC`))
            setDataChat([])
        }
    }

    return (
        <div className={style.background}>
            {
                opportunities.length != 0
                    ? !isLoadingChat && dataChat.length != 0
                        ? <div className={style.chatWrapper}>
                            <div className={style.buttonWrapper}>
                                <div className={style.buttonProcessF} onClick={() => handleShowInput()}> Cancelar Contrato </div>
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
                                    infoUserLog.typeOfPerson === 'provider' && <div className={style.buttonProcessS} onClick={() => handleEndService()}> Servicio Finalizado </div>
                                }
                            </div>
                            <div className={style.msgWrapper}>
                                <ChatRender dataChat={dataChat} idOpportunitie={idOpportunitie} infoUserLog={infoUserLog}></ChatRender>
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
                        <p className={style.loadingChat}>Selecciona una conversación</p>
                    :
                    <p className={style.loadingChat}>No tienes contactos confirmados</p>
            }
        </div>
    )
}

export default ChatBox