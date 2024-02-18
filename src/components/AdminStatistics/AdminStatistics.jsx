import MostSearch from "./Graphs/MostSearch/MostSearch";
import DayFlow from "./Graphs/DayFlow/DayFlow";
import ValoresGenerales from "./Graphs/ValoresGenerales/ValoresGenerales";
import style from "./AdminStatistics.module.sass";

function AdminStatistics() {
  return (
    <div className={style.background}>
      <div className={style.dashboardWrapper}>
        <div className={style.containerLeft}>
          <p className={style.title}>Servicios mas buscados</p>
          <div className={style.divMasBuscados}>
            <div className={style.cardMasBuscados}>
              <MostSearch />
            </div>
          </div>
          <div className={style.divPersonasQueTeBuscaron}>
            <DayFlow />
          </div>
          <h2 className={style.h2HistoriaServ}>Grafico 1</h2>
          <div className={style.divHistorialpagos}>
            <div></div>
          </div>
          <h2 className={style.h2HistoriaServ}>Grafico 2</h2>
          <div className={style.divHistorialpagos}>
            <div></div>
          </div>
        </div>

        <div className={style.containerRight}>
          <p className={style.title}>Grilla 2 x 3 de valores generales</p>
          <div className={style.divPromedioDeCalific}>
            <ValoresGenerales />
          </div>
          <h2 className={style.h2HistoriaServ}>Grafico 3</h2>
          <div className={style.divHistorialpagos}>
            <div></div>
          </div>
          <h2 className={style.h2HistoriaServ}>Grafico 4</h2>
          <div className={style.divHistorialpagos}>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatistics;
