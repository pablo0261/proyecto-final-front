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

    const infoUserLog = useSelector((state) => state.infoUserLog);
    const [servicesData, setServicesData] = useState([]); 

    useEffect(() => {
        //*Todo esto recorre y valida la info del usuario para ver los servicios y precios
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
    const chartDom = document.getElementById("pie-chart");
    const myChart = echarts.init(chartDom);

    const option = {
      legend: {
        right: "botton",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
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
          },//! ESTO SE DEBE CAMBIAR POR LA CANTIDAD DE VECES QUE SE CONTRATO CADA SERVICIO
          data: servicesData.map(service => ({ value: service.price || 0, name: service.description, label: {
            formatter: '$ {c}',
          }, })),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [servicesData]); // Dependencia actualizada para reflejar los cambios en servicesData

  return <div id="pie-chart" style={{ height: "400px" }}></div>;
}

export default PieChartComponent;
