import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);

function PaymentsStatistics() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLog = useSelector((state) => state.infoUserLog);
  const [opportunidadesPorSemana, setOportunidadesPorSemana] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider?idPeople=${userLog.idPeople}`);
        const data = await response.json();
        console.log("data", data);
        const opportunidades = data.data.opportunidadesPorSemana.map((option) => ({
          name: option.ejex,
          value: [option.Oportunidades, option.Solicitudes, option.Contrataciones],
        }));
        setOportunidadesPorSemana(opportunidades);
      } catch (error) {
        console.error("Error al obtener los servicios más buscados:", error);
      }
    };
    fetchEducation();
  }, [REACT_APP_API_URL, userLog.idPeople]);

  useEffect(() => {
    const chartDom = document.getElementById("payments-chart");
    const myChart = echarts.init(chartDom);

    const colorPalette = ['rgb(84, 112, 198)', 'rgb(145, 204, 117)', 'rgb(255, 206, 84)', 'rgb(115, 192, 222)', 'rgb(238, 102, 102)', 'rgb(154, 96, 180)', 'rgb(234, 124, 204)', 'rgb(59, 162, 114)', 'rgb(226, 144, 185)'];

    const option = {
      legend: {
        bottom: "bottom",
      },
      toolbox: {
        left: 'right',
        top: 'center',
        show: true,
        orient: 'vertical',
        feature: {
          mark: { show: true },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      title: {
        text: 'Cantidad de Oportunidades',
        subtext: 'por semana - Mes actual'
      },
      xAxis: {
        type: 'category',
        data: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']
      },
      yAxis: {
        type: 'value'
      },
      series: opportunidadesPorSemana.map((serie, index) => ({
        name: serie.name,
        type: 'bar',
        data: serie.value,
        itemStyle: {
          color: colorPalette[index % colorPalette.length]
        }
      }))
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [opportunidadesPorSemana]);

  return <div id="payments-chart" style={{ height: "400px" }}></div>;
}

export default PaymentsStatistics;
