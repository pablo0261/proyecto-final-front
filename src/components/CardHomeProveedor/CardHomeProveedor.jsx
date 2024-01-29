import React from 'react'
import styles from "../CardHomeProveedor/CardHomeProveedor.module.sass"
import defaultImage from '../../assets/image/PerfilImage.png';

function card(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <img src={defaultImage} className={styles.profileImage}></img>
        <div className={styles.ratingWrapper}>
          <div className={styles.iconStar}></div>
          <p className={styles.textRating}>4.5 (15)</p>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.headerWrapper}>
          <p className={styles.textTitle}>{props.user.name}</p>
          <p className={styles.textGrey}>A partir de <span className={styles.textPrice}>US$ 10</span> x Hora</p>
        </div>
        <p className={styles.textGrey}>{props.user.address}</p>
        <p className={styles.textDark}>Enfermera</p>
        <div className={styles.servicesWrapper}>
          <div className={styles.textServices}>Cuidado</div>
          <div className={styles.textServices}>Cuidado + Limpieza</div>
          <div className={styles.textServices}>Cuidado + Cocina</div>
          <div className={styles.textServices}>Cuidado + Limpieza + Cocina</div>
        </div>
      </div>
    </div>
  )
}

export default card