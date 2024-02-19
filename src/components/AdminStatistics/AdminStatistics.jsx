import MostSearch from "./Graphs/MostSearch/MostSearch";
import DayFlow from "./Graphs/DayFlow/DayFlow";
import React, { useEffect, useState } from 'react';
import ValoresGenerales from "./Graphs/ValoresGenerales/ValoresGenerales";
import loadingHouse from "../../assets/Icons/loadingHouse.gif"

import style from "./AdminStatistics.module.sass";

function AdminStatistics() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); //* Simula 2 seg de retraso para darle tiempo a cargar a los componentes
  }, []);

  return (
    <>
    {!isLoading && (
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
     )}
     {isLoading && (
       <div>
         <img src={loadingHouse} alt="Loading..." />
       </div>
    )}
    </>
  );
}

export default AdminStatistics;
