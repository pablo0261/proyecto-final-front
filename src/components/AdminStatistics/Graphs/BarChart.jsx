import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

function ServicesValues() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLog = useSelector((state) => state.infoUserLog);
  const [admisionesPorSemana, setAdmisionesPorSemana] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}/stats/provider?idPeople=${userLog.idPeople}`
        );
        const data = await response.json();
        console.log("data", data);
        const admisiones = data.data.admisionesPorSemana.map(
          (option) => ({
            name: `Semana ${option.ejex}`,
            value: [Number(option.Clientes), Number(option.Proveedores)],
          })
        );
        setAdmisionesPorSemana(admisiones);
      } catch (error) {
        console.error(
          "Error al obtener las admisiones de proveedores y clientes:",
          error
        );
      }
    };
    fetchEducation();
  }, [REACT_APP_API_URL, userLog.idPeople]);
  
  useEffect(() => {
    const chartDom = document.getElementById("payments-chart");
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Proveedor', 'Cliente']
      },
      xAxis: [
        {
          type: 'category',
          data: admisionesPorSemana.map((serie) => serie.name), // Ahora los nombres de las series están en el eje x
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Activos',
          min: 0,
          max: 20,
          interval: 5,
          axisLabel: {
            formatter: '{value}'
          }
        },
        
      ],
      series: [
        {
          name: 'Proveedor',
          type: 'bar',
          tooltip: {
            formatter: '{b}: {c} ml'
          },
          data: admisionesPorSemana.map((serie) => serie.value[1]),
        },
        {
          name: 'Cliente',
          type: 'bar',
          tooltip: {
            formatter: '{b}: {c} ml'
          },
          data: admisionesPorSemana.map((serie) => serie.value[0]),
        },
       
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="payments-chart" style={{ height: "400px" }}></div>;
}

export default ServicesValues;
