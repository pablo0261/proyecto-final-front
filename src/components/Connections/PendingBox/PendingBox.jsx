import React, { useEffect, useState } from 'react'
import style from './PendingBox.module.sass'
import axios from 'axios'
import ChatRender from './ChatRender/ChatRender'
import { useDispatch } from 'react-redux'
import { putOpportunities } from '../../../redux/actions'
import Swal  from 'sweetalert2'

function PendingBox(props) {

    const { idOpportunitie, infoUserLog, opportunities, filter } = props
    const [dataChat, setDataChat] = useState([])
    const [isLoadingChat, setIsLoadingChat] = useState()
    const [showForm, setShowForm] = useState(false)
    const [cancelation, setCancelation] = useState({
        idOpportunitie: "",
        idPeople: infoUserLog.idPeople,
        cancelled: true,
        reasonForCancelation: ""
    })

    const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL

    const setChat = async () => {
        try {
            setIsLoadingChat(true)
            const response = await axios.get(`${REACT_APP_API_URL}/chats?idOpportunitie=${idOpportunitie}&idPeople=${infoUserLog.idPeople}`)
            if (response.status === 200) {
                setDataChat(response.data.data)
                setCancelation({ ...cancelation, idOpportunitie: idOpportunitie })
                setIsLoadingChat(false)
            }
        } catch (error) {
            Swal.fire({
                title: `${error}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
        }
    }

    useEffect(() => {
        if (idOpportunitie.length > 0) {
            setChat()
        } else {
            setDataChat([])
        }
    }, [idOpportunitie])

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
                dispatch(putOpportunities(cancelation, `?idCustomer=${infoUserLog.idPeople}&state=${filter}&idOrder=dateHiring,DESC`))
                setDataChat([])
            } else if (infoUserLog.typeOfPerson === "provider") {
                dispatch(putOpportunities(cancelation, `?idProvider=${infoUserLog.idPeople}&state=${filter}&idOrder=dateHiring,DESC`))
                setDataChat([])
            }
        } else {
            Swal.fire({
                title: `Error`,
                text: "Debes indicar el porque",
                icon: 'Warniing',
                confirmButtonText: 'Aceptar'
              });
        }
    }

    const handleAcceptContract = () => {
        const acceptation = {
            idOpportunitie: idOpportunitie,
            idPeople: infoUserLog.idPeople,
            accepted: true
        }
        if (infoUserLog.typeOfPerson === "customer") {
            dispatch(putOpportunities(acceptation, `?idCustomer=${infoUserLog.idPeople}&state=${filter}&idOrder=dateHiring,DESC`))
        } else if (infoUserLog.typeOfPerson === 'provider') {
            dispatch(putOpportunities(acceptation, `?idProvider=${infoUserLog.idPeople}&state=${filter}&idOrder=dateHiring,DESC`))
        }
        
    }

    return (
        <div className={style.background}>
            {
                opportunities.length != 0
                    ?
                    dataChat.length != 0
                        ?
                        !isLoadingChat
                            ?
                            <div className={style.chatWrapper}>
                                <div className={style.msgWrapper}>
                                    <ChatRender dataChat={dataChat}></ChatRender>
                                </div>
                                <div className={style.buttonWrapper}>
                                    {
                                        infoUserLog.typeOfPerson === 'provider' && <button type='button' className={style.buttonProcessS} onClick={() => handleAcceptContract()}>Aceptar Oferta</button>
                                    }
                                    <button type='button' className={style.buttonProcessF} onClick={() => handleShowInput()}> {infoUserLog.typeOfPerson === 'provider' ? "Rechazar Oferta" : "Cancelar Contrato"} </button>
                                    {
                                        showForm &&
                                        <form className={style.formCancel} onSubmit={handleChangeState}>
                                            <input
                                                type='text'
                                                name='reasonForCancelation'
                                                value={cancelation.reasonForCancelation}
                                                onChange={handleChangeStateForm}
                                                placeholder={infoUserLog.typeOfPerson === 'provider' ? "¿Por qué quieres rechazar esta oferta?" : "¿Por qué quieres cancelar este contrato?"}
                                                className={style.inputCancel}
                                            ></input>
                                            <button type='submit' className={style.buttonSubmit}>Confirmar</button>
                                        </form>
                                    }
                                </div>
                            </div>
                            : <p className={style.loadingChat}>Cargando Chat</p>
                        :
                        <p className={style.loadingChat}>Selecciona una conversacion para ampliar el chat</p>
                    :
                    <p className={style.loadingChat}>No tienes contactos pendientes.</p>
            }
        </div>
    )
}

export default PendingBox