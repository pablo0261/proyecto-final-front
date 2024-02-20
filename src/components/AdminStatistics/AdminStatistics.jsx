import MostSearch from "./Graphs/MostSearch/MostSearch";
import DayFlow from "./Graphs/DayFlow/DayFlow";
import React, { useEffect, useState } from "react";
import loadingHouse from "../../assets/Icons/loadingHouse.gif";
import Barchart from "../../components/AdminStatistics/Graphs/BarChart";
import ValoresGenerales from "./Graphs/ValoresGenerales/ValoresGenerales";


import style from "./AdminStatistics.module.sass";

function AdminStatistics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 5000);

    return () => clearTimeout(timer); 
  }, []); 

  return (
        <div className={style.background}>
        {loading && (
          <div className={style.loading}>
            <img className={style.loadingIcon} src={loadingHouse} alt="Loading..." />
          </div>
        )}
          <div className={style.dashboardWrapper}>
            {/* SERVICIOS MAS BUSCADOS */}
            <div className={style.container}>
              <p className={style.mostSearch}>Servicios mas buscados</p>
              <MostSearch />
            </div>
            {/* NUMEROS  */}
            <div className={style.container}>
              <ValoresGenerales />
            </div>

            <div className={style.containerG}>
              <h2 className={style.h2HistoriaServ}>Usuarios Activos</h2>
              <div>
                <Barchart />
              </div>
            </div>
            {/* GRAFICO 2  */}
            <div className={style.containerG}>
              <h2 className={style.h2HistoriaServ}>Grafico 2</h2>
              {/* Aqui va el componente del Grafico 2 */}
            </div>
          </div>

        </div>
  );
}

export default AdminStatistics;
