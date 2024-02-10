import React, { useEffect, useState } from 'react'
import style from './Connections.module.sass'
import defaultImage from '../../assets/Icons/PerfilImage.png'
import ChatBox from './ChatBox/ChatBox'
import { useDispatch, useSelector } from 'react-redux'
import { getOpportunities } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import Helpers from '../../Helpers/RoutesFront'
import PendingBox from './PendingBox/PendingBox'

function Connections() {

    const opportunities = useSelector(state => state.opportunities)
    const infoUserLog = useSelector(state => state.infoUserLog)
    const [filter, setFilter] = useState("accepted")
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState()
    const [isSelected, setIsSelected] = useState()

    useEffect(() => {
        const opportunitieAxios = async () => {
            try {
                setIsLoading(true)
                if (infoUserLog.typeOfPerson === 'customer') {
                    const query = `?idCustomer=${infoUserLog.idPeople}${filter ? `&state=${filter}` : ""}`
                    await dispatch(getOpportunities(query))
                } else if (infoUserLog.typeOfPerson === 'provider') {
                    const query = `?idProvider=${infoUserLog.idPeople}${filter ? `&state=${filter}` : ""}`
                    await dispatch(getOpportunities(query))
                }
                setIsLoading(false)
            } catch (error) {
                window.alert(error)
            }
        }

        opportunitieAxios()
    }, [filter])

    const handleSelectedOpportunitie = async (idOpportunitie) => {
        setIsSelected(idOpportunitie)
    }

    const handleFilter = (filter) => {
        setFilter(filter)
    }

    const navigate = useNavigate()

    const handleNavigate = (opportunitie) => {
        if (infoUserLog.typeOfPerson === 'customer') {
            navigate(Helpers.ProviderDetail.replace(":id", opportunitie.idProvider))
        } else if (infoUserLog.typeOfPerson === 'provider') {
            navigate(Helpers.ProviderDetail.replace(":id", opportunitie.idCustomer))
        } else {
            window.alert("Vacio")
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
                <button className={filter === "completed" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('completed')}>Finalizados</button>
                <button className={filter === "ratingPending" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('ratingPending')}>Calificar</button>
                {
                    infoUserLog.typeOfPerson === 'provider'
                        ? <button className={filter === "ratingProviderPending" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('ratingProviderPending')}>Calificar por Mi</button>
                        : <button className={filter === "ratingCustomerPending" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('ratingCustomerPending')}>Calificar por Mi</button>
                }
                <button className={filter === "cancelled" ? style.filterButtonPressed : style.filterButton} onClick={() => handleFilter('cancelled')}>Cancelados</button>
            </div>
            {
                !isLoading
                    ? <div className={style.connectionsWrapper}>
                        <div className={style.listWrapper}>
                            {
                                opportunities.length != 0 && opportunities.map((oportunitie) => (
                                    <div
                                        key={oportunitie.idOpportunitie}
                                        className={isSelected === oportunitie.idOpportunitie ? style.userConnectionSelected : style.userConnection}
                                        onClick={() => {
                                            if (filter != "view") {
                                                return handleSelectedOpportunitie(oportunitie.idOpportunitie)
                                            }
                                        }}>
                                        <img src={defaultImage} className={style.img} onClick={() => handleNavigate(oportunitie)}></img>
                                        <div className={style.userWrapper}>
                                            <p className={style.textUser}>Nombre de Usuario</p>
                                            <p className={style.textDate}>{
                                                filter === "view" && formatearFecha(oportunitie.dateView) ||
                                                filter === "pending" && formatearFecha(oportunitie.dateHiring) ||
                                                filter === "accepted" && formatearFecha(oportunitie.dateAccepted) ||
                                                filter === "ratingCustomerPending" && formatearFecha(oportunitie.dateRatingCustomer) ||
                                                filter === "ratingProviderPending" && formatearFecha(oportunitie.dateRatingProvider) ||
                                                filter === "completed" && formatearFecha(oportunitie.dateEndService) ||
                                                filter === "cancelled" && formatearFecha(oportunitie.dateCancelled)
                                            }</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            filter === "view" && <div className={style.loadingChat}> Proveedores Visitados </div> ||
                            filter === "pending" && <PendingBox idOpportunitie={isSelected} infoUserLog={infoUserLog} opportunities={opportunities}></PendingBox> ||
                            filter === "accepted" && isSelected && <ChatBox idOpportunitie={isSelected} infoUserLog={infoUserLog}></ChatBox> ||
                            filter === "ratingPending" && <div className={style.loadingChat}> Pendientes a Rating </div> ||
                            filter === "ratingCustomerPending" && <div className={style.loadingChat}> Pendientes a Rating Customer </div> ||
                            filter === "ratingProviderPending" && <div className={style.loadingChat}> Pendientes a Rating Provider </div> ||
                            filter === "completed" && <div className={style.loadingChat}> Completed </div> ||
                            filter === "cancelled" && <div className={style.loadingChat}> Cancelled </div> ||
                            <p className={style.loadingChat}>¿Que quieres visualizar?</p>
                        }
                    </div>
                    :
                    <div className={style.connectionsWrapper}>Cargando</div>
            }
        </div>
    )
}

export default Connections