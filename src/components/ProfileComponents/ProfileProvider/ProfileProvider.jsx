import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from './ProfileProvider.module.sass';

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

  const Verification = isAllInfoFilled;

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        {
          Verification /* && isProvider */ &&
          <div className={style.verificationAlert}>
            <p className={style.textAlert}>Completa tu perfil para poder verificar tu cuenta. Ten en cuenta que los perfiles no verificados
              no son mostrados a los clientes.</p>
          </div>
        }
        <div className={style.perfilWrapper}>
          <div className={style.imageWrapper}>
            <div className={formData.state === 'Active' ? style.stateActive : style.stateInactive}>{formData.state}</div>
            <img className={style.image} src={formData.imageId} alt="Imagen" />
            <div className={style.valoration}>
              <div className={style.star}>Star</div>
              <p className={style.imageWrapper}>({formData.valoracion}5)</p>
            </div>
          </div>
          <div>
            <div className="user-details">
              <p className={style.name}>Claudia</p>
              <div className="verificacion">IconoVerificacion</div>
              {
                Verification ? "Cuenta Verificada" : "Cuenta no Verificada"
              }
              <Link to={{ pathname: `/form/${1}` }} className="edit">Editar</Link>
            </div>
            <p className="user-info">{`${formData.age} años | ${formData.address}, ${formData.area}, ${formData.country}`}</p>
            <p>{formData.profesion}</p>
            <p>{formData.aboutMe}</p>
            <div className="contact-section">
              <p>Contactos :</p>
              <div className="telefono">Tel</div>
              <p>{formData.phone}</p>
              <div className="email">Email</div>
              <p>{formData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileProvider;
