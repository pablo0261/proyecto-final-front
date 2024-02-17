import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./LastComment.module.sass";
import profileImage from "../../../../assets/Icons/PerfilImage.png"

function LastComment() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLog = useSelector((state) => state.infoUserLog);
  const [statistics, setStatistics] = useState({
    idPeople: "",
    image: "",
    cliente: "",
    review: "",
    rating: "",
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider?idPeople=${userLog.idPeople}`);
        const data = await response.json();
        console.log("data", data)
        const ultimoComentario = data.data.ultimoComentario;
        setStatistics({
          idPeople: userLog.idPeople || "",
          image: ultimoComentario.rating || profileImage,
          cliente: ultimoComentario.cliente || "",
          review: ultimoComentario.review || "",
          rating: ultimoComentario.rating || "",
        });
      } catch (error) {
        console.error("Error al obtener las cantidades de visitas al perfil:", error);
      }
    };
    fetchEducation();
  }, []);


  return (
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img className={style.imagen} src={statistics.image} alt="Imagen" />
        </div>
        <div className={style.infoContainerLeft}>
          <h2 className={style.client}>{statistics.cliente}</h2>
          <h2 className={style.comment}>{statistics.review}</h2>
        </div>
        <div className={style.infoContainerRight}>
          <h2 className={style.infoRating}>{statistics.rating}</h2>
        </div>
      </div>
  );
}

export default LastComment;
