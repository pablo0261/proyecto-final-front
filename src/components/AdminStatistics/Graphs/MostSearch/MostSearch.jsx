import { useState, useEffect } from "react";
import style from "./MostSearch.module.sass";
import Swal from "sweetalert2";

function MostSearch() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider`);
        const data = await response.json();
        const serviciosMasBuscados = data.data.serviciosMasBuscados;
        setStatistics(serviciosMasBuscados);
       
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error al obtener los servicios mas buscados.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    };
    fetchEducation();
  }, []);

  return (
    <div className={style.statisticsContainer}>
      {statistics.slice(0, 6).map((item, index) => (
        <div key={index} className={style.statisticsItem}>
          <p className={style.statisticsValue}>{item.cantidad}</p>
          <p className={style.statisticsText}>{item.servicio}</p>
        </div>
      ))}
    </div>
  );
}


export default MostSearch;
