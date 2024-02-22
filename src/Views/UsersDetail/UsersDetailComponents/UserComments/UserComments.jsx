import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './UserComments.module.sass'
import { getCommentsUsers } from '../../../../redux/actions'

function UserComments(props) {

  const { infoUser } = props
  const commentsUserLog = useSelector((state) => state.comments_User)
  const dispatch = useDispatch()

  useEffect(() => {
    const getComments = async () => {
      try {
        const query = `?idPeople=${infoUser.idPeople}`
        await dispatch(getCommentsUsers(query))
      } catch (error) {
        window.alert(error)
      }
    }
    getComments()
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

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.title}>Comentarios sobre este usuario:</p>
        {
          commentsUserLog.length != 0
            ?
            <div className={style.sectionInfo}>
              <div className={style.ratingWrapper}>
                <div className={style.star}></div>
                <p className={style.rating}>{infoUser.averageRating}</p>
                <p className={style.count}>({infoUser.countRating})</p>
                <p className={style.title}>Promedio de puntuación</p>
              </div>
              <div className={style.commentsWrapper}>
                {
                  commentsUserLog.map((comment, index) => (
                    <div key={index} className={style.comment}>
                      <div className={style.imgWrapper}>
                        <img className={style.img} src={comment.imagen} alt="Imagen" />
                      </div>
                      <div className={style.infoWrapper}>
                        <p className={style.name}>{comment.persona}
                        {
                          infoUser.typeOfPerson === 'provider' 
                          ? <span> (Cliente)</span>
                          : <span> (Proveedor)</span>
                        }
                        </p>
                        <p className={style.date}>{formatearFecha(comment.fecha)}</p>
                        <div className={style.starWrapper}>
                          {[...Array(Math.floor(Number(comment.rating)))].map((_, index) => (
                            <div key={index} className={style.starIcon}></div>
                          ))}
                        </div>
                      </div>
                      <div className={style.reviewWrapper}>
                        <p className={style.subTitle}>Servicio solicitado por el cliente:</p>
                        <p className={style.service}>{comment.service}</p>
                        <p className={style.review}>"{comment.review}"</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            :
            <div className={style.sectionInfo}>
              <p className={style.noInfo}>Este usuario no tiene calificaciones</p>
            </div>
        }
      </div>
    </div>
  )
}

export default UserComments