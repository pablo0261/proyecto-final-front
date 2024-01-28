import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from './ProfileProvider.module.sass';
import Helpers from "../../../Helpers/RoutesFront";
import defaultImage from '../../../assets/image/PerfilImage.png';


function ProfileProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  //! OJO ESTO VA A CAMBIAR CUANDO CAMBIE EL OBJETO DEL ESTADO
  const formData = {
    imageId: infoUserLog.image || "",
    valoracion: infoUserLog.valoration || "",
    age: infoUserLog.age || "",
    address: infoUserLog.address || "",
    idLocation: infoUserLog.idLocation || null,
    state: infoUserLog.state || "",
    area: infoUserLog.area || "",
    country: infoUserLog.country || "",
    profesion: infoUserLog.profesion || "",
    aboutMe: infoUserLog.aboutMe || "",
    phone: infoUserLog.phone || "",
  };


  const isAllInfoFilled = Object.values(formData).every(
    (value) => value.length !== 1
  );

  const Verification = isAllInfoFilled
  const component = 1

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style.alertWrapper}>
          {
            !Verification /* && isProvider */ &&
            <div className={style.verificationAlert}>
              <p className={style.textAlert}>Completa tu perfil para poder verificar tu cuenta. Ten en cuenta que los perfiles no verificados
                no son mostrados a los clientes.</p>
            </div>
          }
        </div>
        <div className={style.perfilWrapper}>
          <div className={style.imageWrapper}>
            <div className={formData.state === 'Active' ? style.stateActive : style.stateInactive}>{formData.state}</div>
            <img className={style.image} src={defaultImage} alt="Imagen"/>
            <div className={style.valoration}>
              <div className={style.starIcon}></div>
              <p className={style.textStar}>4.5 (40)</p>
            </div>
          </div>
          <div className={style.infoWrapper}>
            <div className={style.nameWrapper}>
              <p className={style.textName}>Claudia</p>
              <div className={Verification ? style.iconVerified : style.iconNotVerified}></div>
              {
                Verification ? <p className={style.textVerified}>Cuenta Verificada</p> : <p className={style.textNotVerified}>Cuenta No Verificada</p>
              }
              <Link to={Helpers.Form.replace(':component', component)} className={style.editButton}></Link>
            </div>
            <p className={style.textData}>{`${formData.age} años | ${formData.address}, ${formData.area}, ${formData.country}`}</p>
            <p className={style.textOcupation}>{formData.profesion}</p>
            <p className={style.textDetail}>{formData.aboutMe}</p>
            <div className={style.contacts}>
              <p className={style.textContact}>Contactos:</p>
              <div className={style.iconEmail}></div>
              { /* isProvider && */ <p className={style.textEmail}>claudia@email.com</p> }
              <div className={style.iconPhone}></div>
              { /* isProvider && */ <p className={style.textPhone}>+54 380 4 785215</p> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileProvider;
