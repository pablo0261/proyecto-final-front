import { useState, useEffect } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  CanvasRenderer,
]);

function PieChartComponent() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  
  const [statistics, setStatistics] = useState([]);
  useEffect(() => {
    const fetchAndDrawChart = async () => {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider`);
        const data = await response.json();
        const misServiciosMasContratados = data.data.serviciosTotales.map(
          (option) => ({
            servicio: option.Servicio || "",
            cantidad: parseInt(option.Cantidad) || 1,
          })
        );
        setStatistics(misServiciosMasContratados);

        const chartDom = document.getElementById("pie-chart");
        const myChart = echarts.init(chartDom);

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          title: {
            text: "",
          },
          toolbox: {
            right: 10,
            top: 0,
            show: true,
            orient: "vertical",
            feature: {
              dataView: { show: true, readOnly: false },
              mark: { show: true },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          
         
          series: [
            {
              name: "Servicio",
              type: "pie",
              radius: [20, 120],
              center: ["50%", "50%"], 
              roseType: "area",
              itemStyle: {
                borderRadius: 6,
              },
              label: {
                bottom: 10,
                width: 170,
                height: 70,
                formatter: function (params) {
                  const name = params.name.length > 24 ? params.name.slice(0, 24) + '...' : params.name;
                  return '{hr|' + name + '}\n{b|Cantidad: ' + params.value + '}  {per|' + params.percent + '%}';
                },
                backgroundColor: '#F6F8FC',
                borderColor: '#8C8D8E',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#6E7079',
                    lineHeight: 22,
                    align: 'center'
                  },
                  hr: {
                    width: 140,
                    height: 30,
                    margin: 'auto',
                    align: 'left'
                  },
                  b: {
                    color: '#4C5058',
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: 23,
                    align: 'left'
                  },
                  per: {
                    color: '#fff',
                    backgroundColor: '#4C5058',
                    padding: [3, 4],
                    borderRadius: 4,
                    align: 'right'
                  }
                }
              },
              data: misServiciosMasContratados.map((option) => ({
                value: option.cantidad || 0,
                name: option.servicio ,
              })),
            },
          ],
        };

        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
     
    };

    fetchAndDrawChart();
  }, []);

  return <div id="pie-chart" style={{ height: "400px" }}></div>;
}

export default PieChartComponent;
