import React from 'react';
import styles from "../CardHomeProveedor/CardHomeProveedor.module.sass";
import defaultImage from '../../assets/Icons/PerfilImage.png';
import { useNavigate } from 'react-router-dom';
import Helpers from '../../Helpers/RoutesFront';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SELECTED_OPPORTUNITIE } from '../../redux/actions/action-types';
import Swal from 'sweetalert2';

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
        if (response.status === 201 || response.status === 200) {
          dispatch({
            type: SET_SELECTED_OPPORTUNITIE,
            payload: {
              idOpportunitie: response.data.idOpportunitie
            }
          })
          navigate(Helpers.UserDetail.replace(":id", props.user.idPeople))
        }
      })
      .catch((error) => {
        Swal.fire({
          title: `${error.response.status}`,
          text: 'Para acceder al sistema es necesario realizar el Registro',
          footer: 'Regrese y realice su registro',
          icon: 'warning',
          // showDenyButton: true,
          // denyButtonText: 'Cancelar',
          // confirmButtonText: 'Aceptar',
          // ConfirmButtonColor: "green",
        });
      });
  };

  const handleFindProfession = () => {
    if (props.user.categories && props.user.categories.length != 0) {
      const profession = props.user.categories.find(category => category.idCategorie === 5);
      
      if (profession && profession.categories_options.length != 0) {
        return profession.categories_options[0].description
      } else {
        return ""
      }     
    }
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
          <p className={styles.textGrey}>A partir de <span className={styles.textPrice}>${props.user.minPrice ? props.user.minPrice : ""}</span> x Hora</p>
        </div>
        <p className={styles.textGrey}>{props.user.address}</p>
        <p className={styles.textDark}>{handleFindProfession()}</p>
        <div className={styles.servicesWrapper}>
          {props.user.categories[0]?.categories_options && props.user.categories[0].categories_options.length != 0 ? props.user.categories[0].categories_options.map((option) => (
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
