import { useState, useEffect } from "react";
import style from "./StatsAccessAccountClient.module.sass";
import Loading from "../../../../assets/Icons/loadingHouse.gif";

function StatsAccesAccount() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(true);
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
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  return (
    <div className={style.statisticsContainer}>
      {loading ? (
        <img src={Loading} alt="Loading.." />
      ) : (
        <>
          <div className={style.prom}>
            {" "}
            Más de{" "}
            <span className={style.number1}>
              {statistics.serviciosOfrecidos}
            </span>{" "}
            servicios ofrecidos.
          </div>
          <div className={style.count}>
            {" "}
            <span className={style.number2}>
              {statistics.porcentajeConexiones}
            </span>{" "}
            de los clientes encuentran el servicio que necesitan.
          </div>
        </>
      )}
    </div>
  );
}

export default StatsAccesAccount;
