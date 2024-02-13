import React, { useState, useEffect } from "react";
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { xAxis } from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent } from 'echarts/components';

echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  CanvasRenderer,
  GridComponent
]);

function PaymentsStatistics() {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const generateRandomPayments = () => {
      const payments = [];
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; 

      for (let i = 0; i < 12; i++) {
        const month = (currentMonth - i) <= 0 ? (12 - Math.abs(currentMonth - i)) : (currentMonth - i);
        const totalPayments = Math.floor(Math.random() * 100) + 1; 
        const onTimePayments = Math.floor(Math.random() * totalPayments); 
        const delayedPayments = Math.floor(Math.random() * (totalPayments - onTimePayments)); 
        const suspendedUsers = Math.floor(Math.random() * (totalPayments - onTimePayments - delayedPayments)); 
        payments.push({
          month: month,
          totalPayments: totalPayments,
          onTimePayments: onTimePayments,
          delayedPayments: delayedPayments,
          suspendedUsers: suspendedUsers
        });
      }

      return payments;
    };

    setPaymentData(generateRandomPayments());
  }, []); 

  useEffect(() => {
    const chartDom = document.getElementById("payments-chart");
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Total de pagos', 'Pagos a tiempo', 'Pagos con retraso', 'Usuarios suspendidos']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: paymentData.map(payment => `${payment.month}`)
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Total de pagos',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: paymentData.map(payment => payment.totalPayments)
        },
        {
          name: 'Pagos a tiempo',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: paymentData.map(payment => payment.onTimePayments)
        },
        {
          name: 'Pagos con retraso',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: paymentData.map(payment => payment.delayedPayments)
        },
        {
          name: 'Usuarios suspendidos',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: paymentData.map(payment => payment.suspendedUsers)
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [paymentData]); 

  return <div id="payments-chart" style={{ height: "400px" }}></div>;
}

export default PaymentsStatistics;
