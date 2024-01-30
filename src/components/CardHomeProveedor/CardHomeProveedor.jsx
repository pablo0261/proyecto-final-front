import React from 'react'
import styles from "../CardHomeProveedor/CardHomeProveedor.module.sass"
import defaultImage from '../../assets/Icons/PerfilImage.png';

function card(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <img src={defaultImage} className={styles.profileImage}></img>
        <div className={styles.ratingWrapper}>
          <div className={styles.iconStar}></div>
          <p className={styles.textRating}>{props.user.averageRating} ({props.user.countRating})</p>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.headerWrapper}>
          <p className={styles.textTitle}>{props.user.fullName}</p>
          <p className={styles.textGrey}>A partir de <span className={styles.textPrice}>{props.user.categories[0].categories_options[0].people_options[0].price}</span> x Hora</p>
        </div>
        <p className={styles.textGrey}>{props.user.address}</p>
        <p className={styles.textDark}>{props.user.profession}</p>
        <div className={styles.servicesWrapper}>
          {props.user.categories.map((categoria) => (
              <div key={categoria.idCategorie} className={styles.textServices}>
                {categoria.description}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default card