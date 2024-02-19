import MostSearch from "./Graphs/MostSearch/MostSearch";
import DayFlow from "./Graphs/DayFlow/DayFlow";
import ValoresGenerales from "./Graphs/ValoresGenerales/ValoresGenerales";
import style from "./AdminStatistics.module.sass";

function AdminStatistics() {
  return (
    <div className={style.background}>
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
        {/* GRAFICO 1  */}
        <div className={style.containerG}>
          <h2 className={style.h2HistoriaServ}>Grafico 1</h2>
          {/* Aqui va el componente del Grafico 1 */}
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
