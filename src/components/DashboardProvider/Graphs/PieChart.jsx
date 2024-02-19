import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  CanvasRenderer
]);

function PieChartComponent() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
    const infoUserLog = useSelector((state) => state.infoUserLog);
    const [servicesData, setServicesData] = useState([]); 
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        if (infoUserLog.categories && infoUserLog.categories.length > 0) {
          const firstCategory = infoUserLog.categories[0];
          if (
            firstCategory.categories_options &&
            firstCategory.categories_options.length > 0
          ) {
            const categoriesOptions = firstCategory.categories_options.flatMap(
              (option) => {
                if (option.people_options && option.people_options.length > 0) {
                  return option.people_options.map((personOption) => ({
                    description: option.description || "No description",
                    price: personOption.price || null,
                    idOption: option.idOption 
                  }));
                } else {
                  return {
                    description: option.description || "No description",
                    price: null,
                    idOption: option.idOption 
                  };
                }
              }
            );
    
            setServicesData(categoriesOptions);
          }
        }
      }, [infoUserLog]);

      useEffect(() => {
        const fetchEducation = async () => {
          try {
            const response = await fetch(`${REACT_APP_API_URL}/stats/provider?idPeople=${infoUserLog.idPeople}`);
            const data = await response.json();
            const misServiciosMasContratados = data.data.misServiciosMasContratados.map((option) => ([{
              servicio: option.servicio || "",
              cantidad: parseInt(option.cantidad) || 1, 
            }]));
           setStatistics(misServiciosMasContratados);
          } catch (error) {
            console.error("Error al obtener los servicios mas buscados:", error);
          }
        };
        fetchEducation();
      }, []);  

  useEffect(() => {
    const chartDom = document.getElementById("pie-chart");
    const myChart = echarts.init(chartDom);

    const option = {
      legend: {
        bottom: 10,
      },
      title: {
        text: 'Registro de Servicios Contratados',
        subtext: 'por semana - Mes actual'
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
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [20, 150],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 6,
          },
          data: statistics.map(option => ({ 
            value: option[0].cantidad || 0, 
            name: option[0].servicio })),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [statistics]); 

  return <div id="pie-chart" style={{ height: "400px" }}></div>;
}

export default PieChartComponent;
