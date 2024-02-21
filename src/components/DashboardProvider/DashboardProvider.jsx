import React, { useState, useEffect } from "react";
import PieChart from "./Graphs/PieChart";
import BarChart from "./Graphs/BarChart";
import MostSearch from "./Graphs/MostSearch/MostSearch";
import PeopleVisit from "./Graphs/PeopleVisit/PeopleVisit";
import Calification from "./Graphs/Calification/Calification";
import LastComment from "./Graphs/LastComment/LastComment";
import loadingHouse from "../../assets/Icons/loadingHouse.gif";
import style from "./DashboardProvider.module.sass";

function Dashboard() {
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
        <div className={style.containerLeft}>
          <p className={style.title}>Mas buscados</p>
          <div className={style.divMasBuscados}>
            <div className={style.cardMasBuscados}>
              <MostSearch />
            </div>
          </div>
          <div className={style.divPersonasQueTeBuscaron}>
            <PeopleVisit />
          </div>
          <div className={style.divHistorialpagos}>
            <div>
              <BarChart />
            </div>
          </div>
        </div>

        <div className={style.containerRight}>
          <p className={style.title}>Calificación</p>
          <div className={style.divPromedioDeCalific}>
            <Calification />
          </div>
          <p className={style.title}>Ultimo Comentario recibido</p>
          <div className={style.divUltimoComent}>
            <LastComment />
          </div>
          <div className={style.divHitorialServicios}>
            <div>
              <PieChart />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
