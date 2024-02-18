import { useState, useEffect } from "react";
import style from "./StatsAccessAccountClient.module.sass"

function StatsAccesAccount() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [statistics, setStatistics] = useState({
    serviciosOfrecidos: 0,
    porcentajeConexiones: 0,
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/landing`);
        const data = await response.json();
        setStatistics({
          serviciosOfrecidos: data.services,
          porcentajeConexiones: data.successfulConnections,
        })
      } catch (error) {
        console.error("Error al obtener las cantidades de visitas al perfil:", error);
      }
    };
    fetchEducation();
  }, []);

  
  return (
    <div className={style.statisticsContainer}>
      <div className={style.prom}> Más de <span className={style.number1}>{statistics.serviciosOfrecidos}</span> servicios ofrecidos.</div>
      <div className={style.count}> <span className={style.number2}>{statistics.porcentajeConexiones}</span> de los clientes encuentran el servicio que necesitan.</div>
    </div>
  );
}

export default StatsAccesAccount;
