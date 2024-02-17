import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from './ProfileProvider.module.sass';
import Form from "../../Form/FormProfileProvider/Form"
import profileImage from "../../../assets/Icons/PerfilImage.png"
import UploadWidget from "../../CloudinaryWidget/UploadWidget";


function ProfileProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const formData = {
    idPeople: infoUserLog.idPeople || '',
    fullName: infoUserLog.fullName || '',
    age: infoUserLog.age || '',
    address: infoUserLog.address || '',
    location: infoUserLog.locationName || '',
    province: infoUserLog.provinceName || '',
    state: infoUserLog.state || '',
    country: infoUserLog.country || '',
    profession: infoUserLog.profession || '',
    aboutMe: infoUserLog.aboutMe || '',
    phone: infoUserLog.phone || '',
    email: infoUserLog.email || '',
    averageRating: infoUserLog.averageRating || '',
    countRating: infoUserLog.countRating?.toString() || '',
    image: infoUserLog.image || profileImage,
  };

  const isAllInfoFilled = Object.values(formData).every(
    (value) => value.length > 0
  );

  const Verification = isAllInfoFilled
  
  const [userData, setUserData] = useState(formData);
  const [showForm, setShowForm] = useState(false)
  const [publicId, setPublicId] = useState(""); 

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      image: publicId || formData.image,
    }));
  }, [publicId]);

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style.alertWrapper}>
          {
            !infoUserLog &&
            <div className={style.verificationAlert}>
              <p className={style.textAlert}>Completa tu perfil para poder verificar tu cuenta. Ten en cuenta que los perfiles no verificados no son mostrados a los clientes.</p>
            </div>
          }
        </div>
        <div className={style.perfilWrapper}>
          <div className={style.imageWrapper}>
            <div className={formData.state === 'Active' ? style.stateActive : style.stateInactive}>{formData.state}</div>
            <img className={style.image} src={publicId || formData.image} alt="Imagen" />
            <UploadWidget setPublicId={setPublicId} user={formData.idPeople}/>
            <div className={style.valoration}>
              {[...Array(Number(formData.averageRating))].map((_, index) => (
                <div key={index} className={style.starIcon}></div>
              ))}
              <p className={style.textStar}></p>
              <p className={style.rating}>{formData.averageRating} ({formData.countRating})</p>
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
            <p className={style.textData}>{formData.age} años | {formData.address}, {formData.location}, {formData.province}, {formData.country}</p>
            <p className={style.textOcupation}>{formData.profession}</p>
            <p className={style.textDetail}>{formData.aboutMe}</p>
            <div className={style.contacts}>
              <p className={style.textContact}>Contactos: </p>
              <div className={style.iconEmail}></div>
              <p className={style.textEmail}>{formData.email}</p>
              <div className={style.iconPhone}></div>
              <p className={style.textPhone}>{formData.phone}</p>
            </div>
          </div>
        </div>
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default ProfileProvider;