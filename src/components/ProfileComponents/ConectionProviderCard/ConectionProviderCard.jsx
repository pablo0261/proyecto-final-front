import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./ConectionProvider.module.sass";

function ConectionProviderCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [userData, setUserData] = useState({
    idPeople: "",
    state: "Active",
    fullName: "Diego Lepore",
    image:
      "https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png",
    timeOfResponse: "4",
  });

  useEffect(() => {
    setUserData({
      idPeople: infoUserLog.idPeople || "",
      state: infoUserLog.state || "Active",
      fullName: infoUserLog.fullName || "Diego Lepore",
      image:
        infoUserLog.image ||
        "https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png",
      timeOfResponse: infoUserLog.timeOfResponse || "4",
    });
  }, [infoUserLog]);


  //! en Link se deberia agregar la logica que le permita contactar al proveedor
  return (
    <Link to="" className={style.container}>
    <div className={style.container}>
      <div className={style.imageContainer}>
        <img className={style.imagen} src={userData.image} alt="Imagen" />
      </div>
      <div className={style.infoContainer}>
        <h2 className={style.name}>Conecta con {userData.fullName}</h2>
        <div
          className={
            userData.state === "Active"
              ? style.stateActive
              : style.stateInactive
          }
        >
          {userData.state}
        </div>
        <p className={style.infoResponse}>Responde aprox. en: {userData.timeOfResponse} hs.</p>
      </div>
    </div>
    </Link>
  );
}

export default ConectionProviderCard;
