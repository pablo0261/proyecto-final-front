import React, { useEffect, useState } from 'react'
import style from './ChatRender.module.sass'
import { putOpportunities } from '../../../../redux/actions'
import { useDispatch } from 'react-redux'

function ChatRender(props) {

    const { dataChat, infoUserLog, idOpportunitie, filter } = props
    const dispatch = useDispatch()

    useEffect(() => {
        const msgWrapper = document.getElementById('msgWrapper')
        msgWrapper.scrollTop = msgWrapper.scrollHeight
    }, [])

    const formatearFecha = (fechaString) => {
        const fecha = new Date(fechaString)

        const horas = fecha.getHours().toString().padStart(2, '0')
        const minutos = fecha.getMinutes().toString().padStart(2, '0')
        const dia = fecha.getDate().toString().padStart(2, '0')
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
        const año = fecha.getFullYear()

        return `${horas}:${minutos} - ${dia}/${mes}/${año}`
    }

    const [ratingForm, setRatingForm] = useState({
        idOpportunitie: idOpportunitie,
        idPeople: infoUserLog.idPeople,
        typeOfPerson: infoUserLog.typeOfPerson,
        rating: 0,
        review: ""
    })

    const handleRatingChange = (value) => {
        setRatingForm({ ...ratingForm, rating: value })
    }

    const handleReviewChange = (event) => {
        setRatingForm({ ...ratingForm, review: event.target.value })
    }

    const handleSubmitRating = (event) => {
        event.preventDefault()

        if (!Object.values(ratingForm).every((property) => property === "")) {
            if (infoUserLog.typeOfPerson === "customer") {
                dispatch(putOpportunities(ratingForm, `?idCustomer=${infoUserLog.idPeople}&state=${filter}&idOrder=dateEndService,DESC`))
            } else if (infoUserLog.typeOfPerson === "provider") {
                dispatch(putOpportunities(ratingForm, `?idProvider=${infoUserLog.idPeople}&state=${filter}&idOrder=dateEndService,DESC`))
            }

        }
    }

    return (
        <div id='msgWrapper' className={style.msgWrapper}>
            {
                dataChat.map((chat, index) => {
                    return chat.isRating && chat.sended && filter != "completed"
                        ? <div className={style.boxRating}>
                            <p className={style.msg}>{chat.message}</p>
                            <form className={style.formRating} onSubmit={handleSubmitRating}>
                                <div className={style.starBox}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <div
                                            key={star}
                                            className={star <= ratingForm.rating ? style.starSelected : style.star}
                                            onClick={() => handleRatingChange(star)}>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type='text'
                                    name='review'
                                    value={ratingForm.review}
                                    onChange={handleReviewChange}
                                    placeholder='Ingrese un comentario'
                                    className={style.inputRank}
                                />
                                <button type='submit' className={style.btnSubmit}>Enviar</button>
                            </form>
                        </div>
                        : chat.isRating && chat.sended && filter === "completed"
                            ? <div key={index} className={style.endMsg}>
                                Contrato finalizado y calificado con éxito
                            </div>
                            : chat.isRating && !chat.sended
                                ? <></>
                                : <div key={index} className={chat.sended ? style.msgBoxOwner : style.msgBoxOther}>
                                    <p className={style.msg}>{chat.message}</p>
                                    <p className={style.msgDate}>{
                                        formatearFecha(chat.dateMessage)
                                    }</p>
                                </div>
                })
            }
        </div>
    )
}

export default ChatRender