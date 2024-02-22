import { useState, useEffect } from "react";
import style from "./ValoresGenerales.module.sass"; // Asegúrate de importar el archivo de estilos
import Swal from "sweetalert2";


function Calification() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [statistics, setStatistics] = useState([]);

  const successfulConnections = Math.ceil(Number((statistics.cantidadOportunidades) - Number(statistics.cantidadContrataciones)) / Number(statistics.cantidadOportunidades * 100));
const customersByProvider = Math.ceil(Number(statistics.cantidadProveedores) / Number(statistics.cantidadClientes));

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider`);
        const data = await response.json();
        const indicadoresPersonales = data.data.indicadoresPersonales
        setStatistics(indicadoresPersonales);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error al obtener los servicios mas buscados.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    };
    fetchEducation();
  }, []);


  return (
    <div className={style.statisticsContainer}>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.cantidadTotalServiciosOfrecidos}</p>
        <p className={style.statisticsDescription}>Servicios Ofrecidos</p>
        </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.cantidadProveedores}</p>
        <p className={style.statisticsDescription}>Proveedores Activos</p>
        </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.cantidadContrataciones}</p>
        <p className={style.statisticsDescription}>Cantidad de Contrataciones</p>
        </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{statistics.cantidadClientes}</p>
        <p className={style.statisticsDescription}>Cantidad de Usuarios</p>
      </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{successfulConnections}%</p>
        <p className={style.statisticsDescription}>Eficiencia en Conexiones</p>
      </div>
       <div  className={style.statisticsItem}>
        <p className={style.statisticsValue}>{customersByProvider}</p>
        <p className={style.statisticsDescription}>Clientes x Proveedor</p>
      </div>
    </div>
  );
}


export default Calification;
