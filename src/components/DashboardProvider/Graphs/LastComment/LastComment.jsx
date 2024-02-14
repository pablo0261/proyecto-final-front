import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./LastComment.module.sass";

function LastComment() {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [userData, setUserData] = useState({
    idPeople: "",
    state: "Active",
    fullName: "Martin Casas",
    image:
      "https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png",
    rating: "4,7",
    comment: "Excelente servicio prestado",
  });

  useEffect(() => {
    setUserData({
      idPeople: infoUserLog.idPeople || "",
      state: infoUserLog.state || "Active",
      fullName: infoUserLog.fullName || "Martin Casas",
      image:
        infoUserLog.image ||
        "https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png",
      rating: infoUserLog.rating || "4,7    ",
      comment: "Excelente servicio prestado",
    });
  }, [infoUserLog]);

  //! en Link se deberia agregar la logica que le permita contactar al proveedor
  return (
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img className={style.imagen} src={userData.image} alt="Imagen" />
        </div>
        <div className={style.infoContainerLeft}>
          <h2 className={style.name}>{userData.fullName}</h2>
          <h2 className={style.comment}>{userData.comment}</h2>
        </div>
        <div className={style.infoContainerRight}>
          <h2 className={style.infoResponse}>{userData.rating}</h2>
        </div>
      </div>
  );
}

export default LastComment;
