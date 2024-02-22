import { useState, useEffect } from "react";
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart, LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

function ServicesValues() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [admisionesPorSemana, setAdmisionesPorSemana] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider`);
        const data = await response.json();
        const admisiones = data.data.admisionesPorSemana.map((option) => ({
          name: `Semana ${option.ejex}`,
          value: [(option.Clientes), (option.Proveedores)],
        }));
        setAdmisionesPorSemana(admisiones);

        const chartDom = document.getElementById("payments-chart");
        const myChart = echarts.init(chartDom);

        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999",
              },
            },
          },
          toolbox: {
            right: 0,
            top: 10,
            show: true,
            orient: "vertical",
            feature: {
              magicType: { show: true, type: ["line", "bar"] },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ["Proveedor", "Cliente"],
          },
          xAxis: [
            {
              type: "category",
              data: admisiones.map((serie) => serie.name),
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "Activos",
              min: 0,
              max: 20,
              interval: 5,
              axisLabel: {
                formatter: "{value}",
              },
            },
          ],
          series: [
            {
              name: "Proveedor",
              type: "bar",
              tooltip: {
                formatter: "{b}: {c} ml",
              },
              data: admisiones.map((serie) => serie.value[1]),
            },
            {
              name: "Cliente",
              type: "bar",
              tooltip: {
                formatter: "{b}: {c} ml",
              },
              data: admisiones.map((serie) => serie.value[0]),
            },
          ],
        };

        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
      
    };
    fetchEducation();
  }, []);

  return <div id="payments-chart" style={{ height: "400px" }}></div>;
}

export default ServicesValues;
