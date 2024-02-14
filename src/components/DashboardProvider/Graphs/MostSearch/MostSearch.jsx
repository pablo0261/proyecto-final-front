import React from "react";
import style from "./MostSearch.module.sass" // Asegúrate de importar el archivo de estilos

function MostSearch() {
  const statistics = {
    Cuidado: 237,
    "Atención Médica": 205,
    "Cuidado y Limpieza": 134,
    Kinesiologia: 98,
    Nutrición: 65,
    Inyectables: 59,
  };

  const renderStatistics = () => {
    return Object.entries(statistics).map(([key, value]) => (
      <div key={key} className={style.statisticsItem}>
        <p className={style.statisticsKey}>{key}</p>
        <p className={style.statisticsValue}>{value}</p>
      </div>
    ));
  };

  return (
    <div className={style.statisticsContainer}>
      <div className={style.statisticsBox}>{renderStatistics()}</div>
    </div>
  );
}

export default MostSearch;
