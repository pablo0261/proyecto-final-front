import React, { useEffect, useState } from 'react'
import style from './Connections.module.sass'
import defaultImage from '../../assets/Icons/PerfilImage.png'
import ChatBox from './ChatBox/ChatBox'
import { useDispatch, useSelector } from 'react-redux'
import { getOpportunities } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import Helpers from '../../Helpers/RoutesFront'
import PendingBox from './PendingBox/PendingBox'
import NotChatBox from './NotChatBox/NotChatBox'
import { SET_SELECTED_OPPORTUNITIE } from '../../redux/actions/action-types'
import Swal from 'sweetalert2'

function Connections() {

    const opportunities = useSelector(state => state.opportunities)
    const infoUserLog = useSelector(state => state.infoUserLog)
    const [filter, setFilter] = useState("accepted")
    const dispatch = useDispatch()

    const [isSelected, setIsSelected] = useState("")

    const orderConstruct = (filter) => {
        if (filter === "view") return "dateView"
        if (filter === "pending") return "dateHiring"
        if (filter === "accepted") return "dateAccepted"
        if (filter === "ratingPending") return "dateEndService"
        if (filter === "ratingProviderPending") return "dateEndService"
        if (filter === "ratingCustomerPending") return "dateEndService"
        if (filter === "completed") return "dateEndService"
        if (filter === "cancelled") return "dateCancelled"
    }

    useEffect(() => {
        const opportunitieAxios = async () => {
            try {
                if (infoUserLog.typeOfPerson === 'customer') {
                    const query = `?idCustomer=${infoUserLog.idPeople}${filter && `&state=${filter}`}&idOrder=${orderConstruct(filter)},DESC`
                    await dispatch(getOpportunities(query))
                } else if (infoUserLog.typeOfPerson === "provider") {
                    const query = `?idProvider=${infoUserLog.idPeople}${filter && `&state=${filter}`}&idOrder=${orderConstruct(filter)},DESC`
                    await dispatch(getOpportunities(query))
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

        opportunitieAxios()
    }, [filter])

    const handleSelectedOpportunitie = async (idOpportunitie) => {
        setIsSelected(idOpportunitie)
    }

    const handleFilter = (filter) => {
        setIsSelected("")
        setFilter(filter)
    }

    const navigate = useNavigate()

    const handleNavigate = (opportunitie) => {
        if (infoUserLog.typeOfPerson === 'customer') {
            /* dispatch({
                type: SET_SELECTED_OPPORTUNITIE,
                payload: {
                  idOpportunitie: opportunitie.idOpportunitie
                }
              })
            navigate(Helpers.UserDetail.replace(":id", opportunitie.idProvider)) */
        } else if (infoUserLog.typeOfPerson === 'provider') {
            navigate(Helpers.UserDetail.replace(":id", opportunitie.idCustomer))
        } else {
            Swal.fire({
                title: `Vacio`,
                icon: 'error',
                // showDenyButton: true,
                // denyButtonText: 'Cancelar',
                // confirmButtonText: 'Aceptar',
                // ConfirmButtonColor: "green",
              })
        }
    }

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
        <div className={style.wrapper}>
            <div className={style.filterWrapper}>
                {
                    infoUserLog.typeOfPerson === 'customer' && <button className={filter === "view" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('view')}>Visitados</button>
                }
                <button className={filter === "pending" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('pending')}>Pendientes</button>
                <button className={filter === "accepted" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('accepted')}>Confirmados</button>
                <button className={filter === "ratingPending" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('ratingPending')}>Calificar</button>
                {
                    infoUserLog.typeOfPerson === 'provider'
                        ? <button className={filter === "ratingProviderPending" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('ratingProviderPending')}>Calificar por Mi</button>
                        : <button className={filter === "ratingCustomerPending" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('ratingCustomerPending')}>Calificar por Mi</button>
                }
                <button className={filter === "completed" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('completed')}>Finalizados</button>
                <button className={filter === "cancelled" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('cancelled')}>Cancelados</button>
            </div>
            <div className={style.connectionsWrapper}>
                <div className={style.listWrapper}>
                    {
                        opportunities.length != 0 && opportunities.map((opportunitie) => (
                            <div
                                key={opportunitie.idOpportunitie}
                                className={isSelected === opportunitie.idOpportunitie ? style.userConnectionSelected : style.userConnection}
                                onClick={() => {
                                    if (filter != "view") {
                                        return handleSelectedOpportunitie(opportunitie.idOpportunitie)
                                    }
                                }}>
                                <div className={style.imgContainer}>
                                    <img src={
                                        infoUserLog.typeOfPerson === 'provider' && opportunitie.customer.image ||
                                        infoUserLog.typeOfPerson === 'customer' && opportunitie.provider.image ||
                                        defaultImage
                                    } className={style.img} onClick={() => handleNavigate(opportunitie)}></img>
                                </div>
                                <div className={style.userWrapper}>
                                    <p className={style.textUser}>{infoUserLog.typeOfPerson === 'provider' && opportunitie.customer.fullName || infoUserLog.typeOfPerson === 'customer' && opportunitie.provider.fullName}</p>
                                    <p className={style.textDate}>{
                                        filter === "view" && formatearFecha(opportunitie.dateView) ||
                                        filter === "pending" && formatearFecha(opportunitie.dateHiring) ||
                                        filter === "accepted" && formatearFecha(opportunitie.dateAccepted) ||
                                        filter === "ratingCustomerPending" && formatearFecha(opportunitie.dateRatingCustomer) ||
                                        filter === "ratingProviderPending" && formatearFecha(opportunitie.dateRatingProvider) ||
                                        filter === "completed" && formatearFecha(opportunitie.dateEndService) ||
                                        filter === "cancelled" && formatearFecha(opportunitie.dateCancelled)
                                    }</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    filter === "view" && <div className={style.loadingChat}> Proveedores Visitados </div> ||
                    filter === "pending" && <PendingBox idOpportunitie={isSelected} infoUserLog={infoUserLog} opportunities={opportunities} filter={filter}></PendingBox> ||
                    filter === "accepted" && <ChatBox idOpportunitie={isSelected} infoUserLog={infoUserLog} opportunities={opportunities} filter={filter}></ChatBox> ||
                    <NotChatBox idOpportunitie={isSelected} infoUserLog={infoUserLog} opportunities={opportunities} filter={filter}></NotChatBox>
                }
            </div>
        </div>
    )
}

export default Connections