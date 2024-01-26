import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
import "./ProfileProvider.style.css";

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
    (value) => value.length !== 0
  );

  const Verification = isAllInfoFilled;

  return (
    <div className="container">
      <div className={Verification ? "verified" : "not-verified"}>
        {Verification ? "Cuenta Verificada" : "Cuenta no Verificada"}
      </div>
      <div className="profile-container">
        <div className="profile-info">
          <img className="image" src={formData.imageId} alt="Imagen" />
          <img src="Estrella" alt="Estrella" />
          <p>{formData.valoracion}</p>
          <p>{formData.state}</p>
        </div>
        <div>
          <div className="user-details">
            <div className="user-header">
              <h2 className="name">Claudia</h2>
              <img src="ImagenVerificado" alt="Imagen Verificado" />
              <p>
                {Verification ? "Cuenta Verificada" : "Cuenta no Verificada"}
              </p>
            </div>
            <p className="user-info">{`Edad: ${formData.age}`}</p>
            <p className="user-info">{`Dirección: ${formData.address} ${formData.area} ${formData.country}`}</p>
          </div>
          <div className="profession-details">
            <h3>{formData.profesion}</h3>
            <p>{formData.aboutMe}</p>
            <div className="contact-section">
              <p>Contactos :</p>
              <img src={formData.phone} alt="Teléfono" />
              <img src={"ruta/a/la/imagen/sobre.png"} alt="Sobre" />
            </div>
          </div>
        </div>
        <Link to={{ pathname: `/form/${1}`}}>
          <button    src="editImage" alt="edit" className="edit-button">
            {" "}
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ProfileProvider;
