import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./LastComment.module.sass";
import profileImage from "../../../../assets/Icons/PerfilImage.png";
import StarIcon from "../../../../assets/Icons/IconStar.png";
import Swal from "sweetalert2";

function LastComment() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLog = useSelector((state) => state.infoUserLog);
  const [statistics, setStatistics] = useState({
    idPeople: "",
    imagen: "" ||  profileImage,
    cliente: "",
    review: "",
    rating: "",
  });
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}/stats/provider?idPeople=${userLog.idPeople}`
          );
          const data = await response.json();
        const ultimoComentario = data.data.ultimoComentario;
        setStatistics({
          idPeople: userLog.idPeople || "",
          imagen:  ultimoComentario.imagen ||  profileImage,
          cliente: ultimoComentario.cliente || "",
          review: ultimoComentario.review || "",
          rating: ultimoComentario.rating || "",
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error al obtener las cantidades de visitas al perfil.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        
      }
    };
    fetchEducation();
  }, []);

  const renderStars = () => {
    const starsArray = [];
    const numStars = Math.floor(statistics.rating);
    for (let i = 0; i < numStars; i++) {
      starsArray.push(<img key={i} src={StarIcon} alt="star" />);
    }
    return starsArray;
  };

  return (
    <div className={style.container}>
      <div className={style.imageContainer}>
        <img className={style.imagen} src={statistics.imagen} alt="Imagen" />
      </div>
      <div className={style.infoContainerLeft}>
        <h2 className={style.client}>{statistics.cliente}</h2>
        <h2 className={style.comment}>{statistics.review}</h2>
      </div>
      <div className={style.infoContainerRight}>
        <h2 className={style.infoRating}>{statistics.rating}</h2>
        <div className={style.stars}>{renderStars()}</div>
      </div>
    </div>
  );
}

export default LastComment;
