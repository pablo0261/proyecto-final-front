// import { useState, useEffect } from "react";
// import * as echarts from "echarts/core";
// import { PieChart } from "echarts/charts";
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   ToolboxComponent,
// } from "echarts/components";
// import { CanvasRenderer } from "echarts/renderers";

// echarts.use([
//   PieChart,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   ToolboxComponent,
//   CanvasRenderer,
// ]);

// function PieChartComponent() {
//   const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  
//   const [statistics, setStatistics] = useState([]);

//   useEffect(() => {
//     const fetchAndDrawChart = async () => {
//       try {
//         const response = await fetch(`${REACT_APP_API_URL}/stats/provider`);
//         const data = await response.json();
//         const misServiciosMasContratados = data.data.misServiciosMasContratados.map(
//           (option) => ({
//             servicio: option.servicio || "",
//             cantidad: parseInt(option.cantidad) || 1,
//           })
//         );
//         setStatistics(misServiciosMasContratados);

//         const chartDom = document.getElementById("pie-chart");
//         const myChart = echarts.init(chartDom);

//         const option = {
//           legend: {
//             center: 10,
//           },
//           title: {
//             text: "",
//           },
//           toolbox: {
//             right: 0,
//             top: 100,
//             show: true,
//             orient: "vertical",
//             feature: {
//               mark: { show: true },
//               restore: { show: true },
//               saveAsImage: { show: true },
//             },
//           },
//           series: [
//             {
//               name: "Contrataciones",
//               type: "pie",
//               radius: [20, 120],
//               center: ["50%", "50%"],
//               roseType: "area",
//               itemStyle: {
//                 borderRadius: 6,
//               },
//               label: {
//                 bottom: 10,
//                 width: 100,
//                 height: 50,
//                 formatter: "{a|{a}}{abg|}\n{hr|}\n  {c}  {per|{d}%}  ",
//                 backgroundColor: "#F6F8FC",
//                 borderColor: "#8C8D8E",
//                 borderWidth: 1,
//                 borderRadius: 4,
//                 rich: {
//                   a: {
//                     color: "#6E7079",
//                     lineHeight: 22,
//                     align: "center",
//                   },
//                   hr: {
//                     borderColor: "#8C8D8E",
//                     width: "100%",
//                     borderWidth: 1,
//                     height: 0,
//                   },
//                   b: {
//                     color: "#4C5058",
//                     fontSize: 20,
//                     fontWeight: "normal",
//                     lineHeight: 40,
//                   },
//                   per: {
//                     color: "#fff",
//                     backgroundColor: "#4C5058",
//                     padding: [3, 4],
//                     borderRadius: 4,
//                   },
//                 },
//               },
//               data: misServiciosMasContratados.map((option) => ({
//                 value: option.cantidad || 0,
//                 name: option.servicio,
//               })),
//             },
//           ],
//         };

//         myChart.setOption(option);

//         return () => {
//           myChart.dispose();
//         };
//       } catch (error) {
//         console.error("Error al obtener los servicios mas buscados:", error);
//       }
//     };

//     fetchAndDrawChart();
//   }, []);

//   return <div id="pie-chart" style={{ height: "400px" }}></div>;
// }

// export default PieChartComponent;
