import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./DayFlow.module.sass"; 
import Swal from "sweetalert2";

function PeopleVisit() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLog = useSelector((state) => state.infoUserLog);

  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider?idPeople=${userLog.idPeople}`);
        const data = await response.json();
        const serviciosMasBuscados = data.data.indicadoresPersonales.cantidadViews
        setStatistics(serviciosMasBuscados);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener las cantidades de visitas al perfil. Por favor, intente nuevamente más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    };
    fetchEducation();
  }, []);


    return (
      <div className={style.statisticsContainer}>
        <div className={style.statistics}>{statistics}</div>
        <div className={style.text}> Personas han visitado tu perfil</div>
      </div>
    );
}

export default PeopleVisit;
