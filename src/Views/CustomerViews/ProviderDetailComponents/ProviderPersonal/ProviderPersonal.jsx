import React from 'react'
import style from './ProviderPersonal.module.sass'

function ProviderPersonal(props) {

    const { infoProvider } = props

    return (
        <div className={style.background}>
            <div className={style.wrapper}>
                <div className={style.perfilWrapper}>
                    <div className={style.imageWrapper}>
                        <div className={infoProvider.logged ? style.stateActive : style.stateInactive}>{infoProvider.logged ? "Conectado" : "Desconectado"}</div>
                        <img className={style.image} src={"https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png" || infoProvider.image} alt="Imagen" />
                        <div className={style.valoration}>
                            <div className={style.starIcon}></div>
                            <p className={style.textStar}>{infoProvider.averageRating} ({infoProvider.countRating})</p>
                        </div>
                    </div>
                    <div className={style.infoWrapper}>
                        <div className={style.nameWrapper}>
                            <p className={style.textName}>{infoProvider.fullName}</p>
                            <div className={style.iconVerified}></div>
                            <p className={style.textVerified}>Cuenta Verificada</p>
                        </div>
                        <p className={style.textData}>{infoProvider.age} años | {infoProvider.address}, {infoProvider.location}, {infoProvider.province}, {infoProvider.country}</p>
                        <p className={style.textOcupation}>{infoProvider.profesion}</p>
                        <p className={style.textDetail}>{infoProvider.aboutMe}</p>
                        <div className={style.contacts}>
                            <p className={style.textContact}>Contactos: </p>
                            { infoProvider.email && <div className={style.iconEmail}></div>}
                            { infoProvider.phone && <div className={style.iconPhone}></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProviderPersonal