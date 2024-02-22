import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./Calification.module.sass"; // Asegúrate de importar el archivo de estilos
import StarIcon from "../../../../assets/Icons/IconStar.png";
import Swal from "sweetalert2";

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
          promedio: (Number(serviciosMasBuscados.ratingPromedio)).toFixed(2),
          cantidadEvaluaciones: serviciosMasBuscados.cantidadEvaluaciones
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
