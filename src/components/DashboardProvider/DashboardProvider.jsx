import React from "react";
import PieChart from "./Graphs/PieChart";
import BarChart from "./Graphs/BarChart";
import style from "./DashboardProvider.module.sass";

function Dashboard() {
  return (
    <div className={style.background}>
      <div className={style.dashboardWrapper}>
        <div className={style.containerLeft}>
          <div className={style.divMasBuscados}>Mas buscados</div>
          <div className={style.divPersonasQueTeBuscaron}>
            Personas que han visitado tu perfil
          </div>
          <h2 className={style.h2HistoriaServ}>Historial de pagos</h2>
          <div className={style.divHistorialpagos}>
            <div>
              <BarChart />
            </div>
          </div>
        </div>

        <div className={style.containerRight}>
          <div className={style.divPromedioDeCalific}>Calificaciones</div>
          <div className={style.divUltimoComent}>
            Ultimo Comentario recibido
          </div>
          <h2 className={style.h2HistoriaServ}>Historia de Servicios</h2>
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
