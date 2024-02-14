import React from "react";
import style from "./PeopleVisit.module.sass"; // Asegúrate de importar el archivo de estilos

function PeopleVisit() {
  const statistics = "35"

    return (
      <div className={style.statisticsContainer}>
        <div className={style.statistics}>{statistics}</div>
        <div className={style.text}> Personas han visitado tu perfil</div>
      </div>
    );
}

export default PeopleVisit;
