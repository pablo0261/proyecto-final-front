import React from 'react';
import styles from "../CardHomeProveedor/CardHomeProveedor.module.sass";
import defaultImage from '../../assets/Icons/PerfilImage.png';

function Card(props) {
  // console.log(props)
  // console.log(props.user.categories[0]?.categories_options);
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <img src={defaultImage} className={styles.profileImage} alt="Profile"></img>
        <div className={styles.ratingWrapper}>
          <div className={styles.iconStar}></div>
          <p className={styles.textRating}>{props.user.averageRating} ({props.user.countRating})</p>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.headerWrapper}>
          <p className={styles.textTitle}>{props.user.fullName}</p>
          <p className={styles.textGrey}>A partir de <span className={styles.textPrice}>{props.user.categories.length > 0 ? props.user.categories[0].categories_options[0]?.people_options[0]?.price : "10" }</span> x Hora</p>
        </div>
        <p className={styles.textGrey}>{props.user.address}</p>
        <p className={styles.textDark}>{props.user.profession}</p>
        <div className={styles.servicesWrapper}>
          {props.user.categories[0]?.categories_options && props.user.categories[0].categories_options.length !== 0 ? props.user.categories[0].categories_options.map((option) => (
                <div key={`${option.idCategoryOption}-${option.description}`}
                className={styles.textServices}>
                  {option.description}
                </div>)): "No hay Servicios"}
        </div>
      </div>
    </div>
  );
}

export default Card;
