import React from 'react'
import style from './UserPersonal.module.sass'

function UserPersonal(props) {

    const { infoUser } = props

    return (
        <div className={style.background} >
            <div className={style.wrapper}>
                <div className={style.perfilWrapper}>
                    <div className={style.imageWrapper}>
                        <div className={infoUser.logged ? style.stateActive : style.stateInactive}>{infoUser.logged ? "Conectado" : "Desconectado"}</div>
                        <img className={style.image} src={infoUser.image ? infoUser.image : "https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png"} alt="Imagen" />
                        <div className={style.valoration}>
                            {[...Array(Math.floor(Number(infoUser.averageRating)))].map((_, index) => (
                                <div key={index} className={style.starIcon}></div>
                            ))}
                            <p className={style.textStar}>{infoUser.averageRating} ({infoUser.countRating})</p>
                        </div>
                    </div>
                    <div className={style.infoWrapper}>
                        <div className={style.nameWrapper} id='nameWrapper'>
                            <p className={style.textName}>{infoUser.fullName}</p>
                            <div className={style.iconVerified}></div>
                            <p className={style.textVerified}>Cuenta Verificada</p>
                        </div>
                        <p className={style.textData}>{infoUser.age} años | {infoUser.address}, {infoUser.locationName}, {infoUser.provinceName}, {infoUser.country}</p>
                        <p className={style.textOcupation}>{infoUser.profession}</p>
                        <p className={style.textDetail}>{infoUser.aboutMe}</p>
                        <div className={style.contacts}>
                            <p className={style.textContact}>Contactos: </p>
                            {infoUser.email && <div className={style.iconEmail}></div>}
                            {infoUser.phone && <div className={style.iconPhone}></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPersonal