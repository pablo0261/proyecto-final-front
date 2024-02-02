import { useSelector } from "react-redux";
import { useState } from "react";
import style from './ProfileProvider.module.sass';
import Form from "../../Form/FormProfileProvider/Form"
import defaultImage from '../../../assets/Icons/PerfilImage.png';

function ProfileProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const formData = {
    fullName: infoUserLog.fullName || "Diego Lepore",
    age: infoUserLog.age || "43",
    address: infoUserLog.address || "Emilio Rosas 3057",
    state: infoUserLog.state || "Activo",
    country: infoUserLog.country || "Argentina",
    profesion: infoUserLog.profession || "Enfermero",
    aboutMe: infoUserLog.aboutMe || "Predispuesto y Dedicado",
    phone: infoUserLog.phone || "02918145869",
    email: infoUserLog.email || "diegolepore@gmail.com",
    averageRating: infoUserLog.averageRating || "4.9",
    countRating: infoUserLog.countRating.toString() || "127",
  };

  const isAllInfoFilled = Object.values(formData).every(
    (value) => value.length > 0
  );

  const Verification = isAllInfoFilled

  const [showForm, setShowForm] = useState(false)

  const handleShowForm = () => {
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
            <img className={style.image} src={defaultImage} alt="Imagen" />
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
              <button onClick={() => handleShowForm()} className={style.editButton}></button>
            </div>
            <p className={style.textData}>{formData.age} años |</p>
            <p className={style.textOcupation}>{formData.profesion}</p>
            <p className={style.textDetail}>{formData.aboutMe}</p>
            <div className={style.contacts}>
              <p className={style.textContact}>Contactos: </p>
              <div className={style.iconEmail}></div>
              { /* isProvider && */ <p className={style.textEmail}>{formData.email}</p>}
              <div className={style.iconPhone}></div>
              { /* isProvider && */ <p className={style.textPhone}>{formData.phone}</p>}
            </div>
          </div>
        </div>
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>

  );
}
export default ProfileProvider;
