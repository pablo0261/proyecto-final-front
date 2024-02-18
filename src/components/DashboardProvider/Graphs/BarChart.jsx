import React, { useEffect } from "react";
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
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  CanvasRenderer
]);

function PaymentsStatistics() {

  useEffect(() => {
    const chartDom = document.getElementById("payments-chart");
    const myChart = echarts.init(chartDom);

    const colorPalette = ['rgb(84, 112, 198)',   // Azul
    'rgb(145, 204, 117)',  // Verde
    'rgb(255, 206, 84)',   // Amarillo
    'rgb(115, 192, 222)',  // Celeste
    'rgb(238, 102, 102)',  // Rojo claro
    'rgb(154, 96, 180)',   // Morado claro
    'rgb(234, 124, 204)',  // Rosa claro
    'rgb(59, 162, 114)',   // Verde claro
    'rgb(226, 144, 185)'   // Rosa
  ];

    const option = {
      title: {
        text: 'Cantidad de Oportunidades',
        subtext: 'por semana - Mes actual'
      },
      xAxis: {
        type: 'category',
        data: ['Semana 1', 'Semana 2', 'semana 3', 'Semana 4']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [5, 7, 8, 3],
          type: 'bar',
          itemStyle: {
            color: function(params) {
              return colorPalette[params.dataIndex % colorPalette.length]; // Asignar un color diferente a cada barra
            }
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="payments-chart" style={{ height: "400px" }}></div>;
}

export default PaymentsStatistics;
