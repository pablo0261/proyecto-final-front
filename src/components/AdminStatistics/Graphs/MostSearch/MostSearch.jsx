import { useState, useEffect } from "react";
import style from "./MostSearch.module.sass";

function MostSearch() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/landing`);
        const data = await response.json();
        const serviciosMasBuscados = data;
        setStatistics(serviciosMasBuscados);
      } catch (error) {
        console.error("Error al obtener los servicios mas buscados:", error);
      }
    };
    fetchEducation();
  }, []);

  return (
    <div className={style.statisticsContainer}>
      <div className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.providerCount}</p>
      </div>
      <div className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.providerCount}</p>
      </div>
      <div className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.providerCount}</p>
      </div>
      <div className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.providerCount}</p>
      </div>
      <div className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.providerCount}</p>
      </div>
      <div className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.providerCount}</p>
      </div>
    </div>
  );
}

export default MostSearch;
