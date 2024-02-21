import MostSearch from "./Graphs/MostSearch/MostSearch";
import React, { useEffect, useState } from "react";
import loadingHouse from "../../assets/Icons/loadingHouse.gif";
import Barchart from "../../components/AdminStatistics/Graphs/BarChart";
import Piechart from "../../components/AdminStatistics/Graphs/PieChart";
// import Paychart from "./Graphs/Paychart";
// import Servicechart from "./Graphs/Servicechart";
import ValoresGenerales from "./Graphs/ValoresGenerales/ValoresGenerales";

import style from "./AdminStatistics.module.sass";

function AdminStatistics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.background}>
      {loading && (
        <div className={style.loading}>
          <img
            className={style.loadingIcon}
            src={loadingHouse}
            alt="Loading..."
          />
        </div>
      )}
      <div className={style.dashboardWrapper}>
        <div className={style.container}>
          <p className={style.mostSearch}>Servicios mas buscados</p>
          <MostSearch />
        </div>
        <div className={style.containerR}>
          <ValoresGenerales />
        </div>

        <div className={style.containerG}>
          <h2 className={style.h2HistoriaServ}>Usuarios Activos</h2>
          <div >
            <Barchart />
          </div>
        </div>
        <div className={style.containerG}>
          <h2 className={style.h2HistoriaServ}>Servicios Disponibles</h2>
          <div>
            <Piechart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatistics;
