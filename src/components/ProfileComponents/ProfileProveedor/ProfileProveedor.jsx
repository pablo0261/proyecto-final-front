import { useSelector } from "react-redux";
import "./ProfileProveedor.style.css";

function ProfileProveedor() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  //*AQUI LO QUE RECIBIRIA DEL BACK
  const imageId = infoUserLog.image || "";
  const valoracion = infoUserLog.valoration || "";
  const age = infoUserLog.age || "";
  const address = infoUserLog.address || "";
  const idLocation = infoUserLog.idLocation || null;
  const state = infoUserLog.state || "";
  const area = infoUserLog.area || "";
  const country = infoUserLog.country || "";
  const profesion = infoUserLog.profesion || "";
  const aboutMe = infoUserLog.aboutMe || "";
  const phone = infoUserLog.phone || "";

  const isAllInfoFilled =
    imageId.length !== 0 &&
    valoracion.length !== 0 &&
    age.length !== 0 &&
    address.length !== 0 &&
    idLocation !== null &&
    area.length !== 0 &&
    state.length !== 0 &&
    aboutMe.length !== 0 &&
    country.length !== 0 &&
    phone.length !== 0;

  const Verification = isAllInfoFilled;

  return (
    <div className="container">
      <div className={Verification ? "verified" : "not-verified"}>
        {Verification ? "Cuenta Verificada" : "Cuenta no Verificada"}
      </div>
      <div className="profile-container">
        <div className="profile-info">
          <img className="image" src={imageId} alt="Imagen" />
          <img src="Estrella" alt="Estrella" />
          <p>{valoracion}</p>
          <p>{state}</p>
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
            <p className="user-info">{`Edad: ${age}`}</p>
            <p className="user-info">{`Dirección: ${address} ${area} ${country}`}</p>
          </div>
          <div className="profession-details">
            <h3>{profesion}</h3>
            <p>{aboutMe}</p>
            <div className="contact-section">
              <p>Contactos :</p>
              <img src={phone} alt="Teléfono" />
              <img src={"sobre"} alt="Sobre" />
            </div>
          </div>
        </div>
        <img src="editImage" alt="edit" className="edit-button" />
      </div>
    </div>
  );
}
export default ProfileProveedor;
