import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import Swal from "sweetalert2";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

function PaymentsStatistics() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLog = useSelector((state) => state.infoUserLog);
  const [oportunidadesPorSemana, setOportunidadesPorSemana] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}/stats/provider?idPeople=${userLog.idPeople}`
        );
        const data = await response.json();
        const oportunidades = data.data.opportunidadesPorSemana.map(
          (option) => ({
            name: `Semana ${option.ejex}`,
            value: [parseInt(option.Oportunidades), parseInt(option.Solicitudes), parseInt(option.Contrataciones)],
          })
        );
        setOportunidadesPorSemana(oportunidades);
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
  }, [REACT_APP_API_URL, userLog.idPeople]);

  useEffect(() => {
    const chartDom = document.getElementById("payments-chart");
    const myChart = echarts.init(chartDom);

    const colorPalette = [
      "rgb(84, 112, 198)",
      "rgb(145, 204, 117)",
      "rgb(255, 206, 84)",
      "rgb(115, 192, 222)",
      "rgb(238, 102, 102)",
      "rgb(154, 96, 180)",
      "rgb(234, 124, 204)",
      "rgb(59, 162, 114)",
      "rgb(226, 144, 185)",
    ];

    const option = {
      legend: {
        bottom: "bottom",
      },
      toolbox: {
        left: "right",
        top: "center",
        show: true,
        orient: "vertical",
        feature: {
          mark: { show: true },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      title: {
        text: "Cantidad de Oportunidades",
        subtext: "por semana - Mes actual",
      },
      xAxis: {
        type: "category",
        data: oportunidadesPorSemana.map((serie) => serie.name), // Ahora los nombres de las series están en el eje x
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Visitas a su Perfil",
          type: "bar",
          data: oportunidadesPorSemana.map((serie) => serie.value[0]),
          itemStyle: { color: colorPalette[0] },
        },
        {
          name: "Solicitudes",
          type: "bar",
          data: oportunidadesPorSemana.map((serie) => serie.value[1]),
          itemStyle: { color: colorPalette[1] },
        },
        {
          name: "Contrataciones",
          type: "bar",
          data: oportunidadesPorSemana.map((serie) => serie.value[2]),
          itemStyle: { color: colorPalette[2] },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [oportunidadesPorSemana]);

  return <div id="payments-chart" style={{ height: "400px" }}></div>;
}

export default PaymentsStatistics;