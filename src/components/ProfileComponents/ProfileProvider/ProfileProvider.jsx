import { useSelector } from "react-redux";
import { useState } from "react";
import style from './ProfileProvider.module.sass';
import Form from "../../Form/FormProfileProvider/Form"
import defaultImage from '../../../assets/LandingImages/PerfilImage.png';

function ProfileProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const formData = {
    fullName: infoUserLog.fullName || "5",
    age: infoUserLog.age || "",
    address: infoUserLog.address || "Libertad 234",
    state: infoUserLog.state || "",
    country: infoUserLog.country || "Argentina",
    profesion: infoUserLog.profesion || "Enfermero",
    aboutMe: infoUserLog.aboutMe || "",
    phone: infoUserLog.phone || "02918145869",
    email: infoUserLog.email || "",
    averageRating: infoUserLog.averageRating || "",
    countRating: infoUserLog.countRating.toString() || "",
  };

  const isAllInfoFilled = Object.values(formData).every(
    (value) => value.length > 0
  );

  const Verification = isAllInfoFilled

  const [showForm, setShowForm] = useState(false)

  const handleClikForm = () => {
    setShowForm(!showForm)
  }

  
  return (

    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style.alertWrapper}>
          {
            !Verification /* && isProvider */ &&
            <div className={style.verificationAlert}>
              <p className={style.textAlert}>Completa tu perfil para poder verificar tu cuenta. Ten en cuenta que los perfiles no verificados no son mostrados a los clientes.</p>
            </div>
          }
        </div>
        <div className={style.perfilWrapper}>
          <div className={style.imageWrapper}>
            <div className={formData.state === 'Active' ? style.stateActive : style.stateInactive}>{formData.state}</div>
            <img className={style.image} src={defaultImage} alt="Imagen"/>
            <div className={style.valoration}>
              <div className={style.starIcon}></div>
              <p className={style.textStar}>{formData.averageRating} ({formData.countRating})</p>
            </div>
          </div>
          <div className={style.infoWrapper}>
            <div className={style.nameWrapper}>
              <p className={style.textName}>{formData.fullName}</p>
              <div className={Verification ? style.iconVerified : style.iconNotVerified}></div>
              {
                Verification ? <p className={style.textVerified}>Cuenta Verificada</p> : <p className={style.textNotVerified}>Cuenta No Verificada</p>
              }
              <button onClick={()=>handleClikForm()} className={style.editButton}></button>
            </div>
            <p className={style.textData}>{formData.age} años |</p>
            <p className={style.textOcupation}>{formData.profesion}</p>
            <p className={style.textDetail}>{formData.aboutMe}</p>
            <div className={style.contacts}>
              <p className={style.textContact}>Contactos: </p>
              <div className={style.iconEmail}></div>
              { /* isProvider && */ <p className={style.textEmail}>{formData.email}</p> }
              <div className={style.iconPhone}></div>
              { /* isProvider && */ <p className={style.textPhone}>{formData.phone}</p> }
            </div>
          </div>
        </div>
      </div>
      { showForm &&  <Form handleClickForm={handleClikForm} /> }
    </div>

  );
}
export default ProfileProvider;
