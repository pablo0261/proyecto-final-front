import React from 'react';
import styles from "../CardHomeProveedor/CardHomeProveedor.module.sass";
import defaultImage from '../../assets/Icons/PerfilImage.png';
import { useNavigate } from 'react-router-dom';
import Helpers from '../../Helpers/RoutesFront';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SELECTED_OPPORTUNITIE } from '../../redux/actions/action-types';

function Card(props) {

  const { idPeople } = useSelector(state => state.infoUserLog)
  const navigate = useNavigate()
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch()

  const handleNavigate = () => {
    const newOportunitie = {
      idProvider: props.user.idPeople,
      idCustomer: idPeople
    }
    axios.post(`${REACT_APP_API_URL}/opportunities`, newOportunitie)
      .then((response) => {
        console.log(response)
        if (response.status === 201 || response.status === 200) {
          dispatch({
            type: SET_SELECTED_OPPORTUNITIE,
            payload: {
              idOpportunitie: response.data.idOpportunitie
            }
          })
          navigate(Helpers.ProviderDetail.replace(":id", props.user.idPeople))
        }
      })
      .catch((reason) => window.alert(reason))
  }

  return (
    <div className={styles.wrapper} onClick={() => handleNavigate()}>
      <div className={styles.profileWrapper}>
        <img src={props.user.image ? props.user.image : defaultImage} className={styles.profileImage} alt="Profile"></img>
        <div className={styles.ratingWrapper}>
          <div className={styles.iconStar}></div>
          <p className={styles.textRating}>{props.user.averageRating} ({props.user.countRating})</p>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.headerWrapper}>
          <p className={styles.textTitle}>{props.user.fullName}</p>
          <p className={styles.textGrey}>A partir de <span className={styles.textPrice}>{props.user.categories.length > 0 ? props.user.categories[0].categories_options[0]?.people_options[0]?.price : "10"}</span> x Hora</p>
        </div>
        <p className={styles.textGrey}>{props.user.address}</p>
        <p className={styles.textDark}>{props.user.profession}</p>
        <div className={styles.servicesWrapper}>
          {props.user.categories[0]?.categories_options && props.user.categories[0].categories_options.length !== 0 ? props.user.categories[0].categories_options.map((option) => (
            <div key={`${option.idCategoryOption}-${option.description}`}
              className={styles.textServices}>
              {option.description}
            </div>)) : "No hay Servicios"}
        </div>
      </div>
    </div>
  );
}

export default Card;
