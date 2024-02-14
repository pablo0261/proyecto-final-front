import React from "react";
import style from "./Calification.module.sass"; // Asegúrate de importar el archivo de estilos

function Calification() {
  const statistics = "4.5"
  const count = "132"
  const stars = Math.floor(statistics);

  const renderStars = () => {
    const starsArray = [];
    for (let i = 0; i < stars; i++) {
      starsArray.push(<span key={i}>⭐</span>);
    }
    return starsArray;
  };

  return (
    <div className={style.statisticsContainer}>
      <div className={style.prom}> {statistics}</div>
      <div className={style.stars}>{renderStars()}</div>
      <div className={style.count}> ({count})</div>
    </div>
  );
}

export default Calification;
