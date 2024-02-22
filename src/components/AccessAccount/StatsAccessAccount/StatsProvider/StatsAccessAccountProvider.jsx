import { useState, useEffect } from "react";
import style from "./StatsAccessAccountProvider.module.sass"
import Swal from "sweetalert2";

function StatsAccesAccount() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [statistics, setStatistics] = useState({
    customerCount: 0,
    porcentajeConexiones: 0,
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/landing`);
        const data = await response.json();
        setStatistics({
            customerCount: data.customerCount,
          porcentajeConexiones: data.successfulConnections,
        })
      } catch (error) {
        Swal.fire({
          title: `${error.response.data.error}!`,
          text: `Error al obtener las cantidades de visitas al perfil`,
          icon: 'warning',
        })
      }
    };
    fetchEducation();
  }, []);

  
  return (
    <div className={style.statisticsContainer}>
    <div className={style.prom}> Más de <span className={style.number1}>{statistics.customerCount}</span> personas buscando servicios.</div>
    <div className={style.count}> El <span className={style.number2}>{statistics.porcentajeConexiones}</span> de las búsquedas logra un contrato exitoso.</div>
  </div>
  );
}

export default StatsAccesAccount;
