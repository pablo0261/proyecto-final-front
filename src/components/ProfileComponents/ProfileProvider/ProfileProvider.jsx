import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import style from "./ProfileProvider.module.sass";
import Form from "../../Form/FormProfileProvider/Form";
import profileImage from "../../../assets/Icons/PerfilImage.png";
import UploadWidget from "../../CloudinaryWidget/UploadWidget";
import {putUserData} from "../../../redux/actions/index";

function ProfileProvider() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const [userData, setUserData] = useState({
    idPeople: infoUserLog.idPeople || "",
    fullName: infoUserLog.fullName || "",
    age: infoUserLog.age || "",
    address: infoUserLog.address || "",
    location: infoUserLog.locationName || "",
    province: infoUserLog.provinceName || "",
    state: infoUserLog.state || "Active",
    country: infoUserLog.country || "",
    profession: infoUserLog.profession || "",
    aboutMe: infoUserLog.aboutMe || "",
    phone: infoUserLog.phone || "",
    email: infoUserLog.email || "",
    averageRating: infoUserLog.averageRating || "5",
    countRating: infoUserLog.countRating?.toString() || "",
    image: infoUserLog.image || profileImage,
  });
  const [showForm, setShowForm] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [status, setStatus] = useState(userData.state); // Seteo el estado inicial con el estado del usuario

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleChangeStatus = async () => {
    try {
      const newStatus = userData.state === 'Inactive' ? 'Active' : 'Inactive';
      setUserData(prevUserData => ({ ...prevUserData, state: newStatus }));
      await dispatch(putUserData({ state: newStatus, idPeople: infoUserLog.idPeople }));
    } catch (error) {
      console.error("Error al obtener el estado:", error);
    }
  };
  console.log("infoUserLog.state", infoUserLog.state)

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      image: publicId || prevUserData.image,
    }));
  }, [publicId]);

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style.alertWrapper}>
          {!infoUserLog && (
            <div className={style.verificationAlert}>
              <p className={style.textAlert}>
                Completa tu perfil para poder verificar tu cuenta. Ten en cuenta
                que los perfiles no verificados no son mostrados a los clientes.
              </p>
            </div>
          )}
        </div>
        <div className={style.perfilWrapper}>
          <div className={style.imageWrapper}>
            <button
              name="statusButton"
              type="button"
              value={userData.state}
              onClick={handleChangeStatus}
              className={
                userData.state === "Active"
                  ? style.stateActive
                  : userData.state === "Inactive"
                  ? style.stateInactive
                  : userData.state === "Suspended"
                  ? style.stateSuspended
                  : style.stateUnverified
              }
              disabled={userData.state === "Suspended"}
              style={userData.state === "Unverified" ? { display: "none" } : {}}
            >
              {userData.state}
            </button>
            <img
              className={style.image}
              src={publicId || userData.image}
              alt="Imagen"
            />

            <UploadWidget setPublicId={setPublicId} user={userData.idPeople} />
            <div className={style.valoration}>
            {typeof userData.averageRating === 'number' && ![...Array(Math.floor(userData.averageRating))].map((_, index) => (
  <div key={index} className={style.starIcon}></div>
))}
              <p className={style.textStar}></p>
              <p className={style.rating}>
                {userData.averageRating} ({userData.countRating})
              </p>
            </div>
          </div>
          <div className={style.infoWrapper}>
            <div className={style.nameWrapper}>
              <p className={style.textName}>{userData.fullName}</p>
              <div
                className={
                  userData.state === "Unverified" 
                    ? style.iconNotVerified
                    : style.iconVerified
                }
              ></div>
              {userData.state === "Unverified" ? (
                <p className={style.textNotVerified}>Cuenta No Verificada</p>
                ) : (
                  <p className={style.textVerified}>Cuenta Verificada</p>
              )}
              <button
                onClick={() => handleShowForm()}
                className={style.editButton}
              ></button>
            </div>
            <p className={style.textData}>
              {userData.age} años | {userData.address}, {userData.location},{" "}
              {userData.province}, {userData.country}
            </p>
            <p className={style.textOcupation}>{userData.profession}</p>
            <p className={style.textDetail}>{userData.aboutMe}</p>
            <div className={style.contacts}>
              <p className={style.textContact}>Contactos: </p>
              <div className={style.iconEmail}></div>
              <p className={style.textEmail}>{userData.email}</p>
              <div className={style.iconPhone}></div>
              <p className={style.textPhone}>{userData.phone}</p>
            </div>
          </div>
        </div>
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default ProfileProvider;
