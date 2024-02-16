import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./Calification.module.sass"; // Asegúrate de importar el archivo de estilos
import StarIcon from "../../../../assets/Icons/IconStar.png";

function Calification() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLog = useSelector((state) => state.infoUserLog);
  const [statistics, setStatistics] = useState({
    promedio: 0,
    cantidadEvaluaciones: 0,
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider?idPeople=${userLog.idPeople}`);
        const data = await response.json();
        const serviciosMasBuscados = data.data.indicadoresPersonales;
        setStatistics({
          promedio: Number(Math.floor(serviciosMasBuscados.ratingPromedio)),
          cantidadEvaluaciones: serviciosMasBuscados.cantidadEvaluaciones
        });
      } catch (error) {
        console.error("Error al obtener las cantidades de visitas al perfil:", error);
      }
    };
    fetchEducation();
  }, []);

  const renderStars = () => {
    const starsArray = [];
    const numStars = Math.floor(statistics.promedio); 
    for (let i = 0; i < numStars; i++) {
      starsArray.push(<img key={i} src={StarIcon} alt="star" />);
    }
    return starsArray;
  };

  return (
    <div className={style.statisticsContainer}>
      <div className={style.prom}> {statistics.promedio}</div>
      <div className={style.stars}>{renderStars()}</div>
      <div className={style.count}> ({statistics.cantidadEvaluaciones})</div>
    </div>
  );
}

export default Calification;
