import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import style from "./ProfileProvider.module.sass";
import Form from "../../Form/FormProfileProvider/Form";
import profileImage from "../../../assets/Icons/PerfilImage.png";
import UploadWidget from "../../CloudinaryWidget/UploadWidget";
import { putUserData } from "../../../redux/actions/index";

function ProfileProvider() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const [showForm, setShowForm] = useState(false);
  const [publicId, setPublicId] = useState("");

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleChangeStatus = (status) => {
    const newStatus = {
      state: status,
      idPeople: infoUserLog.idPeople,
    };
    dispatch(putUserData(newStatus));
  };

  const handleFindProfession = () => {
    if (infoUserLog.categories && infoUserLog.categories.length != 0) {
      const profession = infoUserLog.categories.find(
        (category) => category.idCategorie === 5
      );

      if (profession && profession.categories_options.length != 0) {
        return profession.categories_options[0].description;
      }
    }
  };

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style.alertWrapper}>
          {infoUserLog.state === "Unverified" && (
            <div className={style.verificationAlert}>
              <p className={style.textAlert}>
                Completa tu perfil para poder verificar tu cuenta. Debes tener
                los siguientes campos completos: Información personal, Foto de
                Perfil y Servicios. <br /> Ten en cuenta que los perfiles no
                verificados no son mostrados a los clientes.
              </p>
            </div>
          )}
        </div>
        <div className={style.perfilWrapper}>
          <div className={style.imageWrapper}>
            {infoUserLog.typeOfPerson === "Provider" && (
              <>
                {infoUserLog.state !== "Unverified" ? (
                  infoUserLog.state === "Active" ? (
                    <button
                      type="button"
                      onClick={() => handleChangeStatus("Inactive")}
                      className={style.stateActive}
                    >
                      {infoUserLog.state}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleChangeStatus("Active")}
                      className={style.stateInactive}
                    >
                      {infoUserLog.state}
                    </button>
                  )
                ) : (
                  <></>
                )}
                <div
                  className={
                    infoUserLog.state === "Unverified"
                      ? style.iconNotVerified
                      : style.iconVerified
                  }
                ></div>
                {infoUserLog.state === "Unverified" ? (
                  <p className={style.textNotVerified}>Cuenta No Verificada</p>
                ) : (
                  <p className={style.textVerified}>Cuenta Verificada</p>
                )}
                <button
                  onClick={() => handleShowForm()}
                  className={style.editButton}
                ></button>
              </>
            )}
            <img
              className={style.image}
              src={infoUserLog.image ? infoUserLog.image : profileImage}
              alt="Imagen"
            />
            <UploadWidget
              setPublicId={setPublicId}
              user={infoUserLog.idPeople}
            />
            <div className={style.valoration}>
              {[...Array(Math.floor(Number(infoUserLog.averageRating)))].map(
                (_, index) => (
                  <div key={index} className={style.starIcon}></div>
                )
              )}
              <p className={style.textStar}></p>
              <p className={style.rating}>
                {infoUserLog.averageRating} ({infoUserLog.countRating})
              </p>
            </div>
          </div>

          <div className={style.infoWrapper}>
            <div className={style.nameWrapper}>
              <p className={style.textName}>{infoUserLog.fullName}</p>

              {infoUserLog.typeOfPerson === "Provider" && (
                <div>
                  <div
                    className={
                      infoUserLog.state === "Unverified"
                        ? style.iconNotVerified
                        : style.iconVerified
                    }
                  ></div>
                  {infoUserLog.state === "Unverified" ? (
                    <p className={style.textNotVerified}>
                      Cuenta No Verificada
                    </p>
                  ) : (
                    <p className={style.textVerified}>Cuenta Verificada</p>
                  )}
                </div>
              )}

              <button
                onClick={() => handleShowForm()}
                className={style.editButton}
              ></button>
            </div>

            <p className={style.textData}>
              {infoUserLog.age} años | {infoUserLog.address},{" "}
              {infoUserLog.locationName}, {infoUserLog.provinceName},{" "}
              {infoUserLog.country}
            </p>
            <p className={style.textOcupation}>{handleFindProfession()}</p>
            <p className={style.textDetail}>{infoUserLog.aboutMe}</p>
            <div className={style.contacts}>
              <p className={style.textContact}>Contactos: </p>
              <div className={style.iconEmail}></div>
              <p className={style.textEmail}>{infoUserLog.email}</p>
              <div className={style.iconPhone}></div>
              <p className={style.textPhone}>{infoUserLog.phone}</p>
            </div>
          </div>
        </div>
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default ProfileProvider;
